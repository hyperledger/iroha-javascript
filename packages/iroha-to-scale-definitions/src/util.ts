import { sanitize } from '@iroha/scale-codec-legacy';

export interface ParsedRustName {
    /**
     * Очищенный тип
     */
    sanitized: string;
    /**
     * Наполовину очищенный тип, только его путь
     *
     * alloc::collections::BTreeMap<...>
     * => alloc::collections::BTreeMap
     */
    fullPath: string;

    raw: string;
}

const FULL_PATH_REG = /^[\w\d\:]+/i;

export function parseRawRustTypeName(value: string): ParsedRustName {
    const sanitized = sanitize(value);
    const fullPath = value.match(FULL_PATH_REG)![0];

    return { sanitized, fullPath, raw: value };
}
