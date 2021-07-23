// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

// import type { ExtDef } from '../extrinsic/signedExtensions/types';
// import type { ChainProperties, CodecHash, DispatchErrorModule, Hash } from '../interfaces/types';
import type { Codec, Constructor, RegisteredTypes, Registry, RegistryTypes } from '../types';

// we are attempting to avoid circular refs, hence the Metadata path import
// import { decorateConstants, decorateExtrinsics } from '@polkadot/metadata/decorate';
import { assert, assertReturn, isFunction, isString, logger, stringify } from '@polkadot/util';
// import { blake2AsU8a } from '@polkadot/util-crypto';

// import { Json } from '../codec/Json';
// import { Raw } from '../codec/Raw';
// import { defaultExtensions, expandExtensionTypes, findUnknownExtensions } from '../extrinsic/signedExtensions';
// import { GenericEventData } from '../generic/Event';
// import * as baseTypes from '../index.types';
// import * as definitions from '../interfaces/definitions';
import { DoNotConstruct } from '../primitive/DoNotConstruct';
import { createClass } from './createClass';
import { createType } from './createType';
// import { getTypeDef } from './getTypeDef';

const l = logger('registry');

export class TypeRegistry implements Registry {
    #classes = new Map<string, Constructor>();

    #definitions = new Map<string, string>();

    // readonly #metadataCalls: Record<string, CallFunction> = {};

    // readonly #metadataErrors: Record<string, RegistryError> = {};

    // readonly #metadataEvents: Record<string, Constructor<GenericEventData>> = {};

    #unknownTypes = new Map<string, boolean>();

    // #chainProperties?: ChainProperties;

    // #hasher: (data: Uint8Array) => Uint8Array = blake2AsU8a;

    readonly #knownDefaults: RegistryTypes;

    readonly #knownDefinitions: Record<string, { types: RegistryTypes }>;

    #knownTypes: RegisteredTypes = {};

    // #signedExtensions: string[] = defaultExtensions;

    // #userExtensions?: ExtDef;

    //

    constructor() {
        this.#knownDefaults = {}; // { Json, Metadata, Raw, ...baseTypes };
        this.#knownDefinitions = {}; // definitions as unknown as Record<string, { types: RegistryTypes }>;

        this.init();

        // if (createdAtHash) {
        //   this.createdAtHash = this.createType('Hash', createdAtHash);
        // }
    }

    public init(): this {
        // start clean
        this.#classes = new Map<string, Constructor>();
        this.#definitions = new Map<string, string>();
        this.#unknownTypes = new Map<string, boolean>();
        this.#knownTypes = {};

        // register know, first classes then on-demand-created definitions
        this.register(this.#knownDefaults);
        Object.values(this.#knownDefinitions).forEach(({ types }): void => this.register(types));

        return this;
    }

    // public get chainDecimals (): number[] {
    //   if (this.#chainProperties?.tokenDecimals.isSome) {
    //     const allDecimals = this.#chainProperties.tokenDecimals.unwrap();

    //     if (allDecimals.length) {
    //       return allDecimals.map((b) => b.toNumber());
    //     }
    //   }

    //   return [12];
    // }

    // public get chainSS58 (): number | undefined {
    //   return this.#chainProperties?.ss58Format.isSome
    //     ? this.#chainProperties.ss58Format.unwrap().toNumber()
    //     : undefined;
    // }

    // public get chainTokens (): string[] {
    //   if (this.#chainProperties?.tokenSymbol.isSome) {
    //     const allTokens = this.#chainProperties.tokenSymbol.unwrap();

    //     if (allTokens.length) {
    //       return allTokens.map((s) => s.toString());
    //     }
    //   }

    //   return [formatBalance.getDefaults().unit];
    // }

    public get knownTypes(): RegisteredTypes {
        return this.#knownTypes;
    }

    public get unknownTypes(): string[] {
        return [...this.#unknownTypes.keys()];
    }

    // public get signedExtensions (): string[] {
    //   return this.#signedExtensions;
    // }

    /**
     * @describe Creates an instance of the class
     */
    public createClass<C extends Codec>(type: string): Constructor<C> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return createClass(this, type) as any;
    }

    /**
     * @description Creates an instance of a type as registered
     */
    public createType<C extends Codec>(type: string, ...params: unknown[]): C {
        return createType(this, type, ...params);
    }

    public get<T extends Codec = Codec>(name: string, withUnknown?: boolean): Constructor<T> | undefined {
        let Type = this.#classes.get(name);

        // we have not already created the type, attempt it
        if (!Type) {
            const definition = this.#definitions.get(name);
            let BaseType: Constructor<Codec> | undefined;

            // we have a definition, so create the class now (lazily)
            if (definition) {
                BaseType = createClass(this, definition);
            } else if (withUnknown) {
                l.warn(`Unable to resolve type ${name}, it will fail on construction`);

                this.#unknownTypes.set(name, true);
                BaseType = DoNotConstruct.with(name);
            }

            if (BaseType) {
                // NOTE If we didn't extend here, we would have strange artifacts. An example is
                // Balance, with this, new Balance() instanceof u128 is true, but Balance !== u128
                // Additionally, we now pass through the registry, which is a link to ourselves
                Type = class extends BaseType {};

                this.#classes.set(name, Type);
            }
        }

        return Type as Constructor<T>;
    }

    public getClassName(clazz: Constructor): string | undefined {
        const entry = [...this.#classes.entries()].find(([, test]) => test === clazz);

        return entry ? entry[0] : undefined;
    }

    public getDefinition(typeName: string): string | undefined {
        return this.#definitions.get(typeName);
    }

    // public getModuleInstances (specName: string, moduleName: string): string[] | undefined {
    //   return this.#knownTypes?.typesBundle?.spec?.[specName]?.instances?.[moduleName];
    // }

    public getOrThrow<T extends Codec = Codec>(name: string, msg?: string): Constructor<T> {
        return assertReturn(this.get<T>(name), msg || `type ${name} not found`);
    }

    public getOrUnknown<T extends Codec = Codec>(name: string): Constructor<T> {
        return this.get<T>(name, true) as Constructor<T>;
    }

    public hasClass(name: string): boolean {
        return this.#classes.has(name);
    }

    public hasDef(name: string): boolean {
        return this.#definitions.has(name);
    }

    public hasType(name: string): boolean {
        return !this.#unknownTypes.get(name) && (this.hasClass(name) || this.hasDef(name));
    }

    public register(type: Constructor | RegistryTypes): void;

    // eslint-disable-next-line no-dupe-class-members
    public register(name: string, type: Constructor): void;

    // eslint-disable-next-line no-dupe-class-members
    public register(arg1: string | Constructor | RegistryTypes, arg2?: Constructor): void {
        // NOTE Constructors appear as functions here
        if (isFunction(arg1)) {
            this.#classes.set(arg1.name, arg1);
        } else if (isString(arg1)) {
            assert(isFunction(arg2), () => `Expected class definition passed to '${arg1}' registration`);
            assert(arg1 !== arg2.toString(), () => `Unable to register circular ${arg1} === ${arg1}`);

            this.#classes.set(arg1, arg2);
        } else {
            this._registerObject(arg1);
        }
    }

    private _registerObject(obj: RegistryTypes): void {
        Object.entries(obj).forEach(([name, type]): void => {
            if (isFunction(type)) {
                // This _looks_ a bit funny, but `typeof Clazz === 'function'
                this.#classes.set(name, type);
            } else {
                const def = isString(type) ? type : stringify(type);

                assert(name !== def, () => `Unable to register circular ${name} === ${def}`);

                // we already have this type, remove the classes registered for it
                if (this.#classes.has(name)) {
                    this.#classes.delete(name);
                }

                this.#definitions.set(name, def);
            }
        });
    }

    setKnownTypes(knownTypes: RegisteredTypes): void {
        this.#knownTypes = knownTypes;
    }
}
