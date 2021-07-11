/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { NamespaceCodegenDefinition, TypeDef } from '@scale-codec/namespace-codegen';
import debugRoot from 'debug';

const debug = debugRoot('@iroha/data-model:rust-refs-converter');

const STD_ALIASES: Record<string, string> = {
    String: 'str',
    Compact: 'compact',
};

export default class {
    #addTypes: NamespaceCodegenDefinition = {};

    public handle(ref: string): string {
        this.#parse(ref);
        return this.#convert(ref);
    }

    public get collectedTypes(): NamespaceCodegenDefinition {
        return this.#addTypes;
    }

    #convert(ref: string): string {
        return [
            replaceStdAlias,
            // todo add other conversion stages

            (v: string) => {
                ref !== v && debug(`ref %o converted to %o`, ref, v);
                return v;
            },
        ].reduce<string>((acc, fn) => fn(acc), ref);
    }

    #parse(ref: string): void {
        const match = ref.match(/^BTreeSet<(.+)>$/);
        if (match) {
            debug('found %o, adding this type', ref);
            this.#addTypes[ref] = {
                t: 'set',
                entry: match[1],
            };
        }
    }
}

function replaceStdAlias(ref: string): string {
    if (ref in STD_ALIASES) {
        return STD_ALIASES[ref];
    }
    return ref;
}
