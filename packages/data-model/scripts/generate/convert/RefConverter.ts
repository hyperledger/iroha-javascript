/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { NamespaceDefinition } from '@scale-codec/definition-compiler';
import debugRoot from 'debug';

const debug = debugRoot('@iroha2/data-model:rust-refs-converter');

const STD_ALIASES: Record<string, string> = {
    String: 'str',

    // Compact: 'Compact',
};

export default class {
    #addTypes: NamespaceDefinition = {};

    public handle(ref: string): string {
        this.#parse(ref);
        return this.#convert(ref);
    }

    public get collectedTypes(): NamespaceDefinition {
        return this.#addTypes;
    }

    #convert(ref: string): string {
        return [
            replaceStdAlias,
            parseArray,
            makeValidJsIdentifier,

            (v: string) => {
                ref !== v && debug(`ref %o converted to %o`, ref, v);
                return v;
            },
        ].reduce<string>((acc, fn) => fn(acc), ref);
    }

    #parse(ref: string): void {
        for (const fn of [tryCollectBTreeSet]) {
            fn(this.#addTypes, ref);
        }
    }
}

function tryCollectBTreeSet(acc: NamespaceDefinition, ref: string): void {
    const match = ref.match(/^BTreeSet<(.+)>$/);
    if (match) {
        debug('collecting BTreeSet: %o', ref);
        acc[makeValidJsIdentifier(ref)] = {
            t: 'set',
            entry: makeValidJsIdentifier(match[1]),
        };
    }
}

function replaceStdAlias(ref: string): string {
    if (ref in STD_ALIASES) {
        return STD_ALIASES[ref];
    }
    if (ref === 'Vec<u8>') {
        return 'BytesVec';
    }
    if (ref.match(/Compact\<u128\>/)) {
        return 'Compact';
    }
    return ref;
}

function parseArray(ref: string): string {
    const match = ref.match(/^\[\s*(.+)\s*;\s*(\d+)\s*\]$/);
    if (match) {
        const [, ty, count] = match;
        return `Array_${ty}_${count}`;
    }

    return ref;
}

function makeValidJsIdentifier(ref: string): string {
    return ref
        .replace(/[^a-z0-9_]/gi, '_')
        .replace(/_+/g, '_')
        .replace(/_+$/g, '');
}
