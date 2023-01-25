/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_privatekey_free(a: number): void;
export function privatekey_reproduce(a: number, b: number, c: number): void;
export function privatekey_to_json(a: number, b: number): void;
export function privatekey_payload_hex(a: number, b: number): void;
export function privatekey_payload(a: number, b: number): void;
export function privatekey_digest_function(a: number): number;
export function privatekey_from_json(a: number, b: number): void;
export function __wbg_hash_free(a: number): void;
export function hash_bytes_hex(a: number, b: number): void;
export function hash_bytes(a: number, b: number): void;
export function hash_hash(a: number, b: number): void;
export function hash_zeroed(): number;
export function __wbg_keygenconfiguration_free(a: number): void;
export function __wbg_keypair_free(a: number): void;
export function keypair_reproduce(a: number, b: number): number;
export function keypair_to_json(a: number, b: number): void;
export function keypair_public_key(a: number): number;
export function keypair_private_key(a: number): number;
export function keypair_digest_function(a: number): number;
export function keypair_generate(a: number): void;
export function keypair_generate_with_configuration(a: number, b: number): void;
export function keypair_from_private_key(a: number, b: number): void;
export function keypair_from_json(a: number, b: number): void;
export function keygenconfiguration_use_seed(a: number, b: number, c: number): void;
export function keygenconfiguration_use_private_key(a: number, b: number): number;
export function keygenconfiguration_with_algorithm(a: number, b: number, c: number): void;
export function keygenconfiguration_create_with_algorithm(a: number, b: number): void;
export function keygenconfiguration__default(): number;
export function digest_function_from_byte_code(a: number, b: number): void;
export function digest_function_to_byte_code(a: number, b: number): void;
export function __wbg_multihash_free(a: number): void;
export function multihash_digest_function(a: number): number;
export function multihash_clone_payload(a: number, b: number): void;
export function multihash_to_bytes_hex(a: number, b: number): void;
export function multihash_from_bytes_hex(a: number, b: number, c: number): void;
export function multihash_from_bytes(a: number, b: number, c: number): void;
export function multihash_to_bytes(a: number, b: number): void;
export function digest_function_default(): number;
export function __wbg_signature_free(a: number): void;
export function signature_payload_hex(a: number, b: number): void;
export function signature_payload(a: number, b: number): void;
export function signature_public_key(a: number): number;
export function signature_verify(a: number, b: number, c: number): void;
export function signature_reproduce(a: number, b: number, c: number): void;
export function signature_sign_with_private_key(a: number, b: number, c: number): void;
export function signature_sign_with_key_pair(a: number, b: number, c: number): void;
export function __wbg_publickey_free(a: number): void;
export function publickey_reproduce(a: number, b: number, c: number): void;
export function publickey_payload_hex(a: number, b: number): void;
export function publickey_payload(a: number, b: number): void;
export function publickey_digest_function(a: number): number;
export function publickey_to_multihash_hex(a: number, b: number): void;
export function publickey_to_multihash(a: number): number;
export function publickey_to_format(a: number, b: number): void;
export function publickey_from_private_key(a: number): number;
export function publickey_from_multihash(a: number): number;
export function publickey_from_multihash_hex(a: number, b: number, c: number): void;
export function algorithm_default(): number;
export function main(): void;
export function __wbindgen_malloc(a: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number): number;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number): void;
export function __wbindgen_exn_store(a: number): void;
export function __wbindgen_start(): void;
