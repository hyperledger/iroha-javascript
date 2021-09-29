/* eslint-disable */
import {
    BytesVec_Decoded,
    BytesVec_Encodable,
    BytesVec_decode,
    BytesVec_encode,
    Compact_Decoded,
    Compact_Encodable,
    Compact_decode,
    Compact_encode,
    DecodeResult,
    Encode,
    EncodeAsIs,
    Enum,
    EnumDecoders,
    EnumEncoders,
    Option,
    Valuable,
    bool_Decoded,
    bool_Encodable,
    bool_decode,
    bool_encode,
    decodeEnum,
    decodeMap,
    decodeSet,
    decodeStruct,
    decodeTuple,
    decodeUint8Array,
    decodeVec,
    encodeEnum,
    encodeMap,
    encodeSet,
    encodeStruct,
    encodeTuple,
    encodeUint8Array,
    encodeVec,
    makeEncoderAsIsRespectable,
    str_Decoded,
    str_Encodable,
    str_decode,
    str_encode,
    u128_Decoded,
    u128_Encodable,
    u128_decode,
    u128_encode,
    u32_Decoded,
    u32_Encodable,
    u32_decode,
    u32_encode,
    u64_Decoded,
    u64_Encodable,
    u64_decode,
    u64_encode,
} from '@scale-codec/definition-runtime';

// Array_u8_32

export type Array_u8_32_Decoded = Uint8Array;

export type Array_u8_32_Encodable = Uint8Array;

const Array_u8_32_len = 32;

export function Array_u8_32_decode(bytes: Uint8Array): DecodeResult<Array_u8_32_Decoded> {
    return decodeUint8Array(bytes, Array_u8_32_len);
}

export function Array_u8_32_encode(encodable: Array_u8_32_Encodable): Uint8Array {
    return encodeUint8Array(encodable, Array_u8_32_len);
}

// BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account

export type BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_Decoded = Map<
    iroha_data_model_account_Id_Decoded,
    iroha_data_model_account_Account_Decoded
>;

export type BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_Encodable = Map<
    iroha_data_model_account_Id_Encodable | EncodeAsIs,
    iroha_data_model_account_Account_Encodable | EncodeAsIs
>;

const [
    BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_encode_key,
    BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_encode_value,
] = ([iroha_data_model_account_Id_encode, iroha_data_model_account_Account_encode] as any).map(
    makeEncoderAsIsRespectable,
) as [
    Encode<iroha_data_model_account_Id_Encodable | EncodeAsIs>,
    Encode<iroha_data_model_account_Account_Encodable | EncodeAsIs>,
];

export function BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_decode(
    bytes: Uint8Array,
): DecodeResult<BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_Decoded> {
    return decodeMap(bytes, iroha_data_model_account_Id_decode, iroha_data_model_account_Account_decode);
}

export function BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_encode(
    encodable: BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_Encodable,
): Uint8Array {
    return encodeMap(
        encodable,
        BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_encode_key,
        BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_encode_value,
    );
}

// BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry

export type BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_Decoded = Map<
    iroha_data_model_asset_DefinitionId_Decoded,
    iroha_data_model_asset_AssetDefinitionEntry_Decoded
>;

export type BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_Encodable = Map<
    iroha_data_model_asset_DefinitionId_Encodable | EncodeAsIs,
    iroha_data_model_asset_AssetDefinitionEntry_Encodable | EncodeAsIs
>;

const [
    BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_encode_key,
    BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_encode_value,
] = ([iroha_data_model_asset_DefinitionId_encode, iroha_data_model_asset_AssetDefinitionEntry_encode] as any).map(
    makeEncoderAsIsRespectable,
) as [
    Encode<iroha_data_model_asset_DefinitionId_Encodable | EncodeAsIs>,
    Encode<iroha_data_model_asset_AssetDefinitionEntry_Encodable | EncodeAsIs>,
];

export function BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_decode(
    bytes: Uint8Array,
): DecodeResult<BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_Decoded> {
    return decodeMap(
        bytes,
        iroha_data_model_asset_DefinitionId_decode,
        iroha_data_model_asset_AssetDefinitionEntry_decode,
    );
}

export function BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_encode(
    encodable: BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_Encodable,
): Uint8Array {
    return encodeMap(
        encodable,
        BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_encode_key,
        BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_encode_value,
    );
}

// BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset

export type BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_Decoded = Map<
    iroha_data_model_asset_Id_Decoded,
    iroha_data_model_asset_Asset_Decoded
>;

export type BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_Encodable = Map<
    iroha_data_model_asset_Id_Encodable | EncodeAsIs,
    iroha_data_model_asset_Asset_Encodable | EncodeAsIs
>;

const [
    BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_encode_key,
    BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_encode_value,
] = ([iroha_data_model_asset_Id_encode, iroha_data_model_asset_Asset_encode] as any).map(
    makeEncoderAsIsRespectable,
) as [
    Encode<iroha_data_model_asset_Id_Encodable | EncodeAsIs>,
    Encode<iroha_data_model_asset_Asset_Encodable | EncodeAsIs>,
];

export function BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_decode(
    bytes: Uint8Array,
): DecodeResult<BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_Decoded> {
    return decodeMap(bytes, iroha_data_model_asset_Id_decode, iroha_data_model_asset_Asset_decode);
}

export function BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_encode(
    encodable: BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_Encodable,
): Uint8Array {
    return encodeMap(
        encodable,
        BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_encode_key,
        BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_encode_value,
    );
}

// BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value

export type BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded = Map<
    str_Decoded,
    iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded
>;

export type BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable = Map<
    str_Encodable | EncodeAsIs,
    iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs
>;

const [
    BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode_key,
    BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode_value,
] = ([str_encode, iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode] as any).map(
    makeEncoderAsIsRespectable,
) as [
    Encode<str_Encodable | EncodeAsIs>,
    Encode<iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs>,
];

export function BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode(
    bytes: Uint8Array,
): DecodeResult<BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded> {
    return decodeMap(bytes, str_decode, iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode);
}

export function BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode(
    encodable: BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable,
): Uint8Array {
    return encodeMap(
        encodable,
        BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode_key,
        BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode_value,
    );
}

// BTreeMap_String_iroha_data_model_Value

export type BTreeMap_String_iroha_data_model_Value_Decoded = Map<str_Decoded, iroha_data_model_Value_Decoded>;

export type BTreeMap_String_iroha_data_model_Value_Encodable = Map<
    str_Encodable | EncodeAsIs,
    iroha_data_model_Value_Encodable | EncodeAsIs
>;

const [BTreeMap_String_iroha_data_model_Value_encode_key, BTreeMap_String_iroha_data_model_Value_encode_value] = (
    [str_encode, iroha_data_model_Value_encode] as any
).map(makeEncoderAsIsRespectable) as [
    Encode<str_Encodable | EncodeAsIs>,
    Encode<iroha_data_model_Value_Encodable | EncodeAsIs>,
];

export function BTreeMap_String_iroha_data_model_Value_decode(
    bytes: Uint8Array,
): DecodeResult<BTreeMap_String_iroha_data_model_Value_Decoded> {
    return decodeMap(bytes, str_decode, iroha_data_model_Value_decode);
}

export function BTreeMap_String_iroha_data_model_Value_encode(
    encodable: BTreeMap_String_iroha_data_model_Value_Encodable,
): Uint8Array {
    return encodeMap(
        encodable,
        BTreeMap_String_iroha_data_model_Value_encode_key,
        BTreeMap_String_iroha_data_model_Value_encode_value,
    );
}

// BTreeSet_iroha_crypto_Signature

export type BTreeSet_iroha_crypto_Signature_Decoded = Set<iroha_crypto_Signature_Decoded>;

export type BTreeSet_iroha_crypto_Signature_Encodable = Set<iroha_crypto_Signature_Encodable | EncodeAsIs>;

// BTreeSet_iroha_crypto_Signature set tools

const BTreeSet_iroha_crypto_Signature_entry_encode = makeEncoderAsIsRespectable(iroha_crypto_Signature_encode);

// BTreeSet_iroha_crypto_Signature tools end

export function BTreeSet_iroha_crypto_Signature_decode(
    bytes: Uint8Array,
): DecodeResult<BTreeSet_iroha_crypto_Signature_Decoded> {
    return decodeSet(bytes, iroha_crypto_Signature_decode);
}

export function BTreeSet_iroha_crypto_Signature_encode(
    encodable: BTreeSet_iroha_crypto_Signature_Encodable,
): Uint8Array {
    return encodeSet(encodable, BTreeSet_iroha_crypto_Signature_entry_encode);
}

// BTreeSet_iroha_data_model_permissions_PermissionToken

export type BTreeSet_iroha_data_model_permissions_PermissionToken_Decoded =
    Set<iroha_data_model_permissions_PermissionToken_Decoded>;

export type BTreeSet_iroha_data_model_permissions_PermissionToken_Encodable = Set<
    iroha_data_model_permissions_PermissionToken_Encodable | EncodeAsIs
>;

// BTreeSet_iroha_data_model_permissions_PermissionToken set tools

const BTreeSet_iroha_data_model_permissions_PermissionToken_entry_encode = makeEncoderAsIsRespectable(
    iroha_data_model_permissions_PermissionToken_encode,
);

// BTreeSet_iroha_data_model_permissions_PermissionToken tools end

export function BTreeSet_iroha_data_model_permissions_PermissionToken_decode(
    bytes: Uint8Array,
): DecodeResult<BTreeSet_iroha_data_model_permissions_PermissionToken_Decoded> {
    return decodeSet(bytes, iroha_data_model_permissions_PermissionToken_decode);
}

export function BTreeSet_iroha_data_model_permissions_PermissionToken_encode(
    encodable: BTreeSet_iroha_data_model_permissions_PermissionToken_Encodable,
): Uint8Array {
    return encodeSet(encodable, BTreeSet_iroha_data_model_permissions_PermissionToken_entry_encode);
}

// iroha_crypto_Hash

export type iroha_crypto_Hash_Decoded = [Array_u8_32_Decoded];

export type iroha_crypto_Hash_Encodable = [Array_u8_32_Encodable | EncodeAsIs];

// iroha_crypto_Hash tuple-related tools

const iroha_crypto_Hash_decoders = [Array_u8_32_decode];
const iroha_crypto_Hash_encoders = ([Array_u8_32_encode] as any).map(makeEncoderAsIsRespectable);

// iroha_crypto_Hash tools end

export function iroha_crypto_Hash_decode(bytes: Uint8Array): DecodeResult<iroha_crypto_Hash_Decoded> {
    return decodeTuple(bytes, iroha_crypto_Hash_decoders as any);
}

export function iroha_crypto_Hash_encode(encodable: iroha_crypto_Hash_Encodable): Uint8Array {
    return encodeTuple(encodable, iroha_crypto_Hash_encoders as any);
}

// iroha_crypto_PublicKey

export type iroha_crypto_PublicKey_Decoded = {
    digest_function: str_Decoded;
    payload: BytesVec_Decoded;
};

export type iroha_crypto_PublicKey_Encodable = {
    digest_function: str_Encodable | EncodeAsIs;
    payload: BytesVec_Encodable | EncodeAsIs;
};

const iroha_crypto_PublicKey_order: (keyof iroha_crypto_PublicKey_Decoded)[] = ['digest_function', 'payload'];
const iroha_crypto_PublicKey_decoders = {
    digest_function: str_decode,
    payload: BytesVec_decode,
};
const iroha_crypto_PublicKey_encoders = {
    digest_function: makeEncoderAsIsRespectable(str_encode),
    payload: makeEncoderAsIsRespectable(BytesVec_encode),
};

export function iroha_crypto_PublicKey_decode(bytes: Uint8Array): DecodeResult<iroha_crypto_PublicKey_Decoded> {
    return decodeStruct(bytes, iroha_crypto_PublicKey_decoders, iroha_crypto_PublicKey_order);
}

export function iroha_crypto_PublicKey_encode(encodable: iroha_crypto_PublicKey_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_crypto_PublicKey_encoders, iroha_crypto_PublicKey_order);
}

// iroha_crypto_Signature

export type iroha_crypto_Signature_Decoded = {
    public_key: iroha_crypto_PublicKey_Decoded;
    signature: BytesVec_Decoded;
};

export type iroha_crypto_Signature_Encodable = {
    public_key: iroha_crypto_PublicKey_Encodable | EncodeAsIs;
    signature: BytesVec_Encodable | EncodeAsIs;
};

const iroha_crypto_Signature_order: (keyof iroha_crypto_Signature_Decoded)[] = ['public_key', 'signature'];
const iroha_crypto_Signature_decoders = {
    public_key: iroha_crypto_PublicKey_decode,
    signature: BytesVec_decode,
};
const iroha_crypto_Signature_encoders = {
    public_key: makeEncoderAsIsRespectable(iroha_crypto_PublicKey_encode),
    signature: makeEncoderAsIsRespectable(BytesVec_encode),
};

export function iroha_crypto_Signature_decode(bytes: Uint8Array): DecodeResult<iroha_crypto_Signature_Decoded> {
    return decodeStruct(bytes, iroha_crypto_Signature_decoders, iroha_crypto_Signature_order);
}

export function iroha_crypto_Signature_encode(encodable: iroha_crypto_Signature_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_crypto_Signature_encoders, iroha_crypto_Signature_order);
}

// iroha_data_model_account_Account

export type iroha_data_model_account_Account_Decoded = {
    id: iroha_data_model_account_Id_Decoded;
    assets: BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_Decoded;
    signatories: Vec_iroha_crypto_PublicKey_Decoded;
    permission_tokens: BTreeSet_iroha_data_model_permissions_PermissionToken_Decoded;
    signature_check_condition: iroha_data_model_account_SignatureCheckCondition_Decoded;
    metadata: iroha_data_model_metadata_Metadata_Decoded;
};

export type iroha_data_model_account_Account_Encodable = {
    id: iroha_data_model_account_Id_Encodable | EncodeAsIs;
    assets: BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_Encodable | EncodeAsIs;
    signatories: Vec_iroha_crypto_PublicKey_Encodable | EncodeAsIs;
    permission_tokens: BTreeSet_iroha_data_model_permissions_PermissionToken_Encodable | EncodeAsIs;
    signature_check_condition: iroha_data_model_account_SignatureCheckCondition_Encodable | EncodeAsIs;
    metadata: iroha_data_model_metadata_Metadata_Encodable | EncodeAsIs;
};

const iroha_data_model_account_Account_order: (keyof iroha_data_model_account_Account_Decoded)[] = [
    'id',
    'assets',
    'signatories',
    'permission_tokens',
    'signature_check_condition',
    'metadata',
];
const iroha_data_model_account_Account_decoders = {
    id: iroha_data_model_account_Id_decode,
    assets: BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_decode,
    signatories: Vec_iroha_crypto_PublicKey_decode,
    permission_tokens: BTreeSet_iroha_data_model_permissions_PermissionToken_decode,
    signature_check_condition: iroha_data_model_account_SignatureCheckCondition_decode,
    metadata: iroha_data_model_metadata_Metadata_decode,
};
const iroha_data_model_account_Account_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_account_Id_encode),
    assets: makeEncoderAsIsRespectable(BTreeMap_iroha_data_model_asset_Id_iroha_data_model_asset_Asset_encode),
    signatories: makeEncoderAsIsRespectable(Vec_iroha_crypto_PublicKey_encode),
    permission_tokens: makeEncoderAsIsRespectable(BTreeSet_iroha_data_model_permissions_PermissionToken_encode),
    signature_check_condition: makeEncoderAsIsRespectable(iroha_data_model_account_SignatureCheckCondition_encode),
    metadata: makeEncoderAsIsRespectable(iroha_data_model_metadata_Metadata_encode),
};

export function iroha_data_model_account_Account_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_account_Account_Decoded> {
    return decodeStruct(bytes, iroha_data_model_account_Account_decoders, iroha_data_model_account_Account_order);
}

export function iroha_data_model_account_Account_encode(
    encodable: iroha_data_model_account_Account_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_account_Account_encoders, iroha_data_model_account_Account_order);
}

// iroha_data_model_account_Id

export type iroha_data_model_account_Id_Decoded = {
    name: str_Decoded;
    domain_name: str_Decoded;
};

export type iroha_data_model_account_Id_Encodable = {
    name: str_Encodable | EncodeAsIs;
    domain_name: str_Encodable | EncodeAsIs;
};

const iroha_data_model_account_Id_order: (keyof iroha_data_model_account_Id_Decoded)[] = ['name', 'domain_name'];
const iroha_data_model_account_Id_decoders = {
    name: str_decode,
    domain_name: str_decode,
};
const iroha_data_model_account_Id_encoders = {
    name: makeEncoderAsIsRespectable(str_encode),
    domain_name: makeEncoderAsIsRespectable(str_encode),
};

export function iroha_data_model_account_Id_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_account_Id_Decoded> {
    return decodeStruct(bytes, iroha_data_model_account_Id_decoders, iroha_data_model_account_Id_order);
}

export function iroha_data_model_account_Id_encode(encodable: iroha_data_model_account_Id_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_account_Id_encoders, iroha_data_model_account_Id_order);
}

// iroha_data_model_account_NewAccount

export type iroha_data_model_account_NewAccount_Decoded = {
    id: iroha_data_model_account_Id_Decoded;
    signatories: Vec_iroha_crypto_PublicKey_Decoded;
    metadata: iroha_data_model_metadata_Metadata_Decoded;
};

export type iroha_data_model_account_NewAccount_Encodable = {
    id: iroha_data_model_account_Id_Encodable | EncodeAsIs;
    signatories: Vec_iroha_crypto_PublicKey_Encodable | EncodeAsIs;
    metadata: iroha_data_model_metadata_Metadata_Encodable | EncodeAsIs;
};

const iroha_data_model_account_NewAccount_order: (keyof iroha_data_model_account_NewAccount_Decoded)[] = [
    'id',
    'signatories',
    'metadata',
];
const iroha_data_model_account_NewAccount_decoders = {
    id: iroha_data_model_account_Id_decode,
    signatories: Vec_iroha_crypto_PublicKey_decode,
    metadata: iroha_data_model_metadata_Metadata_decode,
};
const iroha_data_model_account_NewAccount_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_account_Id_encode),
    signatories: makeEncoderAsIsRespectable(Vec_iroha_crypto_PublicKey_encode),
    metadata: makeEncoderAsIsRespectable(iroha_data_model_metadata_Metadata_encode),
};

export function iroha_data_model_account_NewAccount_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_account_NewAccount_Decoded> {
    return decodeStruct(bytes, iroha_data_model_account_NewAccount_decoders, iroha_data_model_account_NewAccount_order);
}

export function iroha_data_model_account_NewAccount_encode(
    encodable: iroha_data_model_account_NewAccount_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_account_NewAccount_encoders,
        iroha_data_model_account_NewAccount_order,
    );
}

// iroha_data_model_account_SignatureCheckCondition

export type iroha_data_model_account_SignatureCheckCondition_Decoded = [
    iroha_data_model_expression_EvaluatesTo_bool_Decoded,
];

export type iroha_data_model_account_SignatureCheckCondition_Encodable = [
    iroha_data_model_expression_EvaluatesTo_bool_Encodable | EncodeAsIs,
];

// iroha_data_model_account_SignatureCheckCondition tuple-related tools

const iroha_data_model_account_SignatureCheckCondition_decoders = [iroha_data_model_expression_EvaluatesTo_bool_decode];
const iroha_data_model_account_SignatureCheckCondition_encoders = (
    [iroha_data_model_expression_EvaluatesTo_bool_encode] as any
).map(makeEncoderAsIsRespectable);

// iroha_data_model_account_SignatureCheckCondition tools end

export function iroha_data_model_account_SignatureCheckCondition_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_account_SignatureCheckCondition_Decoded> {
    return decodeTuple(bytes, iroha_data_model_account_SignatureCheckCondition_decoders as any);
}

export function iroha_data_model_account_SignatureCheckCondition_encode(
    encodable: iroha_data_model_account_SignatureCheckCondition_Encodable,
): Uint8Array {
    return encodeTuple(encodable, iroha_data_model_account_SignatureCheckCondition_encoders as any);
}

// iroha_data_model_asset_Asset

export type iroha_data_model_asset_Asset_Decoded = {
    id: iroha_data_model_asset_Id_Decoded;
    value: iroha_data_model_asset_AssetValue_Decoded;
};

export type iroha_data_model_asset_Asset_Encodable = {
    id: iroha_data_model_asset_Id_Encodable | EncodeAsIs;
    value: iroha_data_model_asset_AssetValue_Encodable | EncodeAsIs;
};

const iroha_data_model_asset_Asset_order: (keyof iroha_data_model_asset_Asset_Decoded)[] = ['id', 'value'];
const iroha_data_model_asset_Asset_decoders = {
    id: iroha_data_model_asset_Id_decode,
    value: iroha_data_model_asset_AssetValue_decode,
};
const iroha_data_model_asset_Asset_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_asset_Id_encode),
    value: makeEncoderAsIsRespectable(iroha_data_model_asset_AssetValue_encode),
};

export function iroha_data_model_asset_Asset_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_asset_Asset_Decoded> {
    return decodeStruct(bytes, iroha_data_model_asset_Asset_decoders, iroha_data_model_asset_Asset_order);
}

export function iroha_data_model_asset_Asset_encode(encodable: iroha_data_model_asset_Asset_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_asset_Asset_encoders, iroha_data_model_asset_Asset_order);
}

// iroha_data_model_asset_AssetDefinition

export type iroha_data_model_asset_AssetDefinition_Decoded = {
    value_type: iroha_data_model_asset_AssetValueType_Decoded;
    id: iroha_data_model_asset_DefinitionId_Decoded;
    metadata: iroha_data_model_metadata_Metadata_Decoded;
};

export type iroha_data_model_asset_AssetDefinition_Encodable = {
    value_type: iroha_data_model_asset_AssetValueType_Encodable | EncodeAsIs;
    id: iroha_data_model_asset_DefinitionId_Encodable | EncodeAsIs;
    metadata: iroha_data_model_metadata_Metadata_Encodable | EncodeAsIs;
};

const iroha_data_model_asset_AssetDefinition_order: (keyof iroha_data_model_asset_AssetDefinition_Decoded)[] = [
    'value_type',
    'id',
    'metadata',
];
const iroha_data_model_asset_AssetDefinition_decoders = {
    value_type: iroha_data_model_asset_AssetValueType_decode,
    id: iroha_data_model_asset_DefinitionId_decode,
    metadata: iroha_data_model_metadata_Metadata_decode,
};
const iroha_data_model_asset_AssetDefinition_encoders = {
    value_type: makeEncoderAsIsRespectable(iroha_data_model_asset_AssetValueType_encode),
    id: makeEncoderAsIsRespectable(iroha_data_model_asset_DefinitionId_encode),
    metadata: makeEncoderAsIsRespectable(iroha_data_model_metadata_Metadata_encode),
};

export function iroha_data_model_asset_AssetDefinition_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_asset_AssetDefinition_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_asset_AssetDefinition_decoders,
        iroha_data_model_asset_AssetDefinition_order,
    );
}

export function iroha_data_model_asset_AssetDefinition_encode(
    encodable: iroha_data_model_asset_AssetDefinition_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_asset_AssetDefinition_encoders,
        iroha_data_model_asset_AssetDefinition_order,
    );
}

// iroha_data_model_asset_AssetDefinitionEntry

export type iroha_data_model_asset_AssetDefinitionEntry_Decoded = {
    definition: iroha_data_model_asset_AssetDefinition_Decoded;
    registered_by: iroha_data_model_account_Id_Decoded;
};

export type iroha_data_model_asset_AssetDefinitionEntry_Encodable = {
    definition: iroha_data_model_asset_AssetDefinition_Encodable | EncodeAsIs;
    registered_by: iroha_data_model_account_Id_Encodable | EncodeAsIs;
};

const iroha_data_model_asset_AssetDefinitionEntry_order: (keyof iroha_data_model_asset_AssetDefinitionEntry_Decoded)[] =
    ['definition', 'registered_by'];
const iroha_data_model_asset_AssetDefinitionEntry_decoders = {
    definition: iroha_data_model_asset_AssetDefinition_decode,
    registered_by: iroha_data_model_account_Id_decode,
};
const iroha_data_model_asset_AssetDefinitionEntry_encoders = {
    definition: makeEncoderAsIsRespectable(iroha_data_model_asset_AssetDefinition_encode),
    registered_by: makeEncoderAsIsRespectable(iroha_data_model_account_Id_encode),
};

export function iroha_data_model_asset_AssetDefinitionEntry_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_asset_AssetDefinitionEntry_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_asset_AssetDefinitionEntry_decoders,
        iroha_data_model_asset_AssetDefinitionEntry_order,
    );
}

export function iroha_data_model_asset_AssetDefinitionEntry_encode(
    encodable: iroha_data_model_asset_AssetDefinitionEntry_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_asset_AssetDefinitionEntry_encoders,
        iroha_data_model_asset_AssetDefinitionEntry_order,
    );
}

// iroha_data_model_asset_AssetValue

export type iroha_data_model_asset_AssetValue_Decoded = Enum<{
    Quantity: Valuable<u32_Decoded>;
    BigQuantity: Valuable<u128_Decoded>;
    Fixed: Valuable<iroha_data_model_fixed_Fixed_Decoded>;
    Store: Valuable<iroha_data_model_metadata_Metadata_Decoded>;
}>;

export type iroha_data_model_asset_AssetValue_Encodable = Enum<{
    Quantity: Valuable<u32_Encodable | EncodeAsIs>;
    BigQuantity: Valuable<u128_Encodable | EncodeAsIs>;
    Fixed: Valuable<iroha_data_model_fixed_Fixed_Encodable | EncodeAsIs>;
    Store: Valuable<iroha_data_model_metadata_Metadata_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_asset_AssetValue enum tools

const iroha_data_model_asset_AssetValue_decoders: EnumDecoders = {
    0: { v: 'Quantity', decode: u32_decode },
    1: { v: 'BigQuantity', decode: u128_decode },
    2: { v: 'Fixed', decode: iroha_data_model_fixed_Fixed_decode },
    3: { v: 'Store', decode: iroha_data_model_metadata_Metadata_decode },
};
const iroha_data_model_asset_AssetValue_encoders: EnumEncoders = {
    Quantity: { d: 0, encode: u32_encode },
    BigQuantity: { d: 1, encode: u128_encode },
    Fixed: { d: 2, encode: iroha_data_model_fixed_Fixed_encode },
    Store: { d: 3, encode: iroha_data_model_metadata_Metadata_encode },
};

// iroha_data_model_asset_AssetValue tools end

export function iroha_data_model_asset_AssetValue_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_asset_AssetValue_Decoded> {
    return decodeEnum(bytes, iroha_data_model_asset_AssetValue_decoders);
}

export function iroha_data_model_asset_AssetValue_encode(
    encodable: iroha_data_model_asset_AssetValue_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_asset_AssetValue_encoders);
}

// iroha_data_model_asset_AssetValueType

export type iroha_data_model_asset_AssetValueType_Decoded = Enum<{
    Quantity: null;
    BigQuantity: null;
    Fixed: null;
    Store: null;
}>;

export type iroha_data_model_asset_AssetValueType_Encodable = Enum<{
    Quantity: null;
    BigQuantity: null;
    Fixed: null;
    Store: null;
}>;

// iroha_data_model_asset_AssetValueType enum tools

const iroha_data_model_asset_AssetValueType_decoders: EnumDecoders = {
    0: { v: 'Quantity' },
    1: { v: 'BigQuantity' },
    2: { v: 'Fixed' },
    3: { v: 'Store' },
};
const iroha_data_model_asset_AssetValueType_encoders: EnumEncoders = {
    Quantity: { d: 0 },
    BigQuantity: { d: 1 },
    Fixed: { d: 2 },
    Store: { d: 3 },
};

// iroha_data_model_asset_AssetValueType tools end

export function iroha_data_model_asset_AssetValueType_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_asset_AssetValueType_Decoded> {
    return decodeEnum(bytes, iroha_data_model_asset_AssetValueType_decoders);
}

export function iroha_data_model_asset_AssetValueType_encode(
    encodable: iroha_data_model_asset_AssetValueType_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_asset_AssetValueType_encoders);
}

// iroha_data_model_asset_DefinitionId

export type iroha_data_model_asset_DefinitionId_Decoded = {
    name: str_Decoded;
    domain_name: str_Decoded;
};

export type iroha_data_model_asset_DefinitionId_Encodable = {
    name: str_Encodable | EncodeAsIs;
    domain_name: str_Encodable | EncodeAsIs;
};

const iroha_data_model_asset_DefinitionId_order: (keyof iroha_data_model_asset_DefinitionId_Decoded)[] = [
    'name',
    'domain_name',
];
const iroha_data_model_asset_DefinitionId_decoders = {
    name: str_decode,
    domain_name: str_decode,
};
const iroha_data_model_asset_DefinitionId_encoders = {
    name: makeEncoderAsIsRespectable(str_encode),
    domain_name: makeEncoderAsIsRespectable(str_encode),
};

export function iroha_data_model_asset_DefinitionId_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_asset_DefinitionId_Decoded> {
    return decodeStruct(bytes, iroha_data_model_asset_DefinitionId_decoders, iroha_data_model_asset_DefinitionId_order);
}

export function iroha_data_model_asset_DefinitionId_encode(
    encodable: iroha_data_model_asset_DefinitionId_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_asset_DefinitionId_encoders,
        iroha_data_model_asset_DefinitionId_order,
    );
}

// iroha_data_model_asset_Id

export type iroha_data_model_asset_Id_Decoded = {
    definition_id: iroha_data_model_asset_DefinitionId_Decoded;
    account_id: iroha_data_model_account_Id_Decoded;
};

export type iroha_data_model_asset_Id_Encodable = {
    definition_id: iroha_data_model_asset_DefinitionId_Encodable | EncodeAsIs;
    account_id: iroha_data_model_account_Id_Encodable | EncodeAsIs;
};

const iroha_data_model_asset_Id_order: (keyof iroha_data_model_asset_Id_Decoded)[] = ['definition_id', 'account_id'];
const iroha_data_model_asset_Id_decoders = {
    definition_id: iroha_data_model_asset_DefinitionId_decode,
    account_id: iroha_data_model_account_Id_decode,
};
const iroha_data_model_asset_Id_encoders = {
    definition_id: makeEncoderAsIsRespectable(iroha_data_model_asset_DefinitionId_encode),
    account_id: makeEncoderAsIsRespectable(iroha_data_model_account_Id_encode),
};

export function iroha_data_model_asset_Id_decode(bytes: Uint8Array): DecodeResult<iroha_data_model_asset_Id_Decoded> {
    return decodeStruct(bytes, iroha_data_model_asset_Id_decoders, iroha_data_model_asset_Id_order);
}

export function iroha_data_model_asset_Id_encode(encodable: iroha_data_model_asset_Id_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_asset_Id_encoders, iroha_data_model_asset_Id_order);
}

// iroha_data_model_domain_Domain

export type iroha_data_model_domain_Domain_Decoded = {
    name: str_Decoded;
    accounts: BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_Decoded;
    asset_definitions: BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_Decoded;
};

export type iroha_data_model_domain_Domain_Encodable = {
    name: str_Encodable | EncodeAsIs;
    accounts: BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_Encodable | EncodeAsIs;
    asset_definitions:
        | BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_Encodable
        | EncodeAsIs;
};

const iroha_data_model_domain_Domain_order: (keyof iroha_data_model_domain_Domain_Decoded)[] = [
    'name',
    'accounts',
    'asset_definitions',
];
const iroha_data_model_domain_Domain_decoders = {
    name: str_decode,
    accounts: BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_decode,
    asset_definitions: BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_decode,
};
const iroha_data_model_domain_Domain_encoders = {
    name: makeEncoderAsIsRespectable(str_encode),
    accounts: makeEncoderAsIsRespectable(BTreeMap_iroha_data_model_account_Id_iroha_data_model_account_Account_encode),
    asset_definitions: makeEncoderAsIsRespectable(
        BTreeMap_iroha_data_model_asset_DefinitionId_iroha_data_model_asset_AssetDefinitionEntry_encode,
    ),
};

export function iroha_data_model_domain_Domain_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_domain_Domain_Decoded> {
    return decodeStruct(bytes, iroha_data_model_domain_Domain_decoders, iroha_data_model_domain_Domain_order);
}

export function iroha_data_model_domain_Domain_encode(encodable: iroha_data_model_domain_Domain_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_domain_Domain_encoders, iroha_data_model_domain_Domain_order);
}

// iroha_data_model_events_data_Event

// iroha_data_model_events_data_Event is just a void alias

import {
    Void_Decoded as iroha_data_model_events_data_Event_Decoded,
    Void_Encodable as iroha_data_model_events_data_Event_Encodable,
    Void_decode as iroha_data_model_events_data_Event_decode,
    Void_encode as iroha_data_model_events_data_Event_encode,
} from '@scale-codec/definition-runtime';

export {
    iroha_data_model_events_data_Event_Decoded,
    iroha_data_model_events_data_Event_Encodable,
    iroha_data_model_events_data_Event_decode,
    iroha_data_model_events_data_Event_encode,
};

// iroha_data_model_events_data_EventFilter

// iroha_data_model_events_data_EventFilter is just a void alias

import {
    Void_Decoded as iroha_data_model_events_data_EventFilter_Decoded,
    Void_Encodable as iroha_data_model_events_data_EventFilter_Encodable,
    Void_decode as iroha_data_model_events_data_EventFilter_decode,
    Void_encode as iroha_data_model_events_data_EventFilter_encode,
} from '@scale-codec/definition-runtime';

export {
    iroha_data_model_events_data_EventFilter_Decoded,
    iroha_data_model_events_data_EventFilter_Encodable,
    iroha_data_model_events_data_EventFilter_decode,
    iroha_data_model_events_data_EventFilter_encode,
};

// iroha_data_model_events_Event

export type iroha_data_model_events_Event_Decoded = Enum<{
    Pipeline: Valuable<iroha_data_model_events_pipeline_Event_Decoded>;
    Data: Valuable<iroha_data_model_events_data_Event_Decoded>;
}>;

export type iroha_data_model_events_Event_Encodable = Enum<{
    Pipeline: Valuable<iroha_data_model_events_pipeline_Event_Encodable | EncodeAsIs>;
    Data: Valuable<iroha_data_model_events_data_Event_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_events_Event enum tools

const iroha_data_model_events_Event_decoders: EnumDecoders = {
    0: { v: 'Pipeline', decode: iroha_data_model_events_pipeline_Event_decode },
    1: { v: 'Data', decode: iroha_data_model_events_data_Event_decode },
};
const iroha_data_model_events_Event_encoders: EnumEncoders = {
    Pipeline: { d: 0, encode: iroha_data_model_events_pipeline_Event_encode },
    Data: { d: 1, encode: iroha_data_model_events_data_Event_encode },
};

// iroha_data_model_events_Event tools end

export function iroha_data_model_events_Event_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_Event_Decoded> {
    return decodeEnum(bytes, iroha_data_model_events_Event_decoders);
}

export function iroha_data_model_events_Event_encode(encodable: iroha_data_model_events_Event_Encodable): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_events_Event_encoders);
}

// iroha_data_model_events_EventFilter

export type iroha_data_model_events_EventFilter_Decoded = Enum<{
    Pipeline: Valuable<iroha_data_model_events_pipeline_EventFilter_Decoded>;
    Data: Valuable<iroha_data_model_events_data_EventFilter_Decoded>;
}>;

export type iroha_data_model_events_EventFilter_Encodable = Enum<{
    Pipeline: Valuable<iroha_data_model_events_pipeline_EventFilter_Encodable | EncodeAsIs>;
    Data: Valuable<iroha_data_model_events_data_EventFilter_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_events_EventFilter enum tools

const iroha_data_model_events_EventFilter_decoders: EnumDecoders = {
    0: { v: 'Pipeline', decode: iroha_data_model_events_pipeline_EventFilter_decode },
    1: { v: 'Data', decode: iroha_data_model_events_data_EventFilter_decode },
};
const iroha_data_model_events_EventFilter_encoders: EnumEncoders = {
    Pipeline: { d: 0, encode: iroha_data_model_events_pipeline_EventFilter_encode },
    Data: { d: 1, encode: iroha_data_model_events_data_EventFilter_encode },
};

// iroha_data_model_events_EventFilter tools end

export function iroha_data_model_events_EventFilter_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_EventFilter_Decoded> {
    return decodeEnum(bytes, iroha_data_model_events_EventFilter_decoders);
}

export function iroha_data_model_events_EventFilter_encode(
    encodable: iroha_data_model_events_EventFilter_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_events_EventFilter_encoders);
}

// iroha_data_model_events_EventSocketMessage

export type iroha_data_model_events_EventSocketMessage_Decoded = Enum<{
    SubscriptionRequest: Valuable<iroha_data_model_events_SubscriptionRequest_Decoded>;
    SubscriptionAccepted: null;
    Event: Valuable<iroha_data_model_events_Event_Decoded>;
    EventReceived: null;
}>;

export type iroha_data_model_events_EventSocketMessage_Encodable = Enum<{
    SubscriptionRequest: Valuable<iroha_data_model_events_SubscriptionRequest_Encodable | EncodeAsIs>;
    SubscriptionAccepted: null;
    Event: Valuable<iroha_data_model_events_Event_Encodable | EncodeAsIs>;
    EventReceived: null;
}>;

// iroha_data_model_events_EventSocketMessage enum tools

const iroha_data_model_events_EventSocketMessage_decoders: EnumDecoders = {
    0: { v: 'SubscriptionRequest', decode: iroha_data_model_events_SubscriptionRequest_decode },
    1: { v: 'SubscriptionAccepted' },
    2: { v: 'Event', decode: iroha_data_model_events_Event_decode },
    3: { v: 'EventReceived' },
};
const iroha_data_model_events_EventSocketMessage_encoders: EnumEncoders = {
    SubscriptionRequest: { d: 0, encode: iroha_data_model_events_SubscriptionRequest_encode },
    SubscriptionAccepted: { d: 1 },
    Event: { d: 2, encode: iroha_data_model_events_Event_encode },
    EventReceived: { d: 3 },
};

// iroha_data_model_events_EventSocketMessage tools end

export function iroha_data_model_events_EventSocketMessage_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_EventSocketMessage_Decoded> {
    return decodeEnum(bytes, iroha_data_model_events_EventSocketMessage_decoders);
}

export function iroha_data_model_events_EventSocketMessage_encode(
    encodable: iroha_data_model_events_EventSocketMessage_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_events_EventSocketMessage_encoders);
}

// iroha_data_model_events_pipeline_BlockRejectionReason

export type iroha_data_model_events_pipeline_BlockRejectionReason_Decoded = Enum<{
    ConsensusBlockRejection: null;
}>;

export type iroha_data_model_events_pipeline_BlockRejectionReason_Encodable = Enum<{
    ConsensusBlockRejection: null;
}>;

// iroha_data_model_events_pipeline_BlockRejectionReason enum tools

const iroha_data_model_events_pipeline_BlockRejectionReason_decoders: EnumDecoders = {
    0: { v: 'ConsensusBlockRejection' },
};
const iroha_data_model_events_pipeline_BlockRejectionReason_encoders: EnumEncoders = {
    ConsensusBlockRejection: { d: 0 },
};

// iroha_data_model_events_pipeline_BlockRejectionReason tools end

export function iroha_data_model_events_pipeline_BlockRejectionReason_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_BlockRejectionReason_Decoded> {
    return decodeEnum(bytes, iroha_data_model_events_pipeline_BlockRejectionReason_decoders);
}

export function iroha_data_model_events_pipeline_BlockRejectionReason_encode(
    encodable: iroha_data_model_events_pipeline_BlockRejectionReason_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_events_pipeline_BlockRejectionReason_encoders);
}

// iroha_data_model_events_pipeline_EntityType

export type iroha_data_model_events_pipeline_EntityType_Decoded = Enum<{
    Block: null;
    Transaction: null;
}>;

export type iroha_data_model_events_pipeline_EntityType_Encodable = Enum<{
    Block: null;
    Transaction: null;
}>;

// iroha_data_model_events_pipeline_EntityType enum tools

const iroha_data_model_events_pipeline_EntityType_decoders: EnumDecoders = {
    0: { v: 'Block' },
    1: { v: 'Transaction' },
};
const iroha_data_model_events_pipeline_EntityType_encoders: EnumEncoders = {
    Block: { d: 0 },
    Transaction: { d: 1 },
};

// iroha_data_model_events_pipeline_EntityType tools end

export function iroha_data_model_events_pipeline_EntityType_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_EntityType_Decoded> {
    return decodeEnum(bytes, iroha_data_model_events_pipeline_EntityType_decoders);
}

export function iroha_data_model_events_pipeline_EntityType_encode(
    encodable: iroha_data_model_events_pipeline_EntityType_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_events_pipeline_EntityType_encoders);
}

// iroha_data_model_events_pipeline_Event

export type iroha_data_model_events_pipeline_Event_Decoded = {
    entity_type: iroha_data_model_events_pipeline_EntityType_Decoded;
    status: iroha_data_model_events_pipeline_Status_Decoded;
    hash: iroha_crypto_Hash_Decoded;
};

export type iroha_data_model_events_pipeline_Event_Encodable = {
    entity_type: iroha_data_model_events_pipeline_EntityType_Encodable | EncodeAsIs;
    status: iroha_data_model_events_pipeline_Status_Encodable | EncodeAsIs;
    hash: iroha_crypto_Hash_Encodable | EncodeAsIs;
};

const iroha_data_model_events_pipeline_Event_order: (keyof iroha_data_model_events_pipeline_Event_Decoded)[] = [
    'entity_type',
    'status',
    'hash',
];
const iroha_data_model_events_pipeline_Event_decoders = {
    entity_type: iroha_data_model_events_pipeline_EntityType_decode,
    status: iroha_data_model_events_pipeline_Status_decode,
    hash: iroha_crypto_Hash_decode,
};
const iroha_data_model_events_pipeline_Event_encoders = {
    entity_type: makeEncoderAsIsRespectable(iroha_data_model_events_pipeline_EntityType_encode),
    status: makeEncoderAsIsRespectable(iroha_data_model_events_pipeline_Status_encode),
    hash: makeEncoderAsIsRespectable(iroha_crypto_Hash_encode),
};

export function iroha_data_model_events_pipeline_Event_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_Event_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_events_pipeline_Event_decoders,
        iroha_data_model_events_pipeline_Event_order,
    );
}

export function iroha_data_model_events_pipeline_Event_encode(
    encodable: iroha_data_model_events_pipeline_Event_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_events_pipeline_Event_encoders,
        iroha_data_model_events_pipeline_Event_order,
    );
}

// iroha_data_model_events_pipeline_EventFilter

export type iroha_data_model_events_pipeline_EventFilter_Decoded = {
    entity: Option_iroha_data_model_events_pipeline_EntityType_Decoded;
    hash: Option_iroha_crypto_Hash_Decoded;
};

export type iroha_data_model_events_pipeline_EventFilter_Encodable = {
    entity: Option_iroha_data_model_events_pipeline_EntityType_Encodable | EncodeAsIs;
    hash: Option_iroha_crypto_Hash_Encodable | EncodeAsIs;
};

const iroha_data_model_events_pipeline_EventFilter_order: (keyof iroha_data_model_events_pipeline_EventFilter_Decoded)[] =
    ['entity', 'hash'];
const iroha_data_model_events_pipeline_EventFilter_decoders = {
    entity: Option_iroha_data_model_events_pipeline_EntityType_decode,
    hash: Option_iroha_crypto_Hash_decode,
};
const iroha_data_model_events_pipeline_EventFilter_encoders = {
    entity: makeEncoderAsIsRespectable(Option_iroha_data_model_events_pipeline_EntityType_encode),
    hash: makeEncoderAsIsRespectable(Option_iroha_crypto_Hash_encode),
};

export function iroha_data_model_events_pipeline_EventFilter_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_EventFilter_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_events_pipeline_EventFilter_decoders,
        iroha_data_model_events_pipeline_EventFilter_order,
    );
}

export function iroha_data_model_events_pipeline_EventFilter_encode(
    encodable: iroha_data_model_events_pipeline_EventFilter_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_events_pipeline_EventFilter_encoders,
        iroha_data_model_events_pipeline_EventFilter_order,
    );
}

// iroha_data_model_events_pipeline_InstructionExecutionFail

export type iroha_data_model_events_pipeline_InstructionExecutionFail_Decoded = {
    instruction: iroha_data_model_isi_Instruction_Decoded;
    reason: str_Decoded;
};

export type iroha_data_model_events_pipeline_InstructionExecutionFail_Encodable = {
    instruction: iroha_data_model_isi_Instruction_Encodable | EncodeAsIs;
    reason: str_Encodable | EncodeAsIs;
};

const iroha_data_model_events_pipeline_InstructionExecutionFail_order: (keyof iroha_data_model_events_pipeline_InstructionExecutionFail_Decoded)[] =
    ['instruction', 'reason'];
const iroha_data_model_events_pipeline_InstructionExecutionFail_decoders = {
    instruction: iroha_data_model_isi_Instruction_decode,
    reason: str_decode,
};
const iroha_data_model_events_pipeline_InstructionExecutionFail_encoders = {
    instruction: makeEncoderAsIsRespectable(iroha_data_model_isi_Instruction_encode),
    reason: makeEncoderAsIsRespectable(str_encode),
};

export function iroha_data_model_events_pipeline_InstructionExecutionFail_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_InstructionExecutionFail_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_events_pipeline_InstructionExecutionFail_decoders,
        iroha_data_model_events_pipeline_InstructionExecutionFail_order,
    );
}

export function iroha_data_model_events_pipeline_InstructionExecutionFail_encode(
    encodable: iroha_data_model_events_pipeline_InstructionExecutionFail_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_events_pipeline_InstructionExecutionFail_encoders,
        iroha_data_model_events_pipeline_InstructionExecutionFail_order,
    );
}

// iroha_data_model_events_pipeline_NotPermittedFail

export type iroha_data_model_events_pipeline_NotPermittedFail_Decoded = {
    reason: str_Decoded;
};

export type iroha_data_model_events_pipeline_NotPermittedFail_Encodable = {
    reason: str_Encodable | EncodeAsIs;
};

const iroha_data_model_events_pipeline_NotPermittedFail_order: (keyof iroha_data_model_events_pipeline_NotPermittedFail_Decoded)[] =
    ['reason'];
const iroha_data_model_events_pipeline_NotPermittedFail_decoders = {
    reason: str_decode,
};
const iroha_data_model_events_pipeline_NotPermittedFail_encoders = {
    reason: makeEncoderAsIsRespectable(str_encode),
};

export function iroha_data_model_events_pipeline_NotPermittedFail_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_NotPermittedFail_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_events_pipeline_NotPermittedFail_decoders,
        iroha_data_model_events_pipeline_NotPermittedFail_order,
    );
}

export function iroha_data_model_events_pipeline_NotPermittedFail_encode(
    encodable: iroha_data_model_events_pipeline_NotPermittedFail_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_events_pipeline_NotPermittedFail_encoders,
        iroha_data_model_events_pipeline_NotPermittedFail_order,
    );
}

// iroha_data_model_events_pipeline_RejectionReason

export type iroha_data_model_events_pipeline_RejectionReason_Decoded = Enum<{
    Block: Valuable<iroha_data_model_events_pipeline_BlockRejectionReason_Decoded>;
    Transaction: Valuable<iroha_data_model_events_pipeline_TransactionRejectionReason_Decoded>;
}>;

export type iroha_data_model_events_pipeline_RejectionReason_Encodable = Enum<{
    Block: Valuable<iroha_data_model_events_pipeline_BlockRejectionReason_Encodable | EncodeAsIs>;
    Transaction: Valuable<iroha_data_model_events_pipeline_TransactionRejectionReason_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_events_pipeline_RejectionReason enum tools

const iroha_data_model_events_pipeline_RejectionReason_decoders: EnumDecoders = {
    0: { v: 'Block', decode: iroha_data_model_events_pipeline_BlockRejectionReason_decode },
    1: { v: 'Transaction', decode: iroha_data_model_events_pipeline_TransactionRejectionReason_decode },
};
const iroha_data_model_events_pipeline_RejectionReason_encoders: EnumEncoders = {
    Block: { d: 0, encode: iroha_data_model_events_pipeline_BlockRejectionReason_encode },
    Transaction: { d: 1, encode: iroha_data_model_events_pipeline_TransactionRejectionReason_encode },
};

// iroha_data_model_events_pipeline_RejectionReason tools end

export function iroha_data_model_events_pipeline_RejectionReason_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_RejectionReason_Decoded> {
    return decodeEnum(bytes, iroha_data_model_events_pipeline_RejectionReason_decoders);
}

export function iroha_data_model_events_pipeline_RejectionReason_encode(
    encodable: iroha_data_model_events_pipeline_RejectionReason_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_events_pipeline_RejectionReason_encoders);
}

// iroha_data_model_events_pipeline_SignatureVerificationFail

export type iroha_data_model_events_pipeline_SignatureVerificationFail_Decoded = {
    signature: iroha_crypto_Signature_Decoded;
    reason: str_Decoded;
};

export type iroha_data_model_events_pipeline_SignatureVerificationFail_Encodable = {
    signature: iroha_crypto_Signature_Encodable | EncodeAsIs;
    reason: str_Encodable | EncodeAsIs;
};

const iroha_data_model_events_pipeline_SignatureVerificationFail_order: (keyof iroha_data_model_events_pipeline_SignatureVerificationFail_Decoded)[] =
    ['signature', 'reason'];
const iroha_data_model_events_pipeline_SignatureVerificationFail_decoders = {
    signature: iroha_crypto_Signature_decode,
    reason: str_decode,
};
const iroha_data_model_events_pipeline_SignatureVerificationFail_encoders = {
    signature: makeEncoderAsIsRespectable(iroha_crypto_Signature_encode),
    reason: makeEncoderAsIsRespectable(str_encode),
};

export function iroha_data_model_events_pipeline_SignatureVerificationFail_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_SignatureVerificationFail_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_events_pipeline_SignatureVerificationFail_decoders,
        iroha_data_model_events_pipeline_SignatureVerificationFail_order,
    );
}

export function iroha_data_model_events_pipeline_SignatureVerificationFail_encode(
    encodable: iroha_data_model_events_pipeline_SignatureVerificationFail_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_events_pipeline_SignatureVerificationFail_encoders,
        iroha_data_model_events_pipeline_SignatureVerificationFail_order,
    );
}

// iroha_data_model_events_pipeline_Status

export type iroha_data_model_events_pipeline_Status_Decoded = Enum<{
    Validating: null;
    Rejected: Valuable<iroha_data_model_events_pipeline_RejectionReason_Decoded>;
    Committed: null;
}>;

export type iroha_data_model_events_pipeline_Status_Encodable = Enum<{
    Validating: null;
    Rejected: Valuable<iroha_data_model_events_pipeline_RejectionReason_Encodable | EncodeAsIs>;
    Committed: null;
}>;

// iroha_data_model_events_pipeline_Status enum tools

const iroha_data_model_events_pipeline_Status_decoders: EnumDecoders = {
    0: { v: 'Validating' },
    1: { v: 'Rejected', decode: iroha_data_model_events_pipeline_RejectionReason_decode },
    2: { v: 'Committed' },
};
const iroha_data_model_events_pipeline_Status_encoders: EnumEncoders = {
    Validating: { d: 0 },
    Rejected: { d: 1, encode: iroha_data_model_events_pipeline_RejectionReason_encode },
    Committed: { d: 2 },
};

// iroha_data_model_events_pipeline_Status tools end

export function iroha_data_model_events_pipeline_Status_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_Status_Decoded> {
    return decodeEnum(bytes, iroha_data_model_events_pipeline_Status_decoders);
}

export function iroha_data_model_events_pipeline_Status_encode(
    encodable: iroha_data_model_events_pipeline_Status_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_events_pipeline_Status_encoders);
}

// iroha_data_model_events_pipeline_TransactionRejectionReason

export type iroha_data_model_events_pipeline_TransactionRejectionReason_Decoded = Enum<{
    NotPermitted: Valuable<iroha_data_model_events_pipeline_NotPermittedFail_Decoded>;
    UnsatisfiedSignatureCondition: Valuable<iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_Decoded>;
    InstructionExecution: Valuable<iroha_data_model_events_pipeline_InstructionExecutionFail_Decoded>;
    SignatureVerification: Valuable<iroha_data_model_events_pipeline_SignatureVerificationFail_Decoded>;
    UnexpectedGenesisAccountSignature: null;
}>;

export type iroha_data_model_events_pipeline_TransactionRejectionReason_Encodable = Enum<{
    NotPermitted: Valuable<iroha_data_model_events_pipeline_NotPermittedFail_Encodable | EncodeAsIs>;
    UnsatisfiedSignatureCondition: Valuable<
        iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_Encodable | EncodeAsIs
    >;
    InstructionExecution: Valuable<iroha_data_model_events_pipeline_InstructionExecutionFail_Encodable | EncodeAsIs>;
    SignatureVerification: Valuable<iroha_data_model_events_pipeline_SignatureVerificationFail_Encodable | EncodeAsIs>;
    UnexpectedGenesisAccountSignature: null;
}>;

// iroha_data_model_events_pipeline_TransactionRejectionReason enum tools

const iroha_data_model_events_pipeline_TransactionRejectionReason_decoders: EnumDecoders = {
    0: { v: 'NotPermitted', decode: iroha_data_model_events_pipeline_NotPermittedFail_decode },
    1: {
        v: 'UnsatisfiedSignatureCondition',
        decode: iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_decode,
    },
    2: { v: 'InstructionExecution', decode: iroha_data_model_events_pipeline_InstructionExecutionFail_decode },
    3: { v: 'SignatureVerification', decode: iroha_data_model_events_pipeline_SignatureVerificationFail_decode },
    4: { v: 'UnexpectedGenesisAccountSignature' },
};
const iroha_data_model_events_pipeline_TransactionRejectionReason_encoders: EnumEncoders = {
    NotPermitted: { d: 0, encode: iroha_data_model_events_pipeline_NotPermittedFail_encode },
    UnsatisfiedSignatureCondition: {
        d: 1,
        encode: iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_encode,
    },
    InstructionExecution: { d: 2, encode: iroha_data_model_events_pipeline_InstructionExecutionFail_encode },
    SignatureVerification: { d: 3, encode: iroha_data_model_events_pipeline_SignatureVerificationFail_encode },
    UnexpectedGenesisAccountSignature: { d: 4 },
};

// iroha_data_model_events_pipeline_TransactionRejectionReason tools end

export function iroha_data_model_events_pipeline_TransactionRejectionReason_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_TransactionRejectionReason_Decoded> {
    return decodeEnum(bytes, iroha_data_model_events_pipeline_TransactionRejectionReason_decoders);
}

export function iroha_data_model_events_pipeline_TransactionRejectionReason_encode(
    encodable: iroha_data_model_events_pipeline_TransactionRejectionReason_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_events_pipeline_TransactionRejectionReason_encoders);
}

// iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail

export type iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_Decoded = {
    reason: str_Decoded;
};

export type iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_Encodable = {
    reason: str_Encodable | EncodeAsIs;
};

const iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_order: (keyof iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_Decoded)[] =
    ['reason'];
const iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_decoders = {
    reason: str_decode,
};
const iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_encoders = {
    reason: makeEncoderAsIsRespectable(str_encode),
};

export function iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_decoders,
        iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_order,
    );
}

export function iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_encode(
    encodable: iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_encoders,
        iroha_data_model_events_pipeline_UnsatisfiedSignatureConditionFail_order,
    );
}

// iroha_data_model_events_SubscriptionRequest

export type iroha_data_model_events_SubscriptionRequest_Decoded = [iroha_data_model_events_EventFilter_Decoded];

export type iroha_data_model_events_SubscriptionRequest_Encodable = [
    iroha_data_model_events_EventFilter_Encodable | EncodeAsIs,
];

// iroha_data_model_events_SubscriptionRequest tuple-related tools

const iroha_data_model_events_SubscriptionRequest_decoders = [iroha_data_model_events_EventFilter_decode];
const iroha_data_model_events_SubscriptionRequest_encoders = ([iroha_data_model_events_EventFilter_encode] as any).map(
    makeEncoderAsIsRespectable,
);

// iroha_data_model_events_SubscriptionRequest tools end

export function iroha_data_model_events_SubscriptionRequest_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_SubscriptionRequest_Decoded> {
    return decodeTuple(bytes, iroha_data_model_events_SubscriptionRequest_decoders as any);
}

export function iroha_data_model_events_SubscriptionRequest_encode(
    encodable: iroha_data_model_events_SubscriptionRequest_Encodable,
): Uint8Array {
    return encodeTuple(encodable, iroha_data_model_events_SubscriptionRequest_encoders as any);
}

// iroha_data_model_events_VersionedEventSocketMessage

export type iroha_data_model_events_VersionedEventSocketMessage_Decoded = Enum<{
    V1: Valuable<iroha_data_model_events_VersionedEventSocketMessageV1_Decoded>;
}>;

export type iroha_data_model_events_VersionedEventSocketMessage_Encodable = Enum<{
    V1: Valuable<iroha_data_model_events_VersionedEventSocketMessageV1_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_events_VersionedEventSocketMessage enum tools

const iroha_data_model_events_VersionedEventSocketMessage_decoders: EnumDecoders = {
    1: { v: 'V1', decode: iroha_data_model_events_VersionedEventSocketMessageV1_decode },
};
const iroha_data_model_events_VersionedEventSocketMessage_encoders: EnumEncoders = {
    V1: { d: 1, encode: iroha_data_model_events_VersionedEventSocketMessageV1_encode },
};

// iroha_data_model_events_VersionedEventSocketMessage tools end

export function iroha_data_model_events_VersionedEventSocketMessage_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_VersionedEventSocketMessage_Decoded> {
    return decodeEnum(bytes, iroha_data_model_events_VersionedEventSocketMessage_decoders);
}

export function iroha_data_model_events_VersionedEventSocketMessage_encode(
    encodable: iroha_data_model_events_VersionedEventSocketMessage_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_events_VersionedEventSocketMessage_encoders);
}

// iroha_data_model_events_VersionedEventSocketMessageV1

export type iroha_data_model_events_VersionedEventSocketMessageV1_Decoded = [
    iroha_data_model_events_EventSocketMessage_Decoded,
];

export type iroha_data_model_events_VersionedEventSocketMessageV1_Encodable = [
    iroha_data_model_events_EventSocketMessage_Encodable | EncodeAsIs,
];

// iroha_data_model_events_VersionedEventSocketMessageV1 tuple-related tools

const iroha_data_model_events_VersionedEventSocketMessageV1_decoders = [
    iroha_data_model_events_EventSocketMessage_decode,
];
const iroha_data_model_events_VersionedEventSocketMessageV1_encoders = (
    [iroha_data_model_events_EventSocketMessage_encode] as any
).map(makeEncoderAsIsRespectable);

// iroha_data_model_events_VersionedEventSocketMessageV1 tools end

export function iroha_data_model_events_VersionedEventSocketMessageV1_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_events_VersionedEventSocketMessageV1_Decoded> {
    return decodeTuple(bytes, iroha_data_model_events_VersionedEventSocketMessageV1_decoders as any);
}

export function iroha_data_model_events_VersionedEventSocketMessageV1_encode(
    encodable: iroha_data_model_events_VersionedEventSocketMessageV1_Encodable,
): Uint8Array {
    return encodeTuple(encodable, iroha_data_model_events_VersionedEventSocketMessageV1_encoders as any);
}

// iroha_data_model_expression_Add

export type iroha_data_model_expression_Add_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
};

export type iroha_data_model_expression_Add_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Add_order: (keyof iroha_data_model_expression_Add_Decoded)[] = ['left', 'right'];
const iroha_data_model_expression_Add_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_u32_decode,
    right: iroha_data_model_expression_EvaluatesTo_u32_decode,
};
const iroha_data_model_expression_Add_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
};

export function iroha_data_model_expression_Add_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Add_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_Add_decoders, iroha_data_model_expression_Add_order);
}

export function iroha_data_model_expression_Add_encode(
    encodable: iroha_data_model_expression_Add_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_expression_Add_encoders, iroha_data_model_expression_Add_order);
}

// iroha_data_model_expression_And

export type iroha_data_model_expression_And_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_bool_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_bool_Decoded;
};

export type iroha_data_model_expression_And_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_bool_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_bool_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_And_order: (keyof iroha_data_model_expression_And_Decoded)[] = ['left', 'right'];
const iroha_data_model_expression_And_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_bool_decode,
    right: iroha_data_model_expression_EvaluatesTo_bool_decode,
};
const iroha_data_model_expression_And_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_bool_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_bool_encode),
};

export function iroha_data_model_expression_And_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_And_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_And_decoders, iroha_data_model_expression_And_order);
}

export function iroha_data_model_expression_And_encode(
    encodable: iroha_data_model_expression_And_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_expression_And_encoders, iroha_data_model_expression_And_order);
}

// iroha_data_model_expression_Contains

export type iroha_data_model_expression_Contains_Decoded = {
    collection: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Decoded;
    element: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_expression_Contains_Encodable = {
    collection: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Encodable | EncodeAsIs;
    element: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Contains_order: (keyof iroha_data_model_expression_Contains_Decoded)[] = [
    'collection',
    'element',
];
const iroha_data_model_expression_Contains_decoders = {
    collection: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_decode,
    element: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
};
const iroha_data_model_expression_Contains_encoders = {
    collection: makeEncoderAsIsRespectable(
        iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_encode,
    ),
    element: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
};

export function iroha_data_model_expression_Contains_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Contains_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_Contains_decoders,
        iroha_data_model_expression_Contains_order,
    );
}

export function iroha_data_model_expression_Contains_encode(
    encodable: iroha_data_model_expression_Contains_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_Contains_encoders,
        iroha_data_model_expression_Contains_order,
    );
}

// iroha_data_model_expression_ContainsAll

export type iroha_data_model_expression_ContainsAll_Decoded = {
    collection: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Decoded;
    elements: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_expression_ContainsAll_Encodable = {
    collection: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Encodable | EncodeAsIs;
    elements: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_ContainsAll_order: (keyof iroha_data_model_expression_ContainsAll_Decoded)[] = [
    'collection',
    'elements',
];
const iroha_data_model_expression_ContainsAll_decoders = {
    collection: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_decode,
    elements: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_decode,
};
const iroha_data_model_expression_ContainsAll_encoders = {
    collection: makeEncoderAsIsRespectable(
        iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_encode,
    ),
    elements: makeEncoderAsIsRespectable(
        iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_encode,
    ),
};

export function iroha_data_model_expression_ContainsAll_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_ContainsAll_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_ContainsAll_decoders,
        iroha_data_model_expression_ContainsAll_order,
    );
}

export function iroha_data_model_expression_ContainsAll_encode(
    encodable: iroha_data_model_expression_ContainsAll_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_ContainsAll_encoders,
        iroha_data_model_expression_ContainsAll_order,
    );
}

// iroha_data_model_expression_ContainsAny

export type iroha_data_model_expression_ContainsAny_Decoded = {
    collection: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Decoded;
    elements: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_expression_ContainsAny_Encodable = {
    collection: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Encodable | EncodeAsIs;
    elements: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_ContainsAny_order: (keyof iroha_data_model_expression_ContainsAny_Decoded)[] = [
    'collection',
    'elements',
];
const iroha_data_model_expression_ContainsAny_decoders = {
    collection: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_decode,
    elements: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_decode,
};
const iroha_data_model_expression_ContainsAny_encoders = {
    collection: makeEncoderAsIsRespectable(
        iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_encode,
    ),
    elements: makeEncoderAsIsRespectable(
        iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_encode,
    ),
};

export function iroha_data_model_expression_ContainsAny_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_ContainsAny_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_ContainsAny_decoders,
        iroha_data_model_expression_ContainsAny_order,
    );
}

export function iroha_data_model_expression_ContainsAny_encode(
    encodable: iroha_data_model_expression_ContainsAny_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_ContainsAny_encoders,
        iroha_data_model_expression_ContainsAny_order,
    );
}

// iroha_data_model_expression_ContextValue

export type iroha_data_model_expression_ContextValue_Decoded = {
    value_name: str_Decoded;
};

export type iroha_data_model_expression_ContextValue_Encodable = {
    value_name: str_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_ContextValue_order: (keyof iroha_data_model_expression_ContextValue_Decoded)[] = [
    'value_name',
];
const iroha_data_model_expression_ContextValue_decoders = {
    value_name: str_decode,
};
const iroha_data_model_expression_ContextValue_encoders = {
    value_name: makeEncoderAsIsRespectable(str_encode),
};

export function iroha_data_model_expression_ContextValue_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_ContextValue_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_ContextValue_decoders,
        iroha_data_model_expression_ContextValue_order,
    );
}

export function iroha_data_model_expression_ContextValue_encode(
    encodable: iroha_data_model_expression_ContextValue_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_ContextValue_encoders,
        iroha_data_model_expression_ContextValue_order,
    );
}

// iroha_data_model_expression_Divide

export type iroha_data_model_expression_Divide_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
};

export type iroha_data_model_expression_Divide_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Divide_order: (keyof iroha_data_model_expression_Divide_Decoded)[] = [
    'left',
    'right',
];
const iroha_data_model_expression_Divide_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_u32_decode,
    right: iroha_data_model_expression_EvaluatesTo_u32_decode,
};
const iroha_data_model_expression_Divide_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
};

export function iroha_data_model_expression_Divide_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Divide_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_Divide_decoders, iroha_data_model_expression_Divide_order);
}

export function iroha_data_model_expression_Divide_encode(
    encodable: iroha_data_model_expression_Divide_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_Divide_encoders,
        iroha_data_model_expression_Divide_order,
    );
}

// iroha_data_model_expression_Equal

export type iroha_data_model_expression_Equal_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_expression_Equal_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Equal_order: (keyof iroha_data_model_expression_Equal_Decoded)[] = ['left', 'right'];
const iroha_data_model_expression_Equal_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
    right: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
};
const iroha_data_model_expression_Equal_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
};

export function iroha_data_model_expression_Equal_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Equal_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_Equal_decoders, iroha_data_model_expression_Equal_order);
}

export function iroha_data_model_expression_Equal_encode(
    encodable: iroha_data_model_expression_Equal_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_expression_Equal_encoders, iroha_data_model_expression_Equal_order);
}

// iroha_data_model_expression_EvaluatesTo_alloc_string_String

export type iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded = {
    expression: iroha_data_model_expression_Expression_Decoded;
};

export type iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable = {
    expression: iroha_data_model_expression_Expression_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_EvaluatesTo_alloc_string_String_order: (keyof iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded)[] =
    ['expression'];
const iroha_data_model_expression_EvaluatesTo_alloc_string_String_decoders = {
    expression: iroha_data_model_expression_Expression_decode,
};
const iroha_data_model_expression_EvaluatesTo_alloc_string_String_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_Expression_encode),
};

export function iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_EvaluatesTo_alloc_string_String_decoders,
        iroha_data_model_expression_EvaluatesTo_alloc_string_String_order,
    );
}

export function iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode(
    encodable: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_EvaluatesTo_alloc_string_String_encoders,
        iroha_data_model_expression_EvaluatesTo_alloc_string_String_order,
    );
}

// iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value

export type iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Decoded = {
    expression: iroha_data_model_expression_Expression_Decoded;
};

export type iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Encodable = {
    expression: iroha_data_model_expression_Expression_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_order: (keyof iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Decoded)[] =
    ['expression'];
const iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_decoders = {
    expression: iroha_data_model_expression_Expression_decode,
};
const iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_Expression_encode),
};

export function iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_decoders,
        iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_order,
    );
}

export function iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_encode(
    encodable: iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_encoders,
        iroha_data_model_expression_EvaluatesTo_alloc_vec_Vec_iroha_data_model_Value_order,
    );
}

// iroha_data_model_expression_EvaluatesTo_bool

export type iroha_data_model_expression_EvaluatesTo_bool_Decoded = {
    expression: iroha_data_model_expression_Expression_Decoded;
};

export type iroha_data_model_expression_EvaluatesTo_bool_Encodable = {
    expression: iroha_data_model_expression_Expression_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_EvaluatesTo_bool_order: (keyof iroha_data_model_expression_EvaluatesTo_bool_Decoded)[] =
    ['expression'];
const iroha_data_model_expression_EvaluatesTo_bool_decoders = {
    expression: iroha_data_model_expression_Expression_decode,
};
const iroha_data_model_expression_EvaluatesTo_bool_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_Expression_encode),
};

export function iroha_data_model_expression_EvaluatesTo_bool_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_EvaluatesTo_bool_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_EvaluatesTo_bool_decoders,
        iroha_data_model_expression_EvaluatesTo_bool_order,
    );
}

export function iroha_data_model_expression_EvaluatesTo_bool_encode(
    encodable: iroha_data_model_expression_EvaluatesTo_bool_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_EvaluatesTo_bool_encoders,
        iroha_data_model_expression_EvaluatesTo_bool_order,
    );
}

// iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Decoded = {
    expression: iroha_data_model_expression_Expression_Decoded;
};

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Encodable = {
    expression: iroha_data_model_expression_Expression_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_order: (keyof iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Decoded)[] =
    ['expression'];
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_decoders = {
    expression: iroha_data_model_expression_Expression_decode,
};
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_Expression_encode),
};

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_decoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_order,
    );
}

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_encode(
    encodable: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_encoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_order,
    );
}

// iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Decoded = {
    expression: iroha_data_model_expression_Expression_Decoded;
};

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Encodable = {
    expression: iroha_data_model_expression_Expression_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_order: (keyof iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Decoded)[] =
    ['expression'];
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_decoders = {
    expression: iroha_data_model_expression_Expression_decode,
};
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_Expression_encode),
};

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_decoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_order,
    );
}

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_encode(
    encodable: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_encoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_order,
    );
}

// iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Decoded = {
    expression: iroha_data_model_expression_Expression_Decoded;
};

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Encodable = {
    expression: iroha_data_model_expression_Expression_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_order: (keyof iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Decoded)[] =
    ['expression'];
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_decoders = {
    expression: iroha_data_model_expression_Expression_decode,
};
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_Expression_encode),
};

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_decoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_order,
    );
}

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_encode(
    encodable: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_encoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_order,
    );
}

// iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded = {
    expression: iroha_data_model_expression_Expression_Decoded;
};

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Encodable = {
    expression: iroha_data_model_expression_Expression_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_order: (keyof iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded)[] =
    ['expression'];
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decoders = {
    expression: iroha_data_model_expression_Expression_decode,
};
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_Expression_encode),
};

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_order,
    );
}

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encode(
    encodable: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_order,
    );
}

// iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_Decoded = {
    expression: iroha_data_model_expression_Expression_Decoded;
};

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_Encodable = {
    expression: iroha_data_model_expression_Expression_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_order: (keyof iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_Decoded)[] =
    ['expression'];
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_decoders = {
    expression: iroha_data_model_expression_Expression_decode,
};
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_Expression_encode),
};

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_decoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_order,
    );
}

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_encode(
    encodable: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_encoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_order,
    );
}

// iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded = {
    expression: iroha_data_model_expression_Expression_Decoded;
};

export type iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable = {
    expression: iroha_data_model_expression_Expression_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_order: (keyof iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded)[] =
    ['expression'];
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decoders = {
    expression: iroha_data_model_expression_Expression_decode,
};
const iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_Expression_encode),
};

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_order,
    );
}

export function iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode(
    encodable: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encoders,
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_order,
    );
}

// iroha_data_model_expression_EvaluatesTo_u32

export type iroha_data_model_expression_EvaluatesTo_u32_Decoded = {
    expression: iroha_data_model_expression_Expression_Decoded;
};

export type iroha_data_model_expression_EvaluatesTo_u32_Encodable = {
    expression: iroha_data_model_expression_Expression_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_EvaluatesTo_u32_order: (keyof iroha_data_model_expression_EvaluatesTo_u32_Decoded)[] =
    ['expression'];
const iroha_data_model_expression_EvaluatesTo_u32_decoders = {
    expression: iroha_data_model_expression_Expression_decode,
};
const iroha_data_model_expression_EvaluatesTo_u32_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_Expression_encode),
};

export function iroha_data_model_expression_EvaluatesTo_u32_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_EvaluatesTo_u32_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_EvaluatesTo_u32_decoders,
        iroha_data_model_expression_EvaluatesTo_u32_order,
    );
}

export function iroha_data_model_expression_EvaluatesTo_u32_encode(
    encodable: iroha_data_model_expression_EvaluatesTo_u32_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_EvaluatesTo_u32_encoders,
        iroha_data_model_expression_EvaluatesTo_u32_order,
    );
}

// iroha_data_model_expression_Expression

export type iroha_data_model_expression_Expression_Decoded = Enum<{
    Add: Valuable<iroha_data_model_expression_Add_Decoded>;
    Subtract: Valuable<iroha_data_model_expression_Subtract_Decoded>;
    Multiply: Valuable<iroha_data_model_expression_Multiply_Decoded>;
    Divide: Valuable<iroha_data_model_expression_Divide_Decoded>;
    Mod: Valuable<iroha_data_model_expression_Mod_Decoded>;
    RaiseTo: Valuable<iroha_data_model_expression_RaiseTo_Decoded>;
    Greater: Valuable<iroha_data_model_expression_Greater_Decoded>;
    Less: Valuable<iroha_data_model_expression_Less_Decoded>;
    Equal: Valuable<iroha_data_model_expression_Equal_Decoded>;
    Not: Valuable<iroha_data_model_expression_Not_Decoded>;
    And: Valuable<iroha_data_model_expression_And_Decoded>;
    Or: Valuable<iroha_data_model_expression_Or_Decoded>;
    If: Valuable<iroha_data_model_expression_If_Decoded>;
    Raw: Valuable<iroha_data_model_Value_Decoded>;
    Query: Valuable<iroha_data_model_query_QueryBox_Decoded>;
    Contains: Valuable<iroha_data_model_expression_Contains_Decoded>;
    ContainsAll: Valuable<iroha_data_model_expression_ContainsAll_Decoded>;
    ContainsAny: Valuable<iroha_data_model_expression_ContainsAny_Decoded>;
    Where: Valuable<iroha_data_model_expression_Where_Decoded>;
    ContextValue: Valuable<iroha_data_model_expression_ContextValue_Decoded>;
}>;

export type iroha_data_model_expression_Expression_Encodable = Enum<{
    Add: Valuable<iroha_data_model_expression_Add_Encodable | EncodeAsIs>;
    Subtract: Valuable<iroha_data_model_expression_Subtract_Encodable | EncodeAsIs>;
    Multiply: Valuable<iroha_data_model_expression_Multiply_Encodable | EncodeAsIs>;
    Divide: Valuable<iroha_data_model_expression_Divide_Encodable | EncodeAsIs>;
    Mod: Valuable<iroha_data_model_expression_Mod_Encodable | EncodeAsIs>;
    RaiseTo: Valuable<iroha_data_model_expression_RaiseTo_Encodable | EncodeAsIs>;
    Greater: Valuable<iroha_data_model_expression_Greater_Encodable | EncodeAsIs>;
    Less: Valuable<iroha_data_model_expression_Less_Encodable | EncodeAsIs>;
    Equal: Valuable<iroha_data_model_expression_Equal_Encodable | EncodeAsIs>;
    Not: Valuable<iroha_data_model_expression_Not_Encodable | EncodeAsIs>;
    And: Valuable<iroha_data_model_expression_And_Encodable | EncodeAsIs>;
    Or: Valuable<iroha_data_model_expression_Or_Encodable | EncodeAsIs>;
    If: Valuable<iroha_data_model_expression_If_Encodable | EncodeAsIs>;
    Raw: Valuable<iroha_data_model_Value_Encodable | EncodeAsIs>;
    Query: Valuable<iroha_data_model_query_QueryBox_Encodable | EncodeAsIs>;
    Contains: Valuable<iroha_data_model_expression_Contains_Encodable | EncodeAsIs>;
    ContainsAll: Valuable<iroha_data_model_expression_ContainsAll_Encodable | EncodeAsIs>;
    ContainsAny: Valuable<iroha_data_model_expression_ContainsAny_Encodable | EncodeAsIs>;
    Where: Valuable<iroha_data_model_expression_Where_Encodable | EncodeAsIs>;
    ContextValue: Valuable<iroha_data_model_expression_ContextValue_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_expression_Expression enum tools

const iroha_data_model_expression_Expression_decoders: EnumDecoders = {
    0: { v: 'Add', decode: iroha_data_model_expression_Add_decode },
    1: { v: 'Subtract', decode: iroha_data_model_expression_Subtract_decode },
    2: { v: 'Multiply', decode: iroha_data_model_expression_Multiply_decode },
    3: { v: 'Divide', decode: iroha_data_model_expression_Divide_decode },
    4: { v: 'Mod', decode: iroha_data_model_expression_Mod_decode },
    5: { v: 'RaiseTo', decode: iroha_data_model_expression_RaiseTo_decode },
    6: { v: 'Greater', decode: iroha_data_model_expression_Greater_decode },
    7: { v: 'Less', decode: iroha_data_model_expression_Less_decode },
    8: { v: 'Equal', decode: iroha_data_model_expression_Equal_decode },
    9: { v: 'Not', decode: iroha_data_model_expression_Not_decode },
    10: { v: 'And', decode: iroha_data_model_expression_And_decode },
    11: { v: 'Or', decode: iroha_data_model_expression_Or_decode },
    12: { v: 'If', decode: iroha_data_model_expression_If_decode },
    13: { v: 'Raw', decode: iroha_data_model_Value_decode },
    14: { v: 'Query', decode: iroha_data_model_query_QueryBox_decode },
    15: { v: 'Contains', decode: iroha_data_model_expression_Contains_decode },
    16: { v: 'ContainsAll', decode: iroha_data_model_expression_ContainsAll_decode },
    17: { v: 'ContainsAny', decode: iroha_data_model_expression_ContainsAny_decode },
    18: { v: 'Where', decode: iroha_data_model_expression_Where_decode },
    19: { v: 'ContextValue', decode: iroha_data_model_expression_ContextValue_decode },
};
const iroha_data_model_expression_Expression_encoders: EnumEncoders = {
    Add: { d: 0, encode: iroha_data_model_expression_Add_encode },
    Subtract: { d: 1, encode: iroha_data_model_expression_Subtract_encode },
    Multiply: { d: 2, encode: iroha_data_model_expression_Multiply_encode },
    Divide: { d: 3, encode: iroha_data_model_expression_Divide_encode },
    Mod: { d: 4, encode: iroha_data_model_expression_Mod_encode },
    RaiseTo: { d: 5, encode: iroha_data_model_expression_RaiseTo_encode },
    Greater: { d: 6, encode: iroha_data_model_expression_Greater_encode },
    Less: { d: 7, encode: iroha_data_model_expression_Less_encode },
    Equal: { d: 8, encode: iroha_data_model_expression_Equal_encode },
    Not: { d: 9, encode: iroha_data_model_expression_Not_encode },
    And: { d: 10, encode: iroha_data_model_expression_And_encode },
    Or: { d: 11, encode: iroha_data_model_expression_Or_encode },
    If: { d: 12, encode: iroha_data_model_expression_If_encode },
    Raw: { d: 13, encode: iroha_data_model_Value_encode },
    Query: { d: 14, encode: iroha_data_model_query_QueryBox_encode },
    Contains: { d: 15, encode: iroha_data_model_expression_Contains_encode },
    ContainsAll: { d: 16, encode: iroha_data_model_expression_ContainsAll_encode },
    ContainsAny: { d: 17, encode: iroha_data_model_expression_ContainsAny_encode },
    Where: { d: 18, encode: iroha_data_model_expression_Where_encode },
    ContextValue: { d: 19, encode: iroha_data_model_expression_ContextValue_encode },
};

// iroha_data_model_expression_Expression tools end

export function iroha_data_model_expression_Expression_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Expression_Decoded> {
    return decodeEnum(bytes, iroha_data_model_expression_Expression_decoders);
}

export function iroha_data_model_expression_Expression_encode(
    encodable: iroha_data_model_expression_Expression_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_expression_Expression_encoders);
}

// iroha_data_model_expression_Greater

export type iroha_data_model_expression_Greater_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
};

export type iroha_data_model_expression_Greater_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Greater_order: (keyof iroha_data_model_expression_Greater_Decoded)[] = [
    'left',
    'right',
];
const iroha_data_model_expression_Greater_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_u32_decode,
    right: iroha_data_model_expression_EvaluatesTo_u32_decode,
};
const iroha_data_model_expression_Greater_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
};

export function iroha_data_model_expression_Greater_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Greater_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_Greater_decoders, iroha_data_model_expression_Greater_order);
}

export function iroha_data_model_expression_Greater_encode(
    encodable: iroha_data_model_expression_Greater_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_Greater_encoders,
        iroha_data_model_expression_Greater_order,
    );
}

// iroha_data_model_expression_If

export type iroha_data_model_expression_If_Decoded = {
    condition: iroha_data_model_expression_EvaluatesTo_bool_Decoded;
    then_expression: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
    else_expression: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_expression_If_Encodable = {
    condition: iroha_data_model_expression_EvaluatesTo_bool_Encodable | EncodeAsIs;
    then_expression: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
    else_expression: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_If_order: (keyof iroha_data_model_expression_If_Decoded)[] = [
    'condition',
    'then_expression',
    'else_expression',
];
const iroha_data_model_expression_If_decoders = {
    condition: iroha_data_model_expression_EvaluatesTo_bool_decode,
    then_expression: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
    else_expression: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
};
const iroha_data_model_expression_If_encoders = {
    condition: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_bool_encode),
    then_expression: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
    else_expression: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
};

export function iroha_data_model_expression_If_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_If_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_If_decoders, iroha_data_model_expression_If_order);
}

export function iroha_data_model_expression_If_encode(encodable: iroha_data_model_expression_If_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_expression_If_encoders, iroha_data_model_expression_If_order);
}

// iroha_data_model_expression_Less

export type iroha_data_model_expression_Less_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
};

export type iroha_data_model_expression_Less_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Less_order: (keyof iroha_data_model_expression_Less_Decoded)[] = ['left', 'right'];
const iroha_data_model_expression_Less_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_u32_decode,
    right: iroha_data_model_expression_EvaluatesTo_u32_decode,
};
const iroha_data_model_expression_Less_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
};

export function iroha_data_model_expression_Less_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Less_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_Less_decoders, iroha_data_model_expression_Less_order);
}

export function iroha_data_model_expression_Less_encode(
    encodable: iroha_data_model_expression_Less_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_expression_Less_encoders, iroha_data_model_expression_Less_order);
}

// iroha_data_model_expression_Mod

export type iroha_data_model_expression_Mod_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
};

export type iroha_data_model_expression_Mod_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Mod_order: (keyof iroha_data_model_expression_Mod_Decoded)[] = ['left', 'right'];
const iroha_data_model_expression_Mod_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_u32_decode,
    right: iroha_data_model_expression_EvaluatesTo_u32_decode,
};
const iroha_data_model_expression_Mod_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
};

export function iroha_data_model_expression_Mod_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Mod_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_Mod_decoders, iroha_data_model_expression_Mod_order);
}

export function iroha_data_model_expression_Mod_encode(
    encodable: iroha_data_model_expression_Mod_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_expression_Mod_encoders, iroha_data_model_expression_Mod_order);
}

// iroha_data_model_expression_Multiply

export type iroha_data_model_expression_Multiply_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
};

export type iroha_data_model_expression_Multiply_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Multiply_order: (keyof iroha_data_model_expression_Multiply_Decoded)[] = [
    'left',
    'right',
];
const iroha_data_model_expression_Multiply_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_u32_decode,
    right: iroha_data_model_expression_EvaluatesTo_u32_decode,
};
const iroha_data_model_expression_Multiply_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
};

export function iroha_data_model_expression_Multiply_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Multiply_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_Multiply_decoders,
        iroha_data_model_expression_Multiply_order,
    );
}

export function iroha_data_model_expression_Multiply_encode(
    encodable: iroha_data_model_expression_Multiply_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_Multiply_encoders,
        iroha_data_model_expression_Multiply_order,
    );
}

// iroha_data_model_expression_Not

export type iroha_data_model_expression_Not_Decoded = {
    expression: iroha_data_model_expression_EvaluatesTo_bool_Decoded;
};

export type iroha_data_model_expression_Not_Encodable = {
    expression: iroha_data_model_expression_EvaluatesTo_bool_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Not_order: (keyof iroha_data_model_expression_Not_Decoded)[] = ['expression'];
const iroha_data_model_expression_Not_decoders = {
    expression: iroha_data_model_expression_EvaluatesTo_bool_decode,
};
const iroha_data_model_expression_Not_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_bool_encode),
};

export function iroha_data_model_expression_Not_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Not_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_Not_decoders, iroha_data_model_expression_Not_order);
}

export function iroha_data_model_expression_Not_encode(
    encodable: iroha_data_model_expression_Not_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_expression_Not_encoders, iroha_data_model_expression_Not_order);
}

// iroha_data_model_expression_Or

export type iroha_data_model_expression_Or_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_bool_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_bool_Decoded;
};

export type iroha_data_model_expression_Or_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_bool_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_bool_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Or_order: (keyof iroha_data_model_expression_Or_Decoded)[] = ['left', 'right'];
const iroha_data_model_expression_Or_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_bool_decode,
    right: iroha_data_model_expression_EvaluatesTo_bool_decode,
};
const iroha_data_model_expression_Or_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_bool_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_bool_encode),
};

export function iroha_data_model_expression_Or_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Or_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_Or_decoders, iroha_data_model_expression_Or_order);
}

export function iroha_data_model_expression_Or_encode(encodable: iroha_data_model_expression_Or_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_expression_Or_encoders, iroha_data_model_expression_Or_order);
}

// iroha_data_model_expression_RaiseTo

export type iroha_data_model_expression_RaiseTo_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
};

export type iroha_data_model_expression_RaiseTo_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_RaiseTo_order: (keyof iroha_data_model_expression_RaiseTo_Decoded)[] = [
    'left',
    'right',
];
const iroha_data_model_expression_RaiseTo_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_u32_decode,
    right: iroha_data_model_expression_EvaluatesTo_u32_decode,
};
const iroha_data_model_expression_RaiseTo_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
};

export function iroha_data_model_expression_RaiseTo_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_RaiseTo_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_RaiseTo_decoders, iroha_data_model_expression_RaiseTo_order);
}

export function iroha_data_model_expression_RaiseTo_encode(
    encodable: iroha_data_model_expression_RaiseTo_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_RaiseTo_encoders,
        iroha_data_model_expression_RaiseTo_order,
    );
}

// iroha_data_model_expression_Subtract

export type iroha_data_model_expression_Subtract_Decoded = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
    right: iroha_data_model_expression_EvaluatesTo_u32_Decoded;
};

export type iroha_data_model_expression_Subtract_Encodable = {
    left: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
    right: iroha_data_model_expression_EvaluatesTo_u32_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Subtract_order: (keyof iroha_data_model_expression_Subtract_Decoded)[] = [
    'left',
    'right',
];
const iroha_data_model_expression_Subtract_decoders = {
    left: iroha_data_model_expression_EvaluatesTo_u32_decode,
    right: iroha_data_model_expression_EvaluatesTo_u32_decode,
};
const iroha_data_model_expression_Subtract_encoders = {
    left: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
    right: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_u32_encode),
};

export function iroha_data_model_expression_Subtract_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Subtract_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_expression_Subtract_decoders,
        iroha_data_model_expression_Subtract_order,
    );
}

export function iroha_data_model_expression_Subtract_encode(
    encodable: iroha_data_model_expression_Subtract_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_expression_Subtract_encoders,
        iroha_data_model_expression_Subtract_order,
    );
}

// iroha_data_model_expression_Where

export type iroha_data_model_expression_Where_Decoded = {
    expression: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
    values: BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_expression_Where_Encodable = {
    expression: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
    values: BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_expression_Where_order: (keyof iroha_data_model_expression_Where_Decoded)[] = [
    'expression',
    'values',
];
const iroha_data_model_expression_Where_decoders = {
    expression: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
    values: BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
};
const iroha_data_model_expression_Where_encoders = {
    expression: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
    values: makeEncoderAsIsRespectable(
        BTreeMap_String_iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode,
    ),
};

export function iroha_data_model_expression_Where_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_expression_Where_Decoded> {
    return decodeStruct(bytes, iroha_data_model_expression_Where_decoders, iroha_data_model_expression_Where_order);
}

export function iroha_data_model_expression_Where_encode(
    encodable: iroha_data_model_expression_Where_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_expression_Where_encoders, iroha_data_model_expression_Where_order);
}

import {
    FixedPoint_i64_9_Decoded,
    FixedPoint_i64_9_Encodable,
    FixedPoint_i64_9_decode,
    FixedPoint_i64_9_encode,
} from './extend';

// iroha_data_model_fixed_Fixed

export type iroha_data_model_fixed_Fixed_Decoded = [FixedPoint_i64_9_Decoded];

export type iroha_data_model_fixed_Fixed_Encodable = [FixedPoint_i64_9_Encodable | EncodeAsIs];

// iroha_data_model_fixed_Fixed tuple-related tools

const iroha_data_model_fixed_Fixed_decoders = [FixedPoint_i64_9_decode];
const iroha_data_model_fixed_Fixed_encoders = ([FixedPoint_i64_9_encode] as any).map(makeEncoderAsIsRespectable);

// iroha_data_model_fixed_Fixed tools end

export function iroha_data_model_fixed_Fixed_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_fixed_Fixed_Decoded> {
    return decodeTuple(bytes, iroha_data_model_fixed_Fixed_decoders as any);
}

export function iroha_data_model_fixed_Fixed_encode(encodable: iroha_data_model_fixed_Fixed_Encodable): Uint8Array {
    return encodeTuple(encodable, iroha_data_model_fixed_Fixed_encoders as any);
}

// iroha_data_model_IdBox

export type iroha_data_model_IdBox_Decoded = Enum<{
    AccountId: Valuable<iroha_data_model_account_Id_Decoded>;
    AssetId: Valuable<iroha_data_model_asset_Id_Decoded>;
    AssetDefinitionId: Valuable<iroha_data_model_asset_DefinitionId_Decoded>;
    DomainName: Valuable<str_Decoded>;
    PeerId: Valuable<iroha_data_model_peer_Id_Decoded>;
    WorldId: null;
}>;

export type iroha_data_model_IdBox_Encodable = Enum<{
    AccountId: Valuable<iroha_data_model_account_Id_Encodable | EncodeAsIs>;
    AssetId: Valuable<iroha_data_model_asset_Id_Encodable | EncodeAsIs>;
    AssetDefinitionId: Valuable<iroha_data_model_asset_DefinitionId_Encodable | EncodeAsIs>;
    DomainName: Valuable<str_Encodable | EncodeAsIs>;
    PeerId: Valuable<iroha_data_model_peer_Id_Encodable | EncodeAsIs>;
    WorldId: null;
}>;

// iroha_data_model_IdBox enum tools

const iroha_data_model_IdBox_decoders: EnumDecoders = {
    0: { v: 'AccountId', decode: iroha_data_model_account_Id_decode },
    1: { v: 'AssetId', decode: iroha_data_model_asset_Id_decode },
    2: { v: 'AssetDefinitionId', decode: iroha_data_model_asset_DefinitionId_decode },
    3: { v: 'DomainName', decode: str_decode },
    4: { v: 'PeerId', decode: iroha_data_model_peer_Id_decode },
    5: { v: 'WorldId' },
};
const iroha_data_model_IdBox_encoders: EnumEncoders = {
    AccountId: { d: 0, encode: iroha_data_model_account_Id_encode },
    AssetId: { d: 1, encode: iroha_data_model_asset_Id_encode },
    AssetDefinitionId: { d: 2, encode: iroha_data_model_asset_DefinitionId_encode },
    DomainName: { d: 3, encode: str_encode },
    PeerId: { d: 4, encode: iroha_data_model_peer_Id_encode },
    WorldId: { d: 5 },
};

// iroha_data_model_IdBox tools end

export function iroha_data_model_IdBox_decode(bytes: Uint8Array): DecodeResult<iroha_data_model_IdBox_Decoded> {
    return decodeEnum(bytes, iroha_data_model_IdBox_decoders);
}

export function iroha_data_model_IdBox_encode(encodable: iroha_data_model_IdBox_Encodable): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_IdBox_encoders);
}

// iroha_data_model_IdentifiableBox

export type iroha_data_model_IdentifiableBox_Decoded = Enum<{
    Account: Valuable<iroha_data_model_account_Account_Decoded>;
    NewAccount: Valuable<iroha_data_model_account_NewAccount_Decoded>;
    Asset: Valuable<iroha_data_model_asset_Asset_Decoded>;
    AssetDefinition: Valuable<iroha_data_model_asset_AssetDefinition_Decoded>;
    Domain: Valuable<iroha_data_model_domain_Domain_Decoded>;
    Peer: Valuable<iroha_data_model_peer_Peer_Decoded>;
    World: null;
}>;

export type iroha_data_model_IdentifiableBox_Encodable = Enum<{
    Account: Valuable<iroha_data_model_account_Account_Encodable | EncodeAsIs>;
    NewAccount: Valuable<iroha_data_model_account_NewAccount_Encodable | EncodeAsIs>;
    Asset: Valuable<iroha_data_model_asset_Asset_Encodable | EncodeAsIs>;
    AssetDefinition: Valuable<iroha_data_model_asset_AssetDefinition_Encodable | EncodeAsIs>;
    Domain: Valuable<iroha_data_model_domain_Domain_Encodable | EncodeAsIs>;
    Peer: Valuable<iroha_data_model_peer_Peer_Encodable | EncodeAsIs>;
    World: null;
}>;

// iroha_data_model_IdentifiableBox enum tools

const iroha_data_model_IdentifiableBox_decoders: EnumDecoders = {
    0: { v: 'Account', decode: iroha_data_model_account_Account_decode },
    1: { v: 'NewAccount', decode: iroha_data_model_account_NewAccount_decode },
    2: { v: 'Asset', decode: iroha_data_model_asset_Asset_decode },
    3: { v: 'AssetDefinition', decode: iroha_data_model_asset_AssetDefinition_decode },
    4: { v: 'Domain', decode: iroha_data_model_domain_Domain_decode },
    5: { v: 'Peer', decode: iroha_data_model_peer_Peer_decode },
    6: { v: 'World' },
};
const iroha_data_model_IdentifiableBox_encoders: EnumEncoders = {
    Account: { d: 0, encode: iroha_data_model_account_Account_encode },
    NewAccount: { d: 1, encode: iroha_data_model_account_NewAccount_encode },
    Asset: { d: 2, encode: iroha_data_model_asset_Asset_encode },
    AssetDefinition: { d: 3, encode: iroha_data_model_asset_AssetDefinition_encode },
    Domain: { d: 4, encode: iroha_data_model_domain_Domain_encode },
    Peer: { d: 5, encode: iroha_data_model_peer_Peer_encode },
    World: { d: 6 },
};

// iroha_data_model_IdentifiableBox tools end

export function iroha_data_model_IdentifiableBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_IdentifiableBox_Decoded> {
    return decodeEnum(bytes, iroha_data_model_IdentifiableBox_decoders);
}

export function iroha_data_model_IdentifiableBox_encode(
    encodable: iroha_data_model_IdentifiableBox_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_IdentifiableBox_encoders);
}

// iroha_data_model_isi_BurnBox

export type iroha_data_model_isi_BurnBox_Decoded = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded;
};

export type iroha_data_model_isi_BurnBox_Encodable = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_BurnBox_order: (keyof iroha_data_model_isi_BurnBox_Decoded)[] = ['object', 'destination_id'];
const iroha_data_model_isi_BurnBox_decoders = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decode,
};
const iroha_data_model_isi_BurnBox_encoders = {
    object: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
    destination_id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encode),
};

export function iroha_data_model_isi_BurnBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_BurnBox_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_BurnBox_decoders, iroha_data_model_isi_BurnBox_order);
}

export function iroha_data_model_isi_BurnBox_encode(encodable: iroha_data_model_isi_BurnBox_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_isi_BurnBox_encoders, iroha_data_model_isi_BurnBox_order);
}

// iroha_data_model_isi_FailBox

export type iroha_data_model_isi_FailBox_Decoded = {
    message: str_Decoded;
};

export type iroha_data_model_isi_FailBox_Encodable = {
    message: str_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_FailBox_order: (keyof iroha_data_model_isi_FailBox_Decoded)[] = ['message'];
const iroha_data_model_isi_FailBox_decoders = {
    message: str_decode,
};
const iroha_data_model_isi_FailBox_encoders = {
    message: makeEncoderAsIsRespectable(str_encode),
};

export function iroha_data_model_isi_FailBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_FailBox_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_FailBox_decoders, iroha_data_model_isi_FailBox_order);
}

export function iroha_data_model_isi_FailBox_encode(encodable: iroha_data_model_isi_FailBox_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_isi_FailBox_encoders, iroha_data_model_isi_FailBox_order);
}

// iroha_data_model_isi_GrantBox

export type iroha_data_model_isi_GrantBox_Decoded = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded;
};

export type iroha_data_model_isi_GrantBox_Encodable = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_GrantBox_order: (keyof iroha_data_model_isi_GrantBox_Decoded)[] = [
    'object',
    'destination_id',
];
const iroha_data_model_isi_GrantBox_decoders = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decode,
};
const iroha_data_model_isi_GrantBox_encoders = {
    object: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
    destination_id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encode),
};

export function iroha_data_model_isi_GrantBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_GrantBox_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_GrantBox_decoders, iroha_data_model_isi_GrantBox_order);
}

export function iroha_data_model_isi_GrantBox_encode(encodable: iroha_data_model_isi_GrantBox_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_isi_GrantBox_encoders, iroha_data_model_isi_GrantBox_order);
}

// iroha_data_model_isi_If

export type iroha_data_model_isi_If_Decoded = {
    condition: iroha_data_model_expression_EvaluatesTo_bool_Decoded;
    then: iroha_data_model_isi_Instruction_Decoded;
    otherwise: Option_iroha_data_model_isi_Instruction_Decoded;
};

export type iroha_data_model_isi_If_Encodable = {
    condition: iroha_data_model_expression_EvaluatesTo_bool_Encodable | EncodeAsIs;
    then: iroha_data_model_isi_Instruction_Encodable | EncodeAsIs;
    otherwise: Option_iroha_data_model_isi_Instruction_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_If_order: (keyof iroha_data_model_isi_If_Decoded)[] = ['condition', 'then', 'otherwise'];
const iroha_data_model_isi_If_decoders = {
    condition: iroha_data_model_expression_EvaluatesTo_bool_decode,
    then: iroha_data_model_isi_Instruction_decode,
    otherwise: Option_iroha_data_model_isi_Instruction_decode,
};
const iroha_data_model_isi_If_encoders = {
    condition: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_bool_encode),
    then: makeEncoderAsIsRespectable(iroha_data_model_isi_Instruction_encode),
    otherwise: makeEncoderAsIsRespectable(Option_iroha_data_model_isi_Instruction_encode),
};

export function iroha_data_model_isi_If_decode(bytes: Uint8Array): DecodeResult<iroha_data_model_isi_If_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_If_decoders, iroha_data_model_isi_If_order);
}

export function iroha_data_model_isi_If_encode(encodable: iroha_data_model_isi_If_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_isi_If_encoders, iroha_data_model_isi_If_order);
}

// iroha_data_model_isi_Instruction

export type iroha_data_model_isi_Instruction_Decoded = Enum<{
    Register: Valuable<iroha_data_model_isi_RegisterBox_Decoded>;
    Unregister: Valuable<iroha_data_model_isi_UnregisterBox_Decoded>;
    Mint: Valuable<iroha_data_model_isi_MintBox_Decoded>;
    Burn: Valuable<iroha_data_model_isi_BurnBox_Decoded>;
    Transfer: Valuable<iroha_data_model_isi_TransferBox_Decoded>;
    If: Valuable<iroha_data_model_isi_If_Decoded>;
    Pair: Valuable<iroha_data_model_isi_Pair_Decoded>;
    Sequence: Valuable<iroha_data_model_isi_SequenceBox_Decoded>;
    Fail: Valuable<iroha_data_model_isi_FailBox_Decoded>;
    SetKeyValue: Valuable<iroha_data_model_isi_SetKeyValueBox_Decoded>;
    RemoveKeyValue: Valuable<iroha_data_model_isi_RemoveKeyValueBox_Decoded>;
    Grant: Valuable<iroha_data_model_isi_GrantBox_Decoded>;
}>;

export type iroha_data_model_isi_Instruction_Encodable = Enum<{
    Register: Valuable<iroha_data_model_isi_RegisterBox_Encodable | EncodeAsIs>;
    Unregister: Valuable<iroha_data_model_isi_UnregisterBox_Encodable | EncodeAsIs>;
    Mint: Valuable<iroha_data_model_isi_MintBox_Encodable | EncodeAsIs>;
    Burn: Valuable<iroha_data_model_isi_BurnBox_Encodable | EncodeAsIs>;
    Transfer: Valuable<iroha_data_model_isi_TransferBox_Encodable | EncodeAsIs>;
    If: Valuable<iroha_data_model_isi_If_Encodable | EncodeAsIs>;
    Pair: Valuable<iroha_data_model_isi_Pair_Encodable | EncodeAsIs>;
    Sequence: Valuable<iroha_data_model_isi_SequenceBox_Encodable | EncodeAsIs>;
    Fail: Valuable<iroha_data_model_isi_FailBox_Encodable | EncodeAsIs>;
    SetKeyValue: Valuable<iroha_data_model_isi_SetKeyValueBox_Encodable | EncodeAsIs>;
    RemoveKeyValue: Valuable<iroha_data_model_isi_RemoveKeyValueBox_Encodable | EncodeAsIs>;
    Grant: Valuable<iroha_data_model_isi_GrantBox_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_isi_Instruction enum tools

const iroha_data_model_isi_Instruction_decoders: EnumDecoders = {
    0: { v: 'Register', decode: iroha_data_model_isi_RegisterBox_decode },
    1: { v: 'Unregister', decode: iroha_data_model_isi_UnregisterBox_decode },
    2: { v: 'Mint', decode: iroha_data_model_isi_MintBox_decode },
    3: { v: 'Burn', decode: iroha_data_model_isi_BurnBox_decode },
    4: { v: 'Transfer', decode: iroha_data_model_isi_TransferBox_decode },
    5: { v: 'If', decode: iroha_data_model_isi_If_decode },
    6: { v: 'Pair', decode: iroha_data_model_isi_Pair_decode },
    7: { v: 'Sequence', decode: iroha_data_model_isi_SequenceBox_decode },
    8: { v: 'Fail', decode: iroha_data_model_isi_FailBox_decode },
    9: { v: 'SetKeyValue', decode: iroha_data_model_isi_SetKeyValueBox_decode },
    10: { v: 'RemoveKeyValue', decode: iroha_data_model_isi_RemoveKeyValueBox_decode },
    11: { v: 'Grant', decode: iroha_data_model_isi_GrantBox_decode },
};
const iroha_data_model_isi_Instruction_encoders: EnumEncoders = {
    Register: { d: 0, encode: iroha_data_model_isi_RegisterBox_encode },
    Unregister: { d: 1, encode: iroha_data_model_isi_UnregisterBox_encode },
    Mint: { d: 2, encode: iroha_data_model_isi_MintBox_encode },
    Burn: { d: 3, encode: iroha_data_model_isi_BurnBox_encode },
    Transfer: { d: 4, encode: iroha_data_model_isi_TransferBox_encode },
    If: { d: 5, encode: iroha_data_model_isi_If_encode },
    Pair: { d: 6, encode: iroha_data_model_isi_Pair_encode },
    Sequence: { d: 7, encode: iroha_data_model_isi_SequenceBox_encode },
    Fail: { d: 8, encode: iroha_data_model_isi_FailBox_encode },
    SetKeyValue: { d: 9, encode: iroha_data_model_isi_SetKeyValueBox_encode },
    RemoveKeyValue: { d: 10, encode: iroha_data_model_isi_RemoveKeyValueBox_encode },
    Grant: { d: 11, encode: iroha_data_model_isi_GrantBox_encode },
};

// iroha_data_model_isi_Instruction tools end

export function iroha_data_model_isi_Instruction_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_Instruction_Decoded> {
    return decodeEnum(bytes, iroha_data_model_isi_Instruction_decoders);
}

export function iroha_data_model_isi_Instruction_encode(
    encodable: iroha_data_model_isi_Instruction_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_isi_Instruction_encoders);
}

// iroha_data_model_isi_MintBox

export type iroha_data_model_isi_MintBox_Decoded = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded;
};

export type iroha_data_model_isi_MintBox_Encodable = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_MintBox_order: (keyof iroha_data_model_isi_MintBox_Decoded)[] = ['object', 'destination_id'];
const iroha_data_model_isi_MintBox_decoders = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decode,
};
const iroha_data_model_isi_MintBox_encoders = {
    object: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
    destination_id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encode),
};

export function iroha_data_model_isi_MintBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_MintBox_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_MintBox_decoders, iroha_data_model_isi_MintBox_order);
}

export function iroha_data_model_isi_MintBox_encode(encodable: iroha_data_model_isi_MintBox_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_isi_MintBox_encoders, iroha_data_model_isi_MintBox_order);
}

// iroha_data_model_isi_Pair

export type iroha_data_model_isi_Pair_Decoded = {
    left_instruction: iroha_data_model_isi_Instruction_Decoded;
    right_instruction: iroha_data_model_isi_Instruction_Decoded;
};

export type iroha_data_model_isi_Pair_Encodable = {
    left_instruction: iroha_data_model_isi_Instruction_Encodable | EncodeAsIs;
    right_instruction: iroha_data_model_isi_Instruction_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_Pair_order: (keyof iroha_data_model_isi_Pair_Decoded)[] = [
    'left_instruction',
    'right_instruction',
];
const iroha_data_model_isi_Pair_decoders = {
    left_instruction: iroha_data_model_isi_Instruction_decode,
    right_instruction: iroha_data_model_isi_Instruction_decode,
};
const iroha_data_model_isi_Pair_encoders = {
    left_instruction: makeEncoderAsIsRespectable(iroha_data_model_isi_Instruction_encode),
    right_instruction: makeEncoderAsIsRespectable(iroha_data_model_isi_Instruction_encode),
};

export function iroha_data_model_isi_Pair_decode(bytes: Uint8Array): DecodeResult<iroha_data_model_isi_Pair_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_Pair_decoders, iroha_data_model_isi_Pair_order);
}

export function iroha_data_model_isi_Pair_encode(encodable: iroha_data_model_isi_Pair_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_isi_Pair_encoders, iroha_data_model_isi_Pair_order);
}

// iroha_data_model_isi_RegisterBox

export type iroha_data_model_isi_RegisterBox_Decoded = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_Decoded;
};

export type iroha_data_model_isi_RegisterBox_Encodable = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_RegisterBox_order: (keyof iroha_data_model_isi_RegisterBox_Decoded)[] = ['object'];
const iroha_data_model_isi_RegisterBox_decoders = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_decode,
};
const iroha_data_model_isi_RegisterBox_encoders = {
    object: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdentifiableBox_encode),
};

export function iroha_data_model_isi_RegisterBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_RegisterBox_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_RegisterBox_decoders, iroha_data_model_isi_RegisterBox_order);
}

export function iroha_data_model_isi_RegisterBox_encode(
    encodable: iroha_data_model_isi_RegisterBox_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_isi_RegisterBox_encoders, iroha_data_model_isi_RegisterBox_order);
}

// iroha_data_model_isi_RemoveKeyValueBox

export type iroha_data_model_isi_RemoveKeyValueBox_Decoded = {
    object_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded;
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
};

export type iroha_data_model_isi_RemoveKeyValueBox_Encodable = {
    object_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Encodable | EncodeAsIs;
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_RemoveKeyValueBox_order: (keyof iroha_data_model_isi_RemoveKeyValueBox_Decoded)[] = [
    'object_id',
    'key',
];
const iroha_data_model_isi_RemoveKeyValueBox_decoders = {
    object_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decode,
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
};
const iroha_data_model_isi_RemoveKeyValueBox_encoders = {
    object_id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encode),
    key: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
};

export function iroha_data_model_isi_RemoveKeyValueBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_RemoveKeyValueBox_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_isi_RemoveKeyValueBox_decoders,
        iroha_data_model_isi_RemoveKeyValueBox_order,
    );
}

export function iroha_data_model_isi_RemoveKeyValueBox_encode(
    encodable: iroha_data_model_isi_RemoveKeyValueBox_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_isi_RemoveKeyValueBox_encoders,
        iroha_data_model_isi_RemoveKeyValueBox_order,
    );
}

// iroha_data_model_isi_SequenceBox

export type iroha_data_model_isi_SequenceBox_Decoded = {
    instructions: Vec_iroha_data_model_isi_Instruction_Decoded;
};

export type iroha_data_model_isi_SequenceBox_Encodable = {
    instructions: Vec_iroha_data_model_isi_Instruction_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_SequenceBox_order: (keyof iroha_data_model_isi_SequenceBox_Decoded)[] = ['instructions'];
const iroha_data_model_isi_SequenceBox_decoders = {
    instructions: Vec_iroha_data_model_isi_Instruction_decode,
};
const iroha_data_model_isi_SequenceBox_encoders = {
    instructions: makeEncoderAsIsRespectable(Vec_iroha_data_model_isi_Instruction_encode),
};

export function iroha_data_model_isi_SequenceBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_SequenceBox_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_SequenceBox_decoders, iroha_data_model_isi_SequenceBox_order);
}

export function iroha_data_model_isi_SequenceBox_encode(
    encodable: iroha_data_model_isi_SequenceBox_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_isi_SequenceBox_encoders, iroha_data_model_isi_SequenceBox_order);
}

// iroha_data_model_isi_SetBox

export type iroha_data_model_isi_SetBox_Decoded = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_isi_SetBox_Encodable = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_SetBox_order: (keyof iroha_data_model_isi_SetBox_Decoded)[] = ['object'];
const iroha_data_model_isi_SetBox_decoders = {
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
};
const iroha_data_model_isi_SetBox_encoders = {
    object: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
};

export function iroha_data_model_isi_SetBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_SetBox_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_SetBox_decoders, iroha_data_model_isi_SetBox_order);
}

export function iroha_data_model_isi_SetBox_encode(encodable: iroha_data_model_isi_SetBox_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_isi_SetBox_encoders, iroha_data_model_isi_SetBox_order);
}

// iroha_data_model_isi_SetKeyValueBox

export type iroha_data_model_isi_SetKeyValueBox_Decoded = {
    object_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded;
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
    value: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_isi_SetKeyValueBox_Encodable = {
    object_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Encodable | EncodeAsIs;
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
    value: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_SetKeyValueBox_order: (keyof iroha_data_model_isi_SetKeyValueBox_Decoded)[] = [
    'object_id',
    'key',
    'value',
];
const iroha_data_model_isi_SetKeyValueBox_decoders = {
    object_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decode,
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
    value: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
};
const iroha_data_model_isi_SetKeyValueBox_encoders = {
    object_id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encode),
    key: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
    value: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
};

export function iroha_data_model_isi_SetKeyValueBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_SetKeyValueBox_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_SetKeyValueBox_decoders, iroha_data_model_isi_SetKeyValueBox_order);
}

export function iroha_data_model_isi_SetKeyValueBox_encode(
    encodable: iroha_data_model_isi_SetKeyValueBox_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_isi_SetKeyValueBox_encoders,
        iroha_data_model_isi_SetKeyValueBox_order,
    );
}

// iroha_data_model_isi_TransferBox

export type iroha_data_model_isi_TransferBox_Decoded = {
    source_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded;
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Decoded;
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded;
};

export type iroha_data_model_isi_TransferBox_Encodable = {
    source_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Encodable | EncodeAsIs;
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_Encodable | EncodeAsIs;
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_TransferBox_order: (keyof iroha_data_model_isi_TransferBox_Decoded)[] = [
    'source_id',
    'object',
    'destination_id',
];
const iroha_data_model_isi_TransferBox_decoders = {
    source_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decode,
    object: iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_decode,
    destination_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decode,
};
const iroha_data_model_isi_TransferBox_encoders = {
    source_id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encode),
    object: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_Value_encode),
    destination_id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encode),
};

export function iroha_data_model_isi_TransferBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_TransferBox_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_TransferBox_decoders, iroha_data_model_isi_TransferBox_order);
}

export function iroha_data_model_isi_TransferBox_encode(
    encodable: iroha_data_model_isi_TransferBox_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_isi_TransferBox_encoders, iroha_data_model_isi_TransferBox_order);
}

// iroha_data_model_isi_UnregisterBox

export type iroha_data_model_isi_UnregisterBox_Decoded = {
    object_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Decoded;
};

export type iroha_data_model_isi_UnregisterBox_Encodable = {
    object_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_Encodable | EncodeAsIs;
};

const iroha_data_model_isi_UnregisterBox_order: (keyof iroha_data_model_isi_UnregisterBox_Decoded)[] = ['object_id'];
const iroha_data_model_isi_UnregisterBox_decoders = {
    object_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_decode,
};
const iroha_data_model_isi_UnregisterBox_encoders = {
    object_id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_IdBox_encode),
};

export function iroha_data_model_isi_UnregisterBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_isi_UnregisterBox_Decoded> {
    return decodeStruct(bytes, iroha_data_model_isi_UnregisterBox_decoders, iroha_data_model_isi_UnregisterBox_order);
}

export function iroha_data_model_isi_UnregisterBox_encode(
    encodable: iroha_data_model_isi_UnregisterBox_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_isi_UnregisterBox_encoders,
        iroha_data_model_isi_UnregisterBox_order,
    );
}

// iroha_data_model_metadata_Metadata

export type iroha_data_model_metadata_Metadata_Decoded = {
    map: BTreeMap_String_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_metadata_Metadata_Encodable = {
    map: BTreeMap_String_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_metadata_Metadata_order: (keyof iroha_data_model_metadata_Metadata_Decoded)[] = ['map'];
const iroha_data_model_metadata_Metadata_decoders = {
    map: BTreeMap_String_iroha_data_model_Value_decode,
};
const iroha_data_model_metadata_Metadata_encoders = {
    map: makeEncoderAsIsRespectable(BTreeMap_String_iroha_data_model_Value_encode),
};

export function iroha_data_model_metadata_Metadata_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_metadata_Metadata_Decoded> {
    return decodeStruct(bytes, iroha_data_model_metadata_Metadata_decoders, iroha_data_model_metadata_Metadata_order);
}

export function iroha_data_model_metadata_Metadata_encode(
    encodable: iroha_data_model_metadata_Metadata_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_metadata_Metadata_encoders,
        iroha_data_model_metadata_Metadata_order,
    );
}

// iroha_data_model_Parameter

export type iroha_data_model_Parameter_Decoded = Enum<{
    MaximumFaultyPeersAmount: Valuable<u32_Decoded>;
    BlockTime: Valuable<u128_Decoded>;
    CommitTime: Valuable<u128_Decoded>;
    TransactionReceiptTime: Valuable<u128_Decoded>;
}>;

export type iroha_data_model_Parameter_Encodable = Enum<{
    MaximumFaultyPeersAmount: Valuable<u32_Encodable | EncodeAsIs>;
    BlockTime: Valuable<u128_Encodable | EncodeAsIs>;
    CommitTime: Valuable<u128_Encodable | EncodeAsIs>;
    TransactionReceiptTime: Valuable<u128_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_Parameter enum tools

const iroha_data_model_Parameter_decoders: EnumDecoders = {
    0: { v: 'MaximumFaultyPeersAmount', decode: u32_decode },
    1: { v: 'BlockTime', decode: u128_decode },
    2: { v: 'CommitTime', decode: u128_decode },
    3: { v: 'TransactionReceiptTime', decode: u128_decode },
};
const iroha_data_model_Parameter_encoders: EnumEncoders = {
    MaximumFaultyPeersAmount: { d: 0, encode: u32_encode },
    BlockTime: { d: 1, encode: u128_encode },
    CommitTime: { d: 2, encode: u128_encode },
    TransactionReceiptTime: { d: 3, encode: u128_encode },
};

// iroha_data_model_Parameter tools end

export function iroha_data_model_Parameter_decode(bytes: Uint8Array): DecodeResult<iroha_data_model_Parameter_Decoded> {
    return decodeEnum(bytes, iroha_data_model_Parameter_decoders);
}

export function iroha_data_model_Parameter_encode(encodable: iroha_data_model_Parameter_Encodable): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_Parameter_encoders);
}

// iroha_data_model_peer_Id

export type iroha_data_model_peer_Id_Decoded = {
    address: str_Decoded;
    public_key: iroha_crypto_PublicKey_Decoded;
};

export type iroha_data_model_peer_Id_Encodable = {
    address: str_Encodable | EncodeAsIs;
    public_key: iroha_crypto_PublicKey_Encodable | EncodeAsIs;
};

const iroha_data_model_peer_Id_order: (keyof iroha_data_model_peer_Id_Decoded)[] = ['address', 'public_key'];
const iroha_data_model_peer_Id_decoders = {
    address: str_decode,
    public_key: iroha_crypto_PublicKey_decode,
};
const iroha_data_model_peer_Id_encoders = {
    address: makeEncoderAsIsRespectable(str_encode),
    public_key: makeEncoderAsIsRespectable(iroha_crypto_PublicKey_encode),
};

export function iroha_data_model_peer_Id_decode(bytes: Uint8Array): DecodeResult<iroha_data_model_peer_Id_Decoded> {
    return decodeStruct(bytes, iroha_data_model_peer_Id_decoders, iroha_data_model_peer_Id_order);
}

export function iroha_data_model_peer_Id_encode(encodable: iroha_data_model_peer_Id_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_peer_Id_encoders, iroha_data_model_peer_Id_order);
}

// iroha_data_model_peer_Peer

export type iroha_data_model_peer_Peer_Decoded = {
    id: iroha_data_model_peer_Id_Decoded;
};

export type iroha_data_model_peer_Peer_Encodable = {
    id: iroha_data_model_peer_Id_Encodable | EncodeAsIs;
};

const iroha_data_model_peer_Peer_order: (keyof iroha_data_model_peer_Peer_Decoded)[] = ['id'];
const iroha_data_model_peer_Peer_decoders = {
    id: iroha_data_model_peer_Id_decode,
};
const iroha_data_model_peer_Peer_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_peer_Id_encode),
};

export function iroha_data_model_peer_Peer_decode(bytes: Uint8Array): DecodeResult<iroha_data_model_peer_Peer_Decoded> {
    return decodeStruct(bytes, iroha_data_model_peer_Peer_decoders, iroha_data_model_peer_Peer_order);
}

export function iroha_data_model_peer_Peer_encode(encodable: iroha_data_model_peer_Peer_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_peer_Peer_encoders, iroha_data_model_peer_Peer_order);
}

// iroha_data_model_permissions_PermissionToken

export type iroha_data_model_permissions_PermissionToken_Decoded = {
    name: str_Decoded;
    params: BTreeMap_String_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_permissions_PermissionToken_Encodable = {
    name: str_Encodable | EncodeAsIs;
    params: BTreeMap_String_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_permissions_PermissionToken_order: (keyof iroha_data_model_permissions_PermissionToken_Decoded)[] =
    ['name', 'params'];
const iroha_data_model_permissions_PermissionToken_decoders = {
    name: str_decode,
    params: BTreeMap_String_iroha_data_model_Value_decode,
};
const iroha_data_model_permissions_PermissionToken_encoders = {
    name: makeEncoderAsIsRespectable(str_encode),
    params: makeEncoderAsIsRespectable(BTreeMap_String_iroha_data_model_Value_encode),
};

export function iroha_data_model_permissions_PermissionToken_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_permissions_PermissionToken_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_permissions_PermissionToken_decoders,
        iroha_data_model_permissions_PermissionToken_order,
    );
}

export function iroha_data_model_permissions_PermissionToken_encode(
    encodable: iroha_data_model_permissions_PermissionToken_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_permissions_PermissionToken_encoders,
        iroha_data_model_permissions_PermissionToken_order,
    );
}

// iroha_data_model_query_account_FindAccountById

export type iroha_data_model_query_account_FindAccountById_Decoded = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Decoded;
};

export type iroha_data_model_query_account_FindAccountById_Encodable = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Encodable | EncodeAsIs;
};

const iroha_data_model_query_account_FindAccountById_order: (keyof iroha_data_model_query_account_FindAccountById_Decoded)[] =
    ['id'];
const iroha_data_model_query_account_FindAccountById_decoders = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_decode,
};
const iroha_data_model_query_account_FindAccountById_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_encode),
};

export function iroha_data_model_query_account_FindAccountById_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_account_FindAccountById_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_account_FindAccountById_decoders,
        iroha_data_model_query_account_FindAccountById_order,
    );
}

export function iroha_data_model_query_account_FindAccountById_encode(
    encodable: iroha_data_model_query_account_FindAccountById_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_account_FindAccountById_encoders,
        iroha_data_model_query_account_FindAccountById_order,
    );
}

// iroha_data_model_query_account_FindAccountKeyValueByIdAndKey

export type iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_Decoded = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Decoded;
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
};

export type iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_Encodable = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Encodable | EncodeAsIs;
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
};

const iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_order: (keyof iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_Decoded)[] =
    ['id', 'key'];
const iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_decoders = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_decode,
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
};
const iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_encode),
    key: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
};

export function iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_decoders,
        iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_order,
    );
}

export function iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_encode(
    encodable: iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_encoders,
        iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_order,
    );
}

// iroha_data_model_query_account_FindAccountsByDomainName

export type iroha_data_model_query_account_FindAccountsByDomainName_Decoded = {
    domain_name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
};

export type iroha_data_model_query_account_FindAccountsByDomainName_Encodable = {
    domain_name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
};

const iroha_data_model_query_account_FindAccountsByDomainName_order: (keyof iroha_data_model_query_account_FindAccountsByDomainName_Decoded)[] =
    ['domain_name'];
const iroha_data_model_query_account_FindAccountsByDomainName_decoders = {
    domain_name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
};
const iroha_data_model_query_account_FindAccountsByDomainName_encoders = {
    domain_name: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
};

export function iroha_data_model_query_account_FindAccountsByDomainName_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_account_FindAccountsByDomainName_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_account_FindAccountsByDomainName_decoders,
        iroha_data_model_query_account_FindAccountsByDomainName_order,
    );
}

export function iroha_data_model_query_account_FindAccountsByDomainName_encode(
    encodable: iroha_data_model_query_account_FindAccountsByDomainName_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_account_FindAccountsByDomainName_encoders,
        iroha_data_model_query_account_FindAccountsByDomainName_order,
    );
}

// iroha_data_model_query_account_FindAccountsByName

export type iroha_data_model_query_account_FindAccountsByName_Decoded = {
    name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
};

export type iroha_data_model_query_account_FindAccountsByName_Encodable = {
    name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
};

const iroha_data_model_query_account_FindAccountsByName_order: (keyof iroha_data_model_query_account_FindAccountsByName_Decoded)[] =
    ['name'];
const iroha_data_model_query_account_FindAccountsByName_decoders = {
    name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
};
const iroha_data_model_query_account_FindAccountsByName_encoders = {
    name: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
};

export function iroha_data_model_query_account_FindAccountsByName_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_account_FindAccountsByName_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_account_FindAccountsByName_decoders,
        iroha_data_model_query_account_FindAccountsByName_order,
    );
}

export function iroha_data_model_query_account_FindAccountsByName_encode(
    encodable: iroha_data_model_query_account_FindAccountsByName_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_account_FindAccountsByName_encoders,
        iroha_data_model_query_account_FindAccountsByName_order,
    );
}

// iroha_data_model_query_account_FindAllAccounts

// iroha_data_model_query_account_FindAllAccounts is just a void alias

import {
    Void_Decoded as iroha_data_model_query_account_FindAllAccounts_Decoded,
    Void_Encodable as iroha_data_model_query_account_FindAllAccounts_Encodable,
    Void_decode as iroha_data_model_query_account_FindAllAccounts_decode,
    Void_encode as iroha_data_model_query_account_FindAllAccounts_encode,
} from '@scale-codec/definition-runtime';

export {
    iroha_data_model_query_account_FindAllAccounts_Decoded,
    iroha_data_model_query_account_FindAllAccounts_Encodable,
    iroha_data_model_query_account_FindAllAccounts_decode,
    iroha_data_model_query_account_FindAllAccounts_encode,
};

// iroha_data_model_query_asset_FindAllAssets

// iroha_data_model_query_asset_FindAllAssets is just a void alias

import {
    Void_Decoded as iroha_data_model_query_asset_FindAllAssets_Decoded,
    Void_Encodable as iroha_data_model_query_asset_FindAllAssets_Encodable,
    Void_decode as iroha_data_model_query_asset_FindAllAssets_decode,
    Void_encode as iroha_data_model_query_asset_FindAllAssets_encode,
} from '@scale-codec/definition-runtime';

export {
    iroha_data_model_query_asset_FindAllAssets_Decoded,
    iroha_data_model_query_asset_FindAllAssets_Encodable,
    iroha_data_model_query_asset_FindAllAssets_decode,
    iroha_data_model_query_asset_FindAllAssets_encode,
};

// iroha_data_model_query_asset_FindAllAssetsDefinitions

// iroha_data_model_query_asset_FindAllAssetsDefinitions is just a void alias

import {
    Void_Decoded as iroha_data_model_query_asset_FindAllAssetsDefinitions_Decoded,
    Void_Encodable as iroha_data_model_query_asset_FindAllAssetsDefinitions_Encodable,
    Void_decode as iroha_data_model_query_asset_FindAllAssetsDefinitions_decode,
    Void_encode as iroha_data_model_query_asset_FindAllAssetsDefinitions_encode,
} from '@scale-codec/definition-runtime';

export {
    iroha_data_model_query_asset_FindAllAssetsDefinitions_Decoded,
    iroha_data_model_query_asset_FindAllAssetsDefinitions_Encodable,
    iroha_data_model_query_asset_FindAllAssetsDefinitions_decode,
    iroha_data_model_query_asset_FindAllAssetsDefinitions_encode,
};

// iroha_data_model_query_asset_FindAssetById

export type iroha_data_model_query_asset_FindAssetById_Decoded = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Decoded;
};

export type iroha_data_model_query_asset_FindAssetById_Encodable = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Encodable | EncodeAsIs;
};

const iroha_data_model_query_asset_FindAssetById_order: (keyof iroha_data_model_query_asset_FindAssetById_Decoded)[] = [
    'id',
];
const iroha_data_model_query_asset_FindAssetById_decoders = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_decode,
};
const iroha_data_model_query_asset_FindAssetById_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_encode),
};

export function iroha_data_model_query_asset_FindAssetById_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_asset_FindAssetById_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_asset_FindAssetById_decoders,
        iroha_data_model_query_asset_FindAssetById_order,
    );
}

export function iroha_data_model_query_asset_FindAssetById_encode(
    encodable: iroha_data_model_query_asset_FindAssetById_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_asset_FindAssetById_encoders,
        iroha_data_model_query_asset_FindAssetById_order,
    );
}

// iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey

export type iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_Decoded = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Decoded;
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
};

export type iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_Encodable = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Encodable | EncodeAsIs;
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
};

const iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_order: (keyof iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_Decoded)[] =
    ['id', 'key'];
const iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_decoders = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_decode,
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
};
const iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_encode),
    key: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
};

export function iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_decoders,
        iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_order,
    );
}

export function iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_encode(
    encodable: iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_encoders,
        iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_order,
    );
}

// iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey

export type iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_Decoded = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Decoded;
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
};

export type iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_Encodable = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Encodable | EncodeAsIs;
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
};

const iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_order: (keyof iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_Decoded)[] =
    ['id', 'key'];
const iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_decoders = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_decode,
    key: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
};
const iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_encode),
    key: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
};

export function iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_decoders,
        iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_order,
    );
}

export function iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_encode(
    encodable: iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_encoders,
        iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_order,
    );
}

// iroha_data_model_query_asset_FindAssetQuantityById

export type iroha_data_model_query_asset_FindAssetQuantityById_Decoded = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Decoded;
};

export type iroha_data_model_query_asset_FindAssetQuantityById_Encodable = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_Encodable | EncodeAsIs;
};

const iroha_data_model_query_asset_FindAssetQuantityById_order: (keyof iroha_data_model_query_asset_FindAssetQuantityById_Decoded)[] =
    ['id'];
const iroha_data_model_query_asset_FindAssetQuantityById_decoders = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_decode,
};
const iroha_data_model_query_asset_FindAssetQuantityById_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_Id_encode),
};

export function iroha_data_model_query_asset_FindAssetQuantityById_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_asset_FindAssetQuantityById_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_asset_FindAssetQuantityById_decoders,
        iroha_data_model_query_asset_FindAssetQuantityById_order,
    );
}

export function iroha_data_model_query_asset_FindAssetQuantityById_encode(
    encodable: iroha_data_model_query_asset_FindAssetQuantityById_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_asset_FindAssetQuantityById_encoders,
        iroha_data_model_query_asset_FindAssetQuantityById_order,
    );
}

// iroha_data_model_query_asset_FindAssetsByAccountId

export type iroha_data_model_query_asset_FindAssetsByAccountId_Decoded = {
    account_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Decoded;
};

export type iroha_data_model_query_asset_FindAssetsByAccountId_Encodable = {
    account_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Encodable | EncodeAsIs;
};

const iroha_data_model_query_asset_FindAssetsByAccountId_order: (keyof iroha_data_model_query_asset_FindAssetsByAccountId_Decoded)[] =
    ['account_id'];
const iroha_data_model_query_asset_FindAssetsByAccountId_decoders = {
    account_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_decode,
};
const iroha_data_model_query_asset_FindAssetsByAccountId_encoders = {
    account_id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_encode),
};

export function iroha_data_model_query_asset_FindAssetsByAccountId_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_asset_FindAssetsByAccountId_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_asset_FindAssetsByAccountId_decoders,
        iroha_data_model_query_asset_FindAssetsByAccountId_order,
    );
}

export function iroha_data_model_query_asset_FindAssetsByAccountId_encode(
    encodable: iroha_data_model_query_asset_FindAssetsByAccountId_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_asset_FindAssetsByAccountId_encoders,
        iroha_data_model_query_asset_FindAssetsByAccountId_order,
    );
}

// iroha_data_model_query_asset_FindAssetsByAssetDefinitionId

export type iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_Decoded = {
    asset_definition_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Decoded;
};

export type iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_Encodable = {
    asset_definition_id:
        | iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Encodable
        | EncodeAsIs;
};

const iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_order: (keyof iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_Decoded)[] =
    ['asset_definition_id'];
const iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_decoders = {
    asset_definition_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_decode,
};
const iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_encoders = {
    asset_definition_id: makeEncoderAsIsRespectable(
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_encode,
    ),
};

export function iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_decoders,
        iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_order,
    );
}

export function iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_encode(
    encodable: iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_encoders,
        iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_order,
    );
}

// iroha_data_model_query_asset_FindAssetsByDomainName

export type iroha_data_model_query_asset_FindAssetsByDomainName_Decoded = {
    domain_name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
};

export type iroha_data_model_query_asset_FindAssetsByDomainName_Encodable = {
    domain_name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
};

const iroha_data_model_query_asset_FindAssetsByDomainName_order: (keyof iroha_data_model_query_asset_FindAssetsByDomainName_Decoded)[] =
    ['domain_name'];
const iroha_data_model_query_asset_FindAssetsByDomainName_decoders = {
    domain_name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
};
const iroha_data_model_query_asset_FindAssetsByDomainName_encoders = {
    domain_name: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
};

export function iroha_data_model_query_asset_FindAssetsByDomainName_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_asset_FindAssetsByDomainName_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_asset_FindAssetsByDomainName_decoders,
        iroha_data_model_query_asset_FindAssetsByDomainName_order,
    );
}

export function iroha_data_model_query_asset_FindAssetsByDomainName_encode(
    encodable: iroha_data_model_query_asset_FindAssetsByDomainName_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_asset_FindAssetsByDomainName_encoders,
        iroha_data_model_query_asset_FindAssetsByDomainName_order,
    );
}

// iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId

export type iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_Decoded = {
    domain_name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
    asset_definition_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Decoded;
};

export type iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_Encodable = {
    domain_name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
    asset_definition_id:
        | iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_Encodable
        | EncodeAsIs;
};

const iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_order: (keyof iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_Decoded)[] =
    ['domain_name', 'asset_definition_id'];
const iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_decoders = {
    domain_name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
    asset_definition_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_decode,
};
const iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_encoders = {
    domain_name: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
    asset_definition_id: makeEncoderAsIsRespectable(
        iroha_data_model_expression_EvaluatesTo_iroha_data_model_asset_DefinitionId_encode,
    ),
};

export function iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_decoders,
        iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_order,
    );
}

export function iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_encode(
    encodable: iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_encoders,
        iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_order,
    );
}

// iroha_data_model_query_asset_FindAssetsByName

export type iroha_data_model_query_asset_FindAssetsByName_Decoded = {
    name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
};

export type iroha_data_model_query_asset_FindAssetsByName_Encodable = {
    name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
};

const iroha_data_model_query_asset_FindAssetsByName_order: (keyof iroha_data_model_query_asset_FindAssetsByName_Decoded)[] =
    ['name'];
const iroha_data_model_query_asset_FindAssetsByName_decoders = {
    name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
};
const iroha_data_model_query_asset_FindAssetsByName_encoders = {
    name: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
};

export function iroha_data_model_query_asset_FindAssetsByName_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_asset_FindAssetsByName_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_asset_FindAssetsByName_decoders,
        iroha_data_model_query_asset_FindAssetsByName_order,
    );
}

export function iroha_data_model_query_asset_FindAssetsByName_encode(
    encodable: iroha_data_model_query_asset_FindAssetsByName_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_asset_FindAssetsByName_encoders,
        iroha_data_model_query_asset_FindAssetsByName_order,
    );
}

// iroha_data_model_query_domain_FindAllDomains

// iroha_data_model_query_domain_FindAllDomains is just a void alias

import {
    Void_Decoded as iroha_data_model_query_domain_FindAllDomains_Decoded,
    Void_Encodable as iroha_data_model_query_domain_FindAllDomains_Encodable,
    Void_decode as iroha_data_model_query_domain_FindAllDomains_decode,
    Void_encode as iroha_data_model_query_domain_FindAllDomains_encode,
} from '@scale-codec/definition-runtime';

export {
    iroha_data_model_query_domain_FindAllDomains_Decoded,
    iroha_data_model_query_domain_FindAllDomains_Encodable,
    iroha_data_model_query_domain_FindAllDomains_decode,
    iroha_data_model_query_domain_FindAllDomains_encode,
};

// iroha_data_model_query_domain_FindDomainByName

export type iroha_data_model_query_domain_FindDomainByName_Decoded = {
    name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Decoded;
};

export type iroha_data_model_query_domain_FindDomainByName_Encodable = {
    name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_Encodable | EncodeAsIs;
};

const iroha_data_model_query_domain_FindDomainByName_order: (keyof iroha_data_model_query_domain_FindDomainByName_Decoded)[] =
    ['name'];
const iroha_data_model_query_domain_FindDomainByName_decoders = {
    name: iroha_data_model_expression_EvaluatesTo_alloc_string_String_decode,
};
const iroha_data_model_query_domain_FindDomainByName_encoders = {
    name: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_alloc_string_String_encode),
};

export function iroha_data_model_query_domain_FindDomainByName_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_domain_FindDomainByName_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_domain_FindDomainByName_decoders,
        iroha_data_model_query_domain_FindDomainByName_order,
    );
}

export function iroha_data_model_query_domain_FindDomainByName_encode(
    encodable: iroha_data_model_query_domain_FindDomainByName_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_domain_FindDomainByName_encoders,
        iroha_data_model_query_domain_FindDomainByName_order,
    );
}

// iroha_data_model_query_Payload

export type iroha_data_model_query_Payload_Decoded = {
    timestamp_ms: Compact_Decoded;
    query: iroha_data_model_query_QueryBox_Decoded;
    account_id: iroha_data_model_account_Id_Decoded;
};

export type iroha_data_model_query_Payload_Encodable = {
    timestamp_ms: Compact_Encodable | EncodeAsIs;
    query: iroha_data_model_query_QueryBox_Encodable | EncodeAsIs;
    account_id: iroha_data_model_account_Id_Encodable | EncodeAsIs;
};

const iroha_data_model_query_Payload_order: (keyof iroha_data_model_query_Payload_Decoded)[] = [
    'timestamp_ms',
    'query',
    'account_id',
];
const iroha_data_model_query_Payload_decoders = {
    timestamp_ms: Compact_decode,
    query: iroha_data_model_query_QueryBox_decode,
    account_id: iroha_data_model_account_Id_decode,
};
const iroha_data_model_query_Payload_encoders = {
    timestamp_ms: makeEncoderAsIsRespectable(Compact_encode),
    query: makeEncoderAsIsRespectable(iroha_data_model_query_QueryBox_encode),
    account_id: makeEncoderAsIsRespectable(iroha_data_model_account_Id_encode),
};

export function iroha_data_model_query_Payload_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_Payload_Decoded> {
    return decodeStruct(bytes, iroha_data_model_query_Payload_decoders, iroha_data_model_query_Payload_order);
}

export function iroha_data_model_query_Payload_encode(encodable: iroha_data_model_query_Payload_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_data_model_query_Payload_encoders, iroha_data_model_query_Payload_order);
}

// iroha_data_model_query_peer_FindAllPeers

// iroha_data_model_query_peer_FindAllPeers is just a void alias

import {
    Void_Decoded as iroha_data_model_query_peer_FindAllPeers_Decoded,
    Void_Encodable as iroha_data_model_query_peer_FindAllPeers_Encodable,
    Void_decode as iroha_data_model_query_peer_FindAllPeers_decode,
    Void_encode as iroha_data_model_query_peer_FindAllPeers_encode,
} from '@scale-codec/definition-runtime';

export {
    iroha_data_model_query_peer_FindAllPeers_Decoded,
    iroha_data_model_query_peer_FindAllPeers_Encodable,
    iroha_data_model_query_peer_FindAllPeers_decode,
    iroha_data_model_query_peer_FindAllPeers_encode,
};

// iroha_data_model_query_permissions_FindPermissionTokensByAccountId

export type iroha_data_model_query_permissions_FindPermissionTokensByAccountId_Decoded = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Decoded;
};

export type iroha_data_model_query_permissions_FindPermissionTokensByAccountId_Encodable = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Encodable | EncodeAsIs;
};

const iroha_data_model_query_permissions_FindPermissionTokensByAccountId_order: (keyof iroha_data_model_query_permissions_FindPermissionTokensByAccountId_Decoded)[] =
    ['id'];
const iroha_data_model_query_permissions_FindPermissionTokensByAccountId_decoders = {
    id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_decode,
};
const iroha_data_model_query_permissions_FindPermissionTokensByAccountId_encoders = {
    id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_encode),
};

export function iroha_data_model_query_permissions_FindPermissionTokensByAccountId_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_permissions_FindPermissionTokensByAccountId_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_permissions_FindPermissionTokensByAccountId_decoders,
        iroha_data_model_query_permissions_FindPermissionTokensByAccountId_order,
    );
}

export function iroha_data_model_query_permissions_FindPermissionTokensByAccountId_encode(
    encodable: iroha_data_model_query_permissions_FindPermissionTokensByAccountId_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_permissions_FindPermissionTokensByAccountId_encoders,
        iroha_data_model_query_permissions_FindPermissionTokensByAccountId_order,
    );
}

// iroha_data_model_query_QueryBox

export type iroha_data_model_query_QueryBox_Decoded = Enum<{
    FindAllAccounts: Valuable<iroha_data_model_query_account_FindAllAccounts_Decoded>;
    FindAccountById: Valuable<iroha_data_model_query_account_FindAccountById_Decoded>;
    FindAccountKeyValueByIdAndKey: Valuable<iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_Decoded>;
    FindAccountsByName: Valuable<iroha_data_model_query_account_FindAccountsByName_Decoded>;
    FindAccountsByDomainName: Valuable<iroha_data_model_query_account_FindAccountsByDomainName_Decoded>;
    FindAllAssets: Valuable<iroha_data_model_query_asset_FindAllAssets_Decoded>;
    FindAllAssetsDefinitions: Valuable<iroha_data_model_query_asset_FindAllAssetsDefinitions_Decoded>;
    FindAssetById: Valuable<iroha_data_model_query_asset_FindAssetById_Decoded>;
    FindAssetsByName: Valuable<iroha_data_model_query_asset_FindAssetsByName_Decoded>;
    FindAssetsByAccountId: Valuable<iroha_data_model_query_asset_FindAssetsByAccountId_Decoded>;
    FindAssetsByAssetDefinitionId: Valuable<iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_Decoded>;
    FindAssetsByDomainName: Valuable<iroha_data_model_query_asset_FindAssetsByDomainName_Decoded>;
    FindAssetsByDomainNameAndAssetDefinitionId: Valuable<iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_Decoded>;
    FindAssetQuantityById: Valuable<iroha_data_model_query_asset_FindAssetQuantityById_Decoded>;
    FindAssetKeyValueByIdAndKey: Valuable<iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_Decoded>;
    FindAssetDefinitionKeyValueByIdAndKey: Valuable<iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_Decoded>;
    FindAllDomains: Valuable<iroha_data_model_query_domain_FindAllDomains_Decoded>;
    FindDomainByName: Valuable<iroha_data_model_query_domain_FindDomainByName_Decoded>;
    FindAllPeers: Valuable<iroha_data_model_query_peer_FindAllPeers_Decoded>;
    FindTransactionsByAccountId: Valuable<iroha_data_model_query_transaction_FindTransactionsByAccountId_Decoded>;
    FindPermissionTokensByAccountId: Valuable<iroha_data_model_query_permissions_FindPermissionTokensByAccountId_Decoded>;
}>;

export type iroha_data_model_query_QueryBox_Encodable = Enum<{
    FindAllAccounts: Valuable<iroha_data_model_query_account_FindAllAccounts_Encodable | EncodeAsIs>;
    FindAccountById: Valuable<iroha_data_model_query_account_FindAccountById_Encodable | EncodeAsIs>;
    FindAccountKeyValueByIdAndKey: Valuable<
        iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_Encodable | EncodeAsIs
    >;
    FindAccountsByName: Valuable<iroha_data_model_query_account_FindAccountsByName_Encodable | EncodeAsIs>;
    FindAccountsByDomainName: Valuable<iroha_data_model_query_account_FindAccountsByDomainName_Encodable | EncodeAsIs>;
    FindAllAssets: Valuable<iroha_data_model_query_asset_FindAllAssets_Encodable | EncodeAsIs>;
    FindAllAssetsDefinitions: Valuable<iroha_data_model_query_asset_FindAllAssetsDefinitions_Encodable | EncodeAsIs>;
    FindAssetById: Valuable<iroha_data_model_query_asset_FindAssetById_Encodable | EncodeAsIs>;
    FindAssetsByName: Valuable<iroha_data_model_query_asset_FindAssetsByName_Encodable | EncodeAsIs>;
    FindAssetsByAccountId: Valuable<iroha_data_model_query_asset_FindAssetsByAccountId_Encodable | EncodeAsIs>;
    FindAssetsByAssetDefinitionId: Valuable<
        iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_Encodable | EncodeAsIs
    >;
    FindAssetsByDomainName: Valuable<iroha_data_model_query_asset_FindAssetsByDomainName_Encodable | EncodeAsIs>;
    FindAssetsByDomainNameAndAssetDefinitionId: Valuable<
        iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_Encodable | EncodeAsIs
    >;
    FindAssetQuantityById: Valuable<iroha_data_model_query_asset_FindAssetQuantityById_Encodable | EncodeAsIs>;
    FindAssetKeyValueByIdAndKey: Valuable<
        iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_Encodable | EncodeAsIs
    >;
    FindAssetDefinitionKeyValueByIdAndKey: Valuable<
        iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_Encodable | EncodeAsIs
    >;
    FindAllDomains: Valuable<iroha_data_model_query_domain_FindAllDomains_Encodable | EncodeAsIs>;
    FindDomainByName: Valuable<iroha_data_model_query_domain_FindDomainByName_Encodable | EncodeAsIs>;
    FindAllPeers: Valuable<iroha_data_model_query_peer_FindAllPeers_Encodable | EncodeAsIs>;
    FindTransactionsByAccountId: Valuable<
        iroha_data_model_query_transaction_FindTransactionsByAccountId_Encodable | EncodeAsIs
    >;
    FindPermissionTokensByAccountId: Valuable<
        iroha_data_model_query_permissions_FindPermissionTokensByAccountId_Encodable | EncodeAsIs
    >;
}>;

// iroha_data_model_query_QueryBox enum tools

const iroha_data_model_query_QueryBox_decoders: EnumDecoders = {
    0: { v: 'FindAllAccounts', decode: iroha_data_model_query_account_FindAllAccounts_decode },
    1: { v: 'FindAccountById', decode: iroha_data_model_query_account_FindAccountById_decode },
    2: {
        v: 'FindAccountKeyValueByIdAndKey',
        decode: iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_decode,
    },
    3: { v: 'FindAccountsByName', decode: iroha_data_model_query_account_FindAccountsByName_decode },
    4: { v: 'FindAccountsByDomainName', decode: iroha_data_model_query_account_FindAccountsByDomainName_decode },
    5: { v: 'FindAllAssets', decode: iroha_data_model_query_asset_FindAllAssets_decode },
    6: { v: 'FindAllAssetsDefinitions', decode: iroha_data_model_query_asset_FindAllAssetsDefinitions_decode },
    7: { v: 'FindAssetById', decode: iroha_data_model_query_asset_FindAssetById_decode },
    8: { v: 'FindAssetsByName', decode: iroha_data_model_query_asset_FindAssetsByName_decode },
    9: { v: 'FindAssetsByAccountId', decode: iroha_data_model_query_asset_FindAssetsByAccountId_decode },
    10: {
        v: 'FindAssetsByAssetDefinitionId',
        decode: iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_decode,
    },
    11: { v: 'FindAssetsByDomainName', decode: iroha_data_model_query_asset_FindAssetsByDomainName_decode },
    12: {
        v: 'FindAssetsByDomainNameAndAssetDefinitionId',
        decode: iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_decode,
    },
    13: { v: 'FindAssetQuantityById', decode: iroha_data_model_query_asset_FindAssetQuantityById_decode },
    14: { v: 'FindAssetKeyValueByIdAndKey', decode: iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_decode },
    15: {
        v: 'FindAssetDefinitionKeyValueByIdAndKey',
        decode: iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_decode,
    },
    16: { v: 'FindAllDomains', decode: iroha_data_model_query_domain_FindAllDomains_decode },
    17: { v: 'FindDomainByName', decode: iroha_data_model_query_domain_FindDomainByName_decode },
    18: { v: 'FindAllPeers', decode: iroha_data_model_query_peer_FindAllPeers_decode },
    19: {
        v: 'FindTransactionsByAccountId',
        decode: iroha_data_model_query_transaction_FindTransactionsByAccountId_decode,
    },
    20: {
        v: 'FindPermissionTokensByAccountId',
        decode: iroha_data_model_query_permissions_FindPermissionTokensByAccountId_decode,
    },
};
const iroha_data_model_query_QueryBox_encoders: EnumEncoders = {
    FindAllAccounts: { d: 0, encode: iroha_data_model_query_account_FindAllAccounts_encode },
    FindAccountById: { d: 1, encode: iroha_data_model_query_account_FindAccountById_encode },
    FindAccountKeyValueByIdAndKey: {
        d: 2,
        encode: iroha_data_model_query_account_FindAccountKeyValueByIdAndKey_encode,
    },
    FindAccountsByName: { d: 3, encode: iroha_data_model_query_account_FindAccountsByName_encode },
    FindAccountsByDomainName: { d: 4, encode: iroha_data_model_query_account_FindAccountsByDomainName_encode },
    FindAllAssets: { d: 5, encode: iroha_data_model_query_asset_FindAllAssets_encode },
    FindAllAssetsDefinitions: { d: 6, encode: iroha_data_model_query_asset_FindAllAssetsDefinitions_encode },
    FindAssetById: { d: 7, encode: iroha_data_model_query_asset_FindAssetById_encode },
    FindAssetsByName: { d: 8, encode: iroha_data_model_query_asset_FindAssetsByName_encode },
    FindAssetsByAccountId: { d: 9, encode: iroha_data_model_query_asset_FindAssetsByAccountId_encode },
    FindAssetsByAssetDefinitionId: { d: 10, encode: iroha_data_model_query_asset_FindAssetsByAssetDefinitionId_encode },
    FindAssetsByDomainName: { d: 11, encode: iroha_data_model_query_asset_FindAssetsByDomainName_encode },
    FindAssetsByDomainNameAndAssetDefinitionId: {
        d: 12,
        encode: iroha_data_model_query_asset_FindAssetsByDomainNameAndAssetDefinitionId_encode,
    },
    FindAssetQuantityById: { d: 13, encode: iroha_data_model_query_asset_FindAssetQuantityById_encode },
    FindAssetKeyValueByIdAndKey: { d: 14, encode: iroha_data_model_query_asset_FindAssetKeyValueByIdAndKey_encode },
    FindAssetDefinitionKeyValueByIdAndKey: {
        d: 15,
        encode: iroha_data_model_query_asset_FindAssetDefinitionKeyValueByIdAndKey_encode,
    },
    FindAllDomains: { d: 16, encode: iroha_data_model_query_domain_FindAllDomains_encode },
    FindDomainByName: { d: 17, encode: iroha_data_model_query_domain_FindDomainByName_encode },
    FindAllPeers: { d: 18, encode: iroha_data_model_query_peer_FindAllPeers_encode },
    FindTransactionsByAccountId: {
        d: 19,
        encode: iroha_data_model_query_transaction_FindTransactionsByAccountId_encode,
    },
    FindPermissionTokensByAccountId: {
        d: 20,
        encode: iroha_data_model_query_permissions_FindPermissionTokensByAccountId_encode,
    },
};

// iroha_data_model_query_QueryBox tools end

export function iroha_data_model_query_QueryBox_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_QueryBox_Decoded> {
    return decodeEnum(bytes, iroha_data_model_query_QueryBox_decoders);
}

export function iroha_data_model_query_QueryBox_encode(
    encodable: iroha_data_model_query_QueryBox_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_query_QueryBox_encoders);
}

// iroha_data_model_query_QueryResult

export type iroha_data_model_query_QueryResult_Decoded = [iroha_data_model_Value_Decoded];

export type iroha_data_model_query_QueryResult_Encodable = [iroha_data_model_Value_Encodable | EncodeAsIs];

// iroha_data_model_query_QueryResult tuple-related tools

const iroha_data_model_query_QueryResult_decoders = [iroha_data_model_Value_decode];
const iroha_data_model_query_QueryResult_encoders = ([iroha_data_model_Value_encode] as any).map(
    makeEncoderAsIsRespectable,
);

// iroha_data_model_query_QueryResult tools end

export function iroha_data_model_query_QueryResult_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_QueryResult_Decoded> {
    return decodeTuple(bytes, iroha_data_model_query_QueryResult_decoders as any);
}

export function iroha_data_model_query_QueryResult_encode(
    encodable: iroha_data_model_query_QueryResult_Encodable,
): Uint8Array {
    return encodeTuple(encodable, iroha_data_model_query_QueryResult_encoders as any);
}

// iroha_data_model_query_SignedQueryRequest

export type iroha_data_model_query_SignedQueryRequest_Decoded = {
    payload: iroha_data_model_query_Payload_Decoded;
    signature: iroha_crypto_Signature_Decoded;
};

export type iroha_data_model_query_SignedQueryRequest_Encodable = {
    payload: iroha_data_model_query_Payload_Encodable | EncodeAsIs;
    signature: iroha_crypto_Signature_Encodable | EncodeAsIs;
};

const iroha_data_model_query_SignedQueryRequest_order: (keyof iroha_data_model_query_SignedQueryRequest_Decoded)[] = [
    'payload',
    'signature',
];
const iroha_data_model_query_SignedQueryRequest_decoders = {
    payload: iroha_data_model_query_Payload_decode,
    signature: iroha_crypto_Signature_decode,
};
const iroha_data_model_query_SignedQueryRequest_encoders = {
    payload: makeEncoderAsIsRespectable(iroha_data_model_query_Payload_encode),
    signature: makeEncoderAsIsRespectable(iroha_crypto_Signature_encode),
};

export function iroha_data_model_query_SignedQueryRequest_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_SignedQueryRequest_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_SignedQueryRequest_decoders,
        iroha_data_model_query_SignedQueryRequest_order,
    );
}

export function iroha_data_model_query_SignedQueryRequest_encode(
    encodable: iroha_data_model_query_SignedQueryRequest_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_SignedQueryRequest_encoders,
        iroha_data_model_query_SignedQueryRequest_order,
    );
}

// iroha_data_model_query_transaction_FindTransactionsByAccountId

export type iroha_data_model_query_transaction_FindTransactionsByAccountId_Decoded = {
    account_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Decoded;
};

export type iroha_data_model_query_transaction_FindTransactionsByAccountId_Encodable = {
    account_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_Encodable | EncodeAsIs;
};

const iroha_data_model_query_transaction_FindTransactionsByAccountId_order: (keyof iroha_data_model_query_transaction_FindTransactionsByAccountId_Decoded)[] =
    ['account_id'];
const iroha_data_model_query_transaction_FindTransactionsByAccountId_decoders = {
    account_id: iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_decode,
};
const iroha_data_model_query_transaction_FindTransactionsByAccountId_encoders = {
    account_id: makeEncoderAsIsRespectable(iroha_data_model_expression_EvaluatesTo_iroha_data_model_account_Id_encode),
};

export function iroha_data_model_query_transaction_FindTransactionsByAccountId_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_transaction_FindTransactionsByAccountId_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_query_transaction_FindTransactionsByAccountId_decoders,
        iroha_data_model_query_transaction_FindTransactionsByAccountId_order,
    );
}

export function iroha_data_model_query_transaction_FindTransactionsByAccountId_encode(
    encodable: iroha_data_model_query_transaction_FindTransactionsByAccountId_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_query_transaction_FindTransactionsByAccountId_encoders,
        iroha_data_model_query_transaction_FindTransactionsByAccountId_order,
    );
}

// iroha_data_model_query_VersionedQueryResult

export type iroha_data_model_query_VersionedQueryResult_Decoded = Enum<{
    V1: Valuable<iroha_data_model_query_VersionedQueryResultV1_Decoded>;
}>;

export type iroha_data_model_query_VersionedQueryResult_Encodable = Enum<{
    V1: Valuable<iroha_data_model_query_VersionedQueryResultV1_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_query_VersionedQueryResult enum tools

const iroha_data_model_query_VersionedQueryResult_decoders: EnumDecoders = {
    1: { v: 'V1', decode: iroha_data_model_query_VersionedQueryResultV1_decode },
};
const iroha_data_model_query_VersionedQueryResult_encoders: EnumEncoders = {
    V1: { d: 1, encode: iroha_data_model_query_VersionedQueryResultV1_encode },
};

// iroha_data_model_query_VersionedQueryResult tools end

export function iroha_data_model_query_VersionedQueryResult_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_VersionedQueryResult_Decoded> {
    return decodeEnum(bytes, iroha_data_model_query_VersionedQueryResult_decoders);
}

export function iroha_data_model_query_VersionedQueryResult_encode(
    encodable: iroha_data_model_query_VersionedQueryResult_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_query_VersionedQueryResult_encoders);
}

// iroha_data_model_query_VersionedQueryResultV1

export type iroha_data_model_query_VersionedQueryResultV1_Decoded = [iroha_data_model_query_QueryResult_Decoded];

export type iroha_data_model_query_VersionedQueryResultV1_Encodable = [
    iroha_data_model_query_QueryResult_Encodable | EncodeAsIs,
];

// iroha_data_model_query_VersionedQueryResultV1 tuple-related tools

const iroha_data_model_query_VersionedQueryResultV1_decoders = [iroha_data_model_query_QueryResult_decode];
const iroha_data_model_query_VersionedQueryResultV1_encoders = ([iroha_data_model_query_QueryResult_encode] as any).map(
    makeEncoderAsIsRespectable,
);

// iroha_data_model_query_VersionedQueryResultV1 tools end

export function iroha_data_model_query_VersionedQueryResultV1_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_VersionedQueryResultV1_Decoded> {
    return decodeTuple(bytes, iroha_data_model_query_VersionedQueryResultV1_decoders as any);
}

export function iroha_data_model_query_VersionedQueryResultV1_encode(
    encodable: iroha_data_model_query_VersionedQueryResultV1_Encodable,
): Uint8Array {
    return encodeTuple(encodable, iroha_data_model_query_VersionedQueryResultV1_encoders as any);
}

// iroha_data_model_query_VersionedSignedQueryRequest

export type iroha_data_model_query_VersionedSignedQueryRequest_Decoded = Enum<{
    V1: Valuable<iroha_data_model_query_VersionedSignedQueryRequestV1_Decoded>;
}>;

export type iroha_data_model_query_VersionedSignedQueryRequest_Encodable = Enum<{
    V1: Valuable<iroha_data_model_query_VersionedSignedQueryRequestV1_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_query_VersionedSignedQueryRequest enum tools

const iroha_data_model_query_VersionedSignedQueryRequest_decoders: EnumDecoders = {
    1: { v: 'V1', decode: iroha_data_model_query_VersionedSignedQueryRequestV1_decode },
};
const iroha_data_model_query_VersionedSignedQueryRequest_encoders: EnumEncoders = {
    V1: { d: 1, encode: iroha_data_model_query_VersionedSignedQueryRequestV1_encode },
};

// iroha_data_model_query_VersionedSignedQueryRequest tools end

export function iroha_data_model_query_VersionedSignedQueryRequest_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_VersionedSignedQueryRequest_Decoded> {
    return decodeEnum(bytes, iroha_data_model_query_VersionedSignedQueryRequest_decoders);
}

export function iroha_data_model_query_VersionedSignedQueryRequest_encode(
    encodable: iroha_data_model_query_VersionedSignedQueryRequest_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_query_VersionedSignedQueryRequest_encoders);
}

// iroha_data_model_query_VersionedSignedQueryRequestV1

export type iroha_data_model_query_VersionedSignedQueryRequestV1_Decoded = [
    iroha_data_model_query_SignedQueryRequest_Decoded,
];

export type iroha_data_model_query_VersionedSignedQueryRequestV1_Encodable = [
    iroha_data_model_query_SignedQueryRequest_Encodable | EncodeAsIs,
];

// iroha_data_model_query_VersionedSignedQueryRequestV1 tuple-related tools

const iroha_data_model_query_VersionedSignedQueryRequestV1_decoders = [
    iroha_data_model_query_SignedQueryRequest_decode,
];
const iroha_data_model_query_VersionedSignedQueryRequestV1_encoders = (
    [iroha_data_model_query_SignedQueryRequest_encode] as any
).map(makeEncoderAsIsRespectable);

// iroha_data_model_query_VersionedSignedQueryRequestV1 tools end

export function iroha_data_model_query_VersionedSignedQueryRequestV1_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_query_VersionedSignedQueryRequestV1_Decoded> {
    return decodeTuple(bytes, iroha_data_model_query_VersionedSignedQueryRequestV1_decoders as any);
}

export function iroha_data_model_query_VersionedSignedQueryRequestV1_encode(
    encodable: iroha_data_model_query_VersionedSignedQueryRequestV1_Encodable,
): Uint8Array {
    return encodeTuple(encodable, iroha_data_model_query_VersionedSignedQueryRequestV1_encoders as any);
}

// iroha_data_model_transaction_Payload

export type iroha_data_model_transaction_Payload_Decoded = {
    account_id: iroha_data_model_account_Id_Decoded;
    instructions: Vec_iroha_data_model_isi_Instruction_Decoded;
    creation_time: u64_Decoded;
    time_to_live_ms: u64_Decoded;
    metadata: BTreeMap_String_iroha_data_model_Value_Decoded;
};

export type iroha_data_model_transaction_Payload_Encodable = {
    account_id: iroha_data_model_account_Id_Encodable | EncodeAsIs;
    instructions: Vec_iroha_data_model_isi_Instruction_Encodable | EncodeAsIs;
    creation_time: u64_Encodable | EncodeAsIs;
    time_to_live_ms: u64_Encodable | EncodeAsIs;
    metadata: BTreeMap_String_iroha_data_model_Value_Encodable | EncodeAsIs;
};

const iroha_data_model_transaction_Payload_order: (keyof iroha_data_model_transaction_Payload_Decoded)[] = [
    'account_id',
    'instructions',
    'creation_time',
    'time_to_live_ms',
    'metadata',
];
const iroha_data_model_transaction_Payload_decoders = {
    account_id: iroha_data_model_account_Id_decode,
    instructions: Vec_iroha_data_model_isi_Instruction_decode,
    creation_time: u64_decode,
    time_to_live_ms: u64_decode,
    metadata: BTreeMap_String_iroha_data_model_Value_decode,
};
const iroha_data_model_transaction_Payload_encoders = {
    account_id: makeEncoderAsIsRespectable(iroha_data_model_account_Id_encode),
    instructions: makeEncoderAsIsRespectable(Vec_iroha_data_model_isi_Instruction_encode),
    creation_time: makeEncoderAsIsRespectable(u64_encode),
    time_to_live_ms: makeEncoderAsIsRespectable(u64_encode),
    metadata: makeEncoderAsIsRespectable(BTreeMap_String_iroha_data_model_Value_encode),
};

export function iroha_data_model_transaction_Payload_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_transaction_Payload_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_transaction_Payload_decoders,
        iroha_data_model_transaction_Payload_order,
    );
}

export function iroha_data_model_transaction_Payload_encode(
    encodable: iroha_data_model_transaction_Payload_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_transaction_Payload_encoders,
        iroha_data_model_transaction_Payload_order,
    );
}

// iroha_data_model_transaction_RejectedTransaction

export type iroha_data_model_transaction_RejectedTransaction_Decoded = {
    payload: iroha_data_model_transaction_Payload_Decoded;
    signatures: BTreeSet_iroha_crypto_Signature_Decoded;
    rejection_reason: iroha_data_model_events_pipeline_TransactionRejectionReason_Decoded;
};

export type iroha_data_model_transaction_RejectedTransaction_Encodable = {
    payload: iroha_data_model_transaction_Payload_Encodable | EncodeAsIs;
    signatures: BTreeSet_iroha_crypto_Signature_Encodable | EncodeAsIs;
    rejection_reason: iroha_data_model_events_pipeline_TransactionRejectionReason_Encodable | EncodeAsIs;
};

const iroha_data_model_transaction_RejectedTransaction_order: (keyof iroha_data_model_transaction_RejectedTransaction_Decoded)[] =
    ['payload', 'signatures', 'rejection_reason'];
const iroha_data_model_transaction_RejectedTransaction_decoders = {
    payload: iroha_data_model_transaction_Payload_decode,
    signatures: BTreeSet_iroha_crypto_Signature_decode,
    rejection_reason: iroha_data_model_events_pipeline_TransactionRejectionReason_decode,
};
const iroha_data_model_transaction_RejectedTransaction_encoders = {
    payload: makeEncoderAsIsRespectable(iroha_data_model_transaction_Payload_encode),
    signatures: makeEncoderAsIsRespectable(BTreeSet_iroha_crypto_Signature_encode),
    rejection_reason: makeEncoderAsIsRespectable(iroha_data_model_events_pipeline_TransactionRejectionReason_encode),
};

export function iroha_data_model_transaction_RejectedTransaction_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_transaction_RejectedTransaction_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_transaction_RejectedTransaction_decoders,
        iroha_data_model_transaction_RejectedTransaction_order,
    );
}

export function iroha_data_model_transaction_RejectedTransaction_encode(
    encodable: iroha_data_model_transaction_RejectedTransaction_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_transaction_RejectedTransaction_encoders,
        iroha_data_model_transaction_RejectedTransaction_order,
    );
}

// iroha_data_model_transaction_Transaction

export type iroha_data_model_transaction_Transaction_Decoded = {
    payload: iroha_data_model_transaction_Payload_Decoded;
    signatures: BTreeSet_iroha_crypto_Signature_Decoded;
};

export type iroha_data_model_transaction_Transaction_Encodable = {
    payload: iroha_data_model_transaction_Payload_Encodable | EncodeAsIs;
    signatures: BTreeSet_iroha_crypto_Signature_Encodable | EncodeAsIs;
};

const iroha_data_model_transaction_Transaction_order: (keyof iroha_data_model_transaction_Transaction_Decoded)[] = [
    'payload',
    'signatures',
];
const iroha_data_model_transaction_Transaction_decoders = {
    payload: iroha_data_model_transaction_Payload_decode,
    signatures: BTreeSet_iroha_crypto_Signature_decode,
};
const iroha_data_model_transaction_Transaction_encoders = {
    payload: makeEncoderAsIsRespectable(iroha_data_model_transaction_Payload_encode),
    signatures: makeEncoderAsIsRespectable(BTreeSet_iroha_crypto_Signature_encode),
};

export function iroha_data_model_transaction_Transaction_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_transaction_Transaction_Decoded> {
    return decodeStruct(
        bytes,
        iroha_data_model_transaction_Transaction_decoders,
        iroha_data_model_transaction_Transaction_order,
    );
}

export function iroha_data_model_transaction_Transaction_encode(
    encodable: iroha_data_model_transaction_Transaction_Encodable,
): Uint8Array {
    return encodeStruct(
        encodable,
        iroha_data_model_transaction_Transaction_encoders,
        iroha_data_model_transaction_Transaction_order,
    );
}

// iroha_data_model_transaction_TransactionValue

export type iroha_data_model_transaction_TransactionValue_Decoded = Enum<{
    Transaction: Valuable<iroha_data_model_transaction_VersionedTransaction_Decoded>;
    RejectedTransaction: Valuable<iroha_data_model_transaction_VersionedRejectedTransaction_Decoded>;
}>;

export type iroha_data_model_transaction_TransactionValue_Encodable = Enum<{
    Transaction: Valuable<iroha_data_model_transaction_VersionedTransaction_Encodable | EncodeAsIs>;
    RejectedTransaction: Valuable<iroha_data_model_transaction_VersionedRejectedTransaction_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_transaction_TransactionValue enum tools

const iroha_data_model_transaction_TransactionValue_decoders: EnumDecoders = {
    0: { v: 'Transaction', decode: iroha_data_model_transaction_VersionedTransaction_decode },
    1: { v: 'RejectedTransaction', decode: iroha_data_model_transaction_VersionedRejectedTransaction_decode },
};
const iroha_data_model_transaction_TransactionValue_encoders: EnumEncoders = {
    Transaction: { d: 0, encode: iroha_data_model_transaction_VersionedTransaction_encode },
    RejectedTransaction: { d: 1, encode: iroha_data_model_transaction_VersionedRejectedTransaction_encode },
};

// iroha_data_model_transaction_TransactionValue tools end

export function iroha_data_model_transaction_TransactionValue_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_transaction_TransactionValue_Decoded> {
    return decodeEnum(bytes, iroha_data_model_transaction_TransactionValue_decoders);
}

export function iroha_data_model_transaction_TransactionValue_encode(
    encodable: iroha_data_model_transaction_TransactionValue_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_transaction_TransactionValue_encoders);
}

// iroha_data_model_transaction_VersionedRejectedTransaction

export type iroha_data_model_transaction_VersionedRejectedTransaction_Decoded = Enum<{
    V1: Valuable<iroha_data_model_transaction_VersionedRejectedTransactionV1_Decoded>;
}>;

export type iroha_data_model_transaction_VersionedRejectedTransaction_Encodable = Enum<{
    V1: Valuable<iroha_data_model_transaction_VersionedRejectedTransactionV1_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_transaction_VersionedRejectedTransaction enum tools

const iroha_data_model_transaction_VersionedRejectedTransaction_decoders: EnumDecoders = {
    1: { v: 'V1', decode: iroha_data_model_transaction_VersionedRejectedTransactionV1_decode },
};
const iroha_data_model_transaction_VersionedRejectedTransaction_encoders: EnumEncoders = {
    V1: { d: 1, encode: iroha_data_model_transaction_VersionedRejectedTransactionV1_encode },
};

// iroha_data_model_transaction_VersionedRejectedTransaction tools end

export function iroha_data_model_transaction_VersionedRejectedTransaction_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_transaction_VersionedRejectedTransaction_Decoded> {
    return decodeEnum(bytes, iroha_data_model_transaction_VersionedRejectedTransaction_decoders);
}

export function iroha_data_model_transaction_VersionedRejectedTransaction_encode(
    encodable: iroha_data_model_transaction_VersionedRejectedTransaction_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_transaction_VersionedRejectedTransaction_encoders);
}

// iroha_data_model_transaction_VersionedRejectedTransactionV1

export type iroha_data_model_transaction_VersionedRejectedTransactionV1_Decoded = [
    iroha_data_model_transaction_RejectedTransaction_Decoded,
];

export type iroha_data_model_transaction_VersionedRejectedTransactionV1_Encodable = [
    iroha_data_model_transaction_RejectedTransaction_Encodable | EncodeAsIs,
];

// iroha_data_model_transaction_VersionedRejectedTransactionV1 tuple-related tools

const iroha_data_model_transaction_VersionedRejectedTransactionV1_decoders = [
    iroha_data_model_transaction_RejectedTransaction_decode,
];
const iroha_data_model_transaction_VersionedRejectedTransactionV1_encoders = (
    [iroha_data_model_transaction_RejectedTransaction_encode] as any
).map(makeEncoderAsIsRespectable);

// iroha_data_model_transaction_VersionedRejectedTransactionV1 tools end

export function iroha_data_model_transaction_VersionedRejectedTransactionV1_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_transaction_VersionedRejectedTransactionV1_Decoded> {
    return decodeTuple(bytes, iroha_data_model_transaction_VersionedRejectedTransactionV1_decoders as any);
}

export function iroha_data_model_transaction_VersionedRejectedTransactionV1_encode(
    encodable: iroha_data_model_transaction_VersionedRejectedTransactionV1_Encodable,
): Uint8Array {
    return encodeTuple(encodable, iroha_data_model_transaction_VersionedRejectedTransactionV1_encoders as any);
}

// iroha_data_model_transaction_VersionedTransaction

export type iroha_data_model_transaction_VersionedTransaction_Decoded = Enum<{
    V1: Valuable<iroha_data_model_transaction_VersionedTransactionV1_Decoded>;
}>;

export type iroha_data_model_transaction_VersionedTransaction_Encodable = Enum<{
    V1: Valuable<iroha_data_model_transaction_VersionedTransactionV1_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_transaction_VersionedTransaction enum tools

const iroha_data_model_transaction_VersionedTransaction_decoders: EnumDecoders = {
    1: { v: 'V1', decode: iroha_data_model_transaction_VersionedTransactionV1_decode },
};
const iroha_data_model_transaction_VersionedTransaction_encoders: EnumEncoders = {
    V1: { d: 1, encode: iroha_data_model_transaction_VersionedTransactionV1_encode },
};

// iroha_data_model_transaction_VersionedTransaction tools end

export function iroha_data_model_transaction_VersionedTransaction_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_transaction_VersionedTransaction_Decoded> {
    return decodeEnum(bytes, iroha_data_model_transaction_VersionedTransaction_decoders);
}

export function iroha_data_model_transaction_VersionedTransaction_encode(
    encodable: iroha_data_model_transaction_VersionedTransaction_Encodable,
): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_transaction_VersionedTransaction_encoders);
}

// iroha_data_model_transaction_VersionedTransactionV1

export type iroha_data_model_transaction_VersionedTransactionV1_Decoded = [
    iroha_data_model_transaction_Transaction_Decoded,
];

export type iroha_data_model_transaction_VersionedTransactionV1_Encodable = [
    iroha_data_model_transaction_Transaction_Encodable | EncodeAsIs,
];

// iroha_data_model_transaction_VersionedTransactionV1 tuple-related tools

const iroha_data_model_transaction_VersionedTransactionV1_decoders = [iroha_data_model_transaction_Transaction_decode];
const iroha_data_model_transaction_VersionedTransactionV1_encoders = (
    [iroha_data_model_transaction_Transaction_encode] as any
).map(makeEncoderAsIsRespectable);

// iroha_data_model_transaction_VersionedTransactionV1 tools end

export function iroha_data_model_transaction_VersionedTransactionV1_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_data_model_transaction_VersionedTransactionV1_Decoded> {
    return decodeTuple(bytes, iroha_data_model_transaction_VersionedTransactionV1_decoders as any);
}

export function iroha_data_model_transaction_VersionedTransactionV1_encode(
    encodable: iroha_data_model_transaction_VersionedTransactionV1_Encodable,
): Uint8Array {
    return encodeTuple(encodable, iroha_data_model_transaction_VersionedTransactionV1_encoders as any);
}

// iroha_data_model_Value

export type iroha_data_model_Value_Decoded = Enum<{
    U32: Valuable<u32_Decoded>;
    Bool: Valuable<bool_Decoded>;
    String: Valuable<str_Decoded>;
    Fixed: Valuable<iroha_data_model_fixed_Fixed_Decoded>;
    Vec: Valuable<Vec_iroha_data_model_Value_Decoded>;
    Id: Valuable<iroha_data_model_IdBox_Decoded>;
    Identifiable: Valuable<iroha_data_model_IdentifiableBox_Decoded>;
    PublicKey: Valuable<iroha_crypto_PublicKey_Decoded>;
    Parameter: Valuable<iroha_data_model_Parameter_Decoded>;
    SignatureCheckCondition: Valuable<iroha_data_model_account_SignatureCheckCondition_Decoded>;
    TransactionValue: Valuable<iroha_data_model_transaction_TransactionValue_Decoded>;
    PermissionToken: Valuable<iroha_data_model_permissions_PermissionToken_Decoded>;
}>;

export type iroha_data_model_Value_Encodable = Enum<{
    U32: Valuable<u32_Encodable | EncodeAsIs>;
    Bool: Valuable<bool_Encodable | EncodeAsIs>;
    String: Valuable<str_Encodable | EncodeAsIs>;
    Fixed: Valuable<iroha_data_model_fixed_Fixed_Encodable | EncodeAsIs>;
    Vec: Valuable<Vec_iroha_data_model_Value_Encodable | EncodeAsIs>;
    Id: Valuable<iroha_data_model_IdBox_Encodable | EncodeAsIs>;
    Identifiable: Valuable<iroha_data_model_IdentifiableBox_Encodable | EncodeAsIs>;
    PublicKey: Valuable<iroha_crypto_PublicKey_Encodable | EncodeAsIs>;
    Parameter: Valuable<iroha_data_model_Parameter_Encodable | EncodeAsIs>;
    SignatureCheckCondition: Valuable<iroha_data_model_account_SignatureCheckCondition_Encodable | EncodeAsIs>;
    TransactionValue: Valuable<iroha_data_model_transaction_TransactionValue_Encodable | EncodeAsIs>;
    PermissionToken: Valuable<iroha_data_model_permissions_PermissionToken_Encodable | EncodeAsIs>;
}>;

// iroha_data_model_Value enum tools

const iroha_data_model_Value_decoders: EnumDecoders = {
    0: { v: 'U32', decode: u32_decode },
    1: { v: 'Bool', decode: bool_decode },
    2: { v: 'String', decode: str_decode },
    3: { v: 'Fixed', decode: iroha_data_model_fixed_Fixed_decode },
    4: { v: 'Vec', decode: Vec_iroha_data_model_Value_decode },
    5: { v: 'Id', decode: iroha_data_model_IdBox_decode },
    6: { v: 'Identifiable', decode: iroha_data_model_IdentifiableBox_decode },
    7: { v: 'PublicKey', decode: iroha_crypto_PublicKey_decode },
    8: { v: 'Parameter', decode: iroha_data_model_Parameter_decode },
    9: { v: 'SignatureCheckCondition', decode: iroha_data_model_account_SignatureCheckCondition_decode },
    10: { v: 'TransactionValue', decode: iroha_data_model_transaction_TransactionValue_decode },
    11: { v: 'PermissionToken', decode: iroha_data_model_permissions_PermissionToken_decode },
};
const iroha_data_model_Value_encoders: EnumEncoders = {
    U32: { d: 0, encode: u32_encode },
    Bool: { d: 1, encode: bool_encode },
    String: { d: 2, encode: str_encode },
    Fixed: { d: 3, encode: iroha_data_model_fixed_Fixed_encode },
    Vec: { d: 4, encode: Vec_iroha_data_model_Value_encode },
    Id: { d: 5, encode: iroha_data_model_IdBox_encode },
    Identifiable: { d: 6, encode: iroha_data_model_IdentifiableBox_encode },
    PublicKey: { d: 7, encode: iroha_crypto_PublicKey_encode },
    Parameter: { d: 8, encode: iroha_data_model_Parameter_encode },
    SignatureCheckCondition: { d: 9, encode: iroha_data_model_account_SignatureCheckCondition_encode },
    TransactionValue: { d: 10, encode: iroha_data_model_transaction_TransactionValue_encode },
    PermissionToken: { d: 11, encode: iroha_data_model_permissions_PermissionToken_encode },
};

// iroha_data_model_Value tools end

export function iroha_data_model_Value_decode(bytes: Uint8Array): DecodeResult<iroha_data_model_Value_Decoded> {
    return decodeEnum(bytes, iroha_data_model_Value_decoders);
}

export function iroha_data_model_Value_encode(encodable: iroha_data_model_Value_Encodable): Uint8Array {
    return encodeEnum(encodable, iroha_data_model_Value_encoders);
}

// iroha_genesis_GenesisTransaction

export type iroha_genesis_GenesisTransaction_Decoded = {
    isi: Vec_iroha_data_model_isi_Instruction_Decoded;
};

export type iroha_genesis_GenesisTransaction_Encodable = {
    isi: Vec_iroha_data_model_isi_Instruction_Encodable | EncodeAsIs;
};

const iroha_genesis_GenesisTransaction_order: (keyof iroha_genesis_GenesisTransaction_Decoded)[] = ['isi'];
const iroha_genesis_GenesisTransaction_decoders = {
    isi: Vec_iroha_data_model_isi_Instruction_decode,
};
const iroha_genesis_GenesisTransaction_encoders = {
    isi: makeEncoderAsIsRespectable(Vec_iroha_data_model_isi_Instruction_encode),
};

export function iroha_genesis_GenesisTransaction_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_genesis_GenesisTransaction_Decoded> {
    return decodeStruct(bytes, iroha_genesis_GenesisTransaction_decoders, iroha_genesis_GenesisTransaction_order);
}

export function iroha_genesis_GenesisTransaction_encode(
    encodable: iroha_genesis_GenesisTransaction_Encodable,
): Uint8Array {
    return encodeStruct(encodable, iroha_genesis_GenesisTransaction_encoders, iroha_genesis_GenesisTransaction_order);
}

// iroha_genesis_RawGenesisBlock

export type iroha_genesis_RawGenesisBlock_Decoded = {
    transactions: Vec_iroha_genesis_GenesisTransaction_Decoded;
};

export type iroha_genesis_RawGenesisBlock_Encodable = {
    transactions: Vec_iroha_genesis_GenesisTransaction_Encodable | EncodeAsIs;
};

const iroha_genesis_RawGenesisBlock_order: (keyof iroha_genesis_RawGenesisBlock_Decoded)[] = ['transactions'];
const iroha_genesis_RawGenesisBlock_decoders = {
    transactions: Vec_iroha_genesis_GenesisTransaction_decode,
};
const iroha_genesis_RawGenesisBlock_encoders = {
    transactions: makeEncoderAsIsRespectable(Vec_iroha_genesis_GenesisTransaction_encode),
};

export function iroha_genesis_RawGenesisBlock_decode(
    bytes: Uint8Array,
): DecodeResult<iroha_genesis_RawGenesisBlock_Decoded> {
    return decodeStruct(bytes, iroha_genesis_RawGenesisBlock_decoders, iroha_genesis_RawGenesisBlock_order);
}

export function iroha_genesis_RawGenesisBlock_encode(encodable: iroha_genesis_RawGenesisBlock_Encodable): Uint8Array {
    return encodeStruct(encodable, iroha_genesis_RawGenesisBlock_encoders, iroha_genesis_RawGenesisBlock_order);
}

// Option_iroha_crypto_Hash

export type Option_iroha_crypto_Hash_Decoded = Option<iroha_crypto_Hash_Decoded>;

export type Option_iroha_crypto_Hash_Encodable = Option<iroha_crypto_Hash_Encodable | EncodeAsIs>;

const Option_iroha_crypto_Hash_decoders: EnumDecoders = {
    0: { v: 'None' },
    1: { v: 'Some', decode: iroha_crypto_Hash_decode },
};
const Option_iroha_crypto_Hash_encoders: EnumEncoders = {
    None: { d: 0 },
    Some: { d: 1, encode: iroha_crypto_Hash_encode },
};

export function Option_iroha_crypto_Hash_decode(bytes: Uint8Array): DecodeResult<Option_iroha_crypto_Hash_Decoded> {
    return decodeEnum(bytes, Option_iroha_crypto_Hash_decoders);
}

export function Option_iroha_crypto_Hash_encode(encodable: Option_iroha_crypto_Hash_Encodable): Uint8Array {
    return encodeEnum(encodable, Option_iroha_crypto_Hash_encoders);
}

// Option_iroha_data_model_events_pipeline_EntityType

export type Option_iroha_data_model_events_pipeline_EntityType_Decoded =
    Option<iroha_data_model_events_pipeline_EntityType_Decoded>;

export type Option_iroha_data_model_events_pipeline_EntityType_Encodable = Option<
    iroha_data_model_events_pipeline_EntityType_Encodable | EncodeAsIs
>;

const Option_iroha_data_model_events_pipeline_EntityType_decoders: EnumDecoders = {
    0: { v: 'None' },
    1: { v: 'Some', decode: iroha_data_model_events_pipeline_EntityType_decode },
};
const Option_iroha_data_model_events_pipeline_EntityType_encoders: EnumEncoders = {
    None: { d: 0 },
    Some: { d: 1, encode: iroha_data_model_events_pipeline_EntityType_encode },
};

export function Option_iroha_data_model_events_pipeline_EntityType_decode(
    bytes: Uint8Array,
): DecodeResult<Option_iroha_data_model_events_pipeline_EntityType_Decoded> {
    return decodeEnum(bytes, Option_iroha_data_model_events_pipeline_EntityType_decoders);
}

export function Option_iroha_data_model_events_pipeline_EntityType_encode(
    encodable: Option_iroha_data_model_events_pipeline_EntityType_Encodable,
): Uint8Array {
    return encodeEnum(encodable, Option_iroha_data_model_events_pipeline_EntityType_encoders);
}

// Option_iroha_data_model_isi_Instruction

export type Option_iroha_data_model_isi_Instruction_Decoded = Option<iroha_data_model_isi_Instruction_Decoded>;

export type Option_iroha_data_model_isi_Instruction_Encodable = Option<
    iroha_data_model_isi_Instruction_Encodable | EncodeAsIs
>;

const Option_iroha_data_model_isi_Instruction_decoders: EnumDecoders = {
    0: { v: 'None' },
    1: { v: 'Some', decode: iroha_data_model_isi_Instruction_decode },
};
const Option_iroha_data_model_isi_Instruction_encoders: EnumEncoders = {
    None: { d: 0 },
    Some: { d: 1, encode: iroha_data_model_isi_Instruction_encode },
};

export function Option_iroha_data_model_isi_Instruction_decode(
    bytes: Uint8Array,
): DecodeResult<Option_iroha_data_model_isi_Instruction_Decoded> {
    return decodeEnum(bytes, Option_iroha_data_model_isi_Instruction_decoders);
}

export function Option_iroha_data_model_isi_Instruction_encode(
    encodable: Option_iroha_data_model_isi_Instruction_Encodable,
): Uint8Array {
    return encodeEnum(encodable, Option_iroha_data_model_isi_Instruction_encoders);
}

// Vec_iroha_crypto_PublicKey

export type Vec_iroha_crypto_PublicKey_Decoded = iroha_crypto_PublicKey_Decoded[];

export type Vec_iroha_crypto_PublicKey_Encodable = (iroha_crypto_PublicKey_Encodable | EncodeAsIs)[];

const Vec_iroha_crypto_PublicKey_item_encode = makeEncoderAsIsRespectable(iroha_crypto_PublicKey_encode);

export function Vec_iroha_crypto_PublicKey_decode(bytes: Uint8Array): DecodeResult<Vec_iroha_crypto_PublicKey_Decoded> {
    return decodeVec(bytes, iroha_crypto_PublicKey_decode);
}

export function Vec_iroha_crypto_PublicKey_encode(encodable: Vec_iroha_crypto_PublicKey_Encodable): Uint8Array {
    return encodeVec(encodable, Vec_iroha_crypto_PublicKey_item_encode);
}

// Vec_iroha_crypto_Signature

export type Vec_iroha_crypto_Signature_Decoded = iroha_crypto_Signature_Decoded[];

export type Vec_iroha_crypto_Signature_Encodable = (iroha_crypto_Signature_Encodable | EncodeAsIs)[];

const Vec_iroha_crypto_Signature_item_encode = makeEncoderAsIsRespectable(iroha_crypto_Signature_encode);

export function Vec_iroha_crypto_Signature_decode(bytes: Uint8Array): DecodeResult<Vec_iroha_crypto_Signature_Decoded> {
    return decodeVec(bytes, iroha_crypto_Signature_decode);
}

export function Vec_iroha_crypto_Signature_encode(encodable: Vec_iroha_crypto_Signature_Encodable): Uint8Array {
    return encodeVec(encodable, Vec_iroha_crypto_Signature_item_encode);
}

// Vec_iroha_data_model_isi_Instruction

export type Vec_iroha_data_model_isi_Instruction_Decoded = iroha_data_model_isi_Instruction_Decoded[];

export type Vec_iroha_data_model_isi_Instruction_Encodable = (
    | iroha_data_model_isi_Instruction_Encodable
    | EncodeAsIs
)[];

const Vec_iroha_data_model_isi_Instruction_item_encode = makeEncoderAsIsRespectable(
    iroha_data_model_isi_Instruction_encode,
);

export function Vec_iroha_data_model_isi_Instruction_decode(
    bytes: Uint8Array,
): DecodeResult<Vec_iroha_data_model_isi_Instruction_Decoded> {
    return decodeVec(bytes, iroha_data_model_isi_Instruction_decode);
}

export function Vec_iroha_data_model_isi_Instruction_encode(
    encodable: Vec_iroha_data_model_isi_Instruction_Encodable,
): Uint8Array {
    return encodeVec(encodable, Vec_iroha_data_model_isi_Instruction_item_encode);
}

// Vec_iroha_data_model_permissions_PermissionToken

export type Vec_iroha_data_model_permissions_PermissionToken_Decoded =
    iroha_data_model_permissions_PermissionToken_Decoded[];

export type Vec_iroha_data_model_permissions_PermissionToken_Encodable = (
    | iroha_data_model_permissions_PermissionToken_Encodable
    | EncodeAsIs
)[];

const Vec_iroha_data_model_permissions_PermissionToken_item_encode = makeEncoderAsIsRespectable(
    iroha_data_model_permissions_PermissionToken_encode,
);

export function Vec_iroha_data_model_permissions_PermissionToken_decode(
    bytes: Uint8Array,
): DecodeResult<Vec_iroha_data_model_permissions_PermissionToken_Decoded> {
    return decodeVec(bytes, iroha_data_model_permissions_PermissionToken_decode);
}

export function Vec_iroha_data_model_permissions_PermissionToken_encode(
    encodable: Vec_iroha_data_model_permissions_PermissionToken_Encodable,
): Uint8Array {
    return encodeVec(encodable, Vec_iroha_data_model_permissions_PermissionToken_item_encode);
}

// Vec_iroha_data_model_Value

export type Vec_iroha_data_model_Value_Decoded = iroha_data_model_Value_Decoded[];

export type Vec_iroha_data_model_Value_Encodable = (iroha_data_model_Value_Encodable | EncodeAsIs)[];

const Vec_iroha_data_model_Value_item_encode = makeEncoderAsIsRespectable(iroha_data_model_Value_encode);

export function Vec_iroha_data_model_Value_decode(bytes: Uint8Array): DecodeResult<Vec_iroha_data_model_Value_Decoded> {
    return decodeVec(bytes, iroha_data_model_Value_decode);
}

export function Vec_iroha_data_model_Value_encode(encodable: Vec_iroha_data_model_Value_Encodable): Uint8Array {
    return encodeVec(encodable, Vec_iroha_data_model_Value_item_encode);
}

// Vec_iroha_genesis_GenesisTransaction

export type Vec_iroha_genesis_GenesisTransaction_Decoded = iroha_genesis_GenesisTransaction_Decoded[];

export type Vec_iroha_genesis_GenesisTransaction_Encodable = (
    | iroha_genesis_GenesisTransaction_Encodable
    | EncodeAsIs
)[];

const Vec_iroha_genesis_GenesisTransaction_item_encode = makeEncoderAsIsRespectable(
    iroha_genesis_GenesisTransaction_encode,
);

export function Vec_iroha_genesis_GenesisTransaction_decode(
    bytes: Uint8Array,
): DecodeResult<Vec_iroha_genesis_GenesisTransaction_Decoded> {
    return decodeVec(bytes, iroha_genesis_GenesisTransaction_decode);
}

export function Vec_iroha_genesis_GenesisTransaction_encode(
    encodable: Vec_iroha_genesis_GenesisTransaction_Encodable,
): Uint8Array {
    return encodeVec(encodable, Vec_iroha_genesis_GenesisTransaction_item_encode);
}
