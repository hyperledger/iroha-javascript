import {
    Enum,
    EnumSchema,
    Option,
    StdCodecs,
    StdTypes,
    Valuable,
    defAlias,
    defBytesArray,
    defEnum,
    defMap,
    defNamespace,
    defOption,
    defSet,
    defStruct,
    defTuple,
    defVec,
} from '@scale-codec/namespace';

export type IrohaDataModel = StdTypes & {
    'BTreeMap<String, iroha_data_model::Value>': Map<IrohaDataModel['str'], IrohaDataModel['iroha_data_model::Value']>;
    'BTreeMap<String, iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>>': Map<
        IrohaDataModel['str'],
        IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>']
    >;
    'BTreeMap<iroha_data_model::account::Id, iroha_data_model::account::Account>': Map<
        IrohaDataModel['iroha_data_model::account::Id'],
        IrohaDataModel['iroha_data_model::account::Account']
    >;
    'BTreeMap<iroha_data_model::asset::DefinitionId, iroha_data_model::asset::AssetDefinitionEntry>': Map<
        IrohaDataModel['iroha_data_model::asset::DefinitionId'],
        IrohaDataModel['iroha_data_model::asset::AssetDefinitionEntry']
    >;
    'BTreeMap<iroha_data_model::asset::Id, iroha_data_model::asset::Asset>': Map<
        IrohaDataModel['iroha_data_model::asset::Id'],
        IrohaDataModel['iroha_data_model::asset::Asset']
    >;
    'Option<iroha_crypto::Hash>': Option<IrohaDataModel['iroha_crypto::Hash']>;
    'Option<iroha_data_model::events::pipeline::EntityType>': Option<
        IrohaDataModel['iroha_data_model::events::pipeline::EntityType']
    >;
    'Option<iroha_data_model::isi::Instruction>': Option<IrohaDataModel['iroha_data_model::isi::Instruction']>;
    String: IrohaDataModel['str'];
    'Vec<iroha_crypto::PublicKey>': IrohaDataModel['iroha_crypto::PublicKey'][];
    'Vec<iroha_crypto::Signature>': IrohaDataModel['iroha_crypto::Signature'][];
    'Vec<iroha_data_model::Value>': IrohaDataModel['iroha_data_model::Value'][];
    'Vec<iroha_data_model::isi::Instruction>': IrohaDataModel['iroha_data_model::isi::Instruction'][];
    'Vec<iroha_data_model::permissions::PermissionToken>': IrohaDataModel['iroha_data_model::permissions::PermissionToken'][];
    '[u8; 32]': Uint8Array;
    'iroha_crypto::Hash': [IrohaDataModel['[u8; 32]']];
    'iroha_crypto::PublicKey': {
        digestFunction: IrohaDataModel['str'];
        payload: IrohaDataModel['Vec<u8>'];
    };
    'iroha_crypto::Signature': {
        publicKey: IrohaDataModel['iroha_crypto::PublicKey'];
        signature: IrohaDataModel['Vec<u8>'];
    };
    'iroha_data_model::IdBox': Enum<{
        AccountId: Valuable<IrohaDataModel['iroha_data_model::account::Id']>;
        AssetId: Valuable<IrohaDataModel['iroha_data_model::asset::Id']>;
        AssetDefinitionId: Valuable<IrohaDataModel['iroha_data_model::asset::DefinitionId']>;
        DomainName: Valuable<IrohaDataModel['str']>;
        PeerId: Valuable<IrohaDataModel['iroha_data_model::peer::Id']>;
        WorldId: null;
    }>;
    'iroha_data_model::IdentifiableBox': Enum<{
        Account: Valuable<IrohaDataModel['iroha_data_model::account::Account']>;
        NewAccount: Valuable<IrohaDataModel['iroha_data_model::account::NewAccount']>;
        Asset: Valuable<IrohaDataModel['iroha_data_model::asset::Asset']>;
        AssetDefinition: Valuable<IrohaDataModel['iroha_data_model::asset::AssetDefinition']>;
        Domain: Valuable<IrohaDataModel['iroha_data_model::domain::Domain']>;
        Peer: Valuable<IrohaDataModel['iroha_data_model::peer::Peer']>;
        World: null;
    }>;
    'iroha_data_model::Parameter': Enum<{
        MaximumFaultyPeersAmount: Valuable<IrohaDataModel['u32']>;
        BlockTime: Valuable<IrohaDataModel['u128']>;
        CommitTime: Valuable<IrohaDataModel['u128']>;
        TransactionReceiptTime: Valuable<IrohaDataModel['u128']>;
    }>;
    'iroha_data_model::Value': Enum<{
        U32: Valuable<IrohaDataModel['u32']>;
        Bool: Valuable<IrohaDataModel['bool']>;
        String: Valuable<IrohaDataModel['str']>;
        Vec: Valuable<IrohaDataModel['Vec<iroha_data_model::Value>']>;
        Id: Valuable<IrohaDataModel['iroha_data_model::IdBox']>;
        Identifiable: Valuable<IrohaDataModel['iroha_data_model::IdentifiableBox']>;
        PublicKey: Valuable<IrohaDataModel['iroha_crypto::PublicKey']>;
        Parameter: Valuable<IrohaDataModel['iroha_data_model::Parameter']>;
        SignatureCheckCondition: Valuable<IrohaDataModel['iroha_data_model::account::SignatureCheckCondition']>;
        TransactionValue: Valuable<IrohaDataModel['iroha_data_model::transaction::TransactionValue']>;
        PermissionToken: Valuable<IrohaDataModel['iroha_data_model::permissions::PermissionToken']>;
    }>;
    'iroha_data_model::account::Account': {
        id: IrohaDataModel['iroha_data_model::account::Id'];
        assets: IrohaDataModel['BTreeMap<iroha_data_model::asset::Id, iroha_data_model::asset::Asset>'];
        signatories: IrohaDataModel['Vec<iroha_crypto::PublicKey>'];
        permissionTokens: IrohaDataModel['BTreeSet<iroha_data_model::permissions::PermissionToken>'];
        signatureCheckCondition: IrohaDataModel['iroha_data_model::account::SignatureCheckCondition'];
        metadata: IrohaDataModel['iroha_data_model::metadata::Metadata'];
    };
    'iroha_data_model::account::Id': {
        name: IrohaDataModel['str'];
        domainName: IrohaDataModel['str'];
    };
    'iroha_data_model::account::NewAccount': {
        id: IrohaDataModel['iroha_data_model::account::Id'];
        signatories: IrohaDataModel['Vec<iroha_crypto::PublicKey>'];
        metadata: IrohaDataModel['iroha_data_model::metadata::Metadata'];
    };
    'iroha_data_model::account::SignatureCheckCondition': [
        IrohaDataModel['iroha_data_model::expression::EvaluatesTo<bool>'],
    ];
    'iroha_data_model::asset::Asset': {
        id: IrohaDataModel['iroha_data_model::asset::Id'];
        value: IrohaDataModel['iroha_data_model::asset::AssetValue'];
    };
    'iroha_data_model::asset::AssetDefinition': {
        valueType: IrohaDataModel['iroha_data_model::asset::AssetValueType'];
        id: IrohaDataModel['iroha_data_model::asset::DefinitionId'];
    };
    'iroha_data_model::asset::AssetDefinitionEntry': {
        definition: IrohaDataModel['iroha_data_model::asset::AssetDefinition'];
        registeredBy: IrohaDataModel['iroha_data_model::account::Id'];
    };
    'iroha_data_model::asset::AssetValue': Enum<{
        Quantity: Valuable<IrohaDataModel['u32']>;
        BigQuantity: Valuable<IrohaDataModel['u128']>;
        Store: Valuable<IrohaDataModel['iroha_data_model::metadata::Metadata']>;
    }>;
    'iroha_data_model::asset::AssetValueType': Enum<{
        Quantity: null;
        BigQuantity: null;
        Store: null;
    }>;
    'iroha_data_model::asset::DefinitionId': {
        name: IrohaDataModel['str'];
        domainName: IrohaDataModel['str'];
    };
    'iroha_data_model::asset::Id': {
        definitionId: IrohaDataModel['iroha_data_model::asset::DefinitionId'];
        accountId: IrohaDataModel['iroha_data_model::account::Id'];
    };
    'iroha_data_model::domain::Domain': {
        name: IrohaDataModel['str'];
        accounts: IrohaDataModel['BTreeMap<iroha_data_model::account::Id, iroha_data_model::account::Account>'];
        assetDefinitions: IrohaDataModel['BTreeMap<iroha_data_model::asset::DefinitionId, iroha_data_model::asset::AssetDefinitionEntry>'];
    };
    'iroha_data_model::events::Event': Enum<{
        Pipeline: Valuable<IrohaDataModel['iroha_data_model::events::pipeline::Event']>;
        Data: Valuable<IrohaDataModel['iroha_data_model::events::data::Event']>;
    }>;
    'iroha_data_model::events::EventFilter': Enum<{
        Pipeline: Valuable<IrohaDataModel['iroha_data_model::events::pipeline::EventFilter']>;
        Data: Valuable<IrohaDataModel['iroha_data_model::events::data::EventFilter']>;
    }>;
    'iroha_data_model::events::EventSocketMessage': Enum<{
        SubscriptionRequest: Valuable<IrohaDataModel['iroha_data_model::events::SubscriptionRequest']>;
        SubscriptionAccepted: null;
        Event: Valuable<IrohaDataModel['iroha_data_model::events::Event']>;
        EventReceived: null;
    }>;
    'iroha_data_model::events::SubscriptionRequest': [IrohaDataModel['iroha_data_model::events::EventFilter']];
    'iroha_data_model::events::VersionedEventSocketMessage': Enum<{
        V1: Valuable<IrohaDataModel['iroha_data_model::events::_VersionedEventSocketMessageV1']>;
    }>;
    'iroha_data_model::events::_VersionedEventSocketMessageV1': [
        IrohaDataModel['iroha_data_model::events::EventSocketMessage'],
    ];
    'iroha_data_model::events::data::Event': [];
    'iroha_data_model::events::data::EventFilter': [];
    'iroha_data_model::events::pipeline::BlockRejectionReason': Enum<{
        ConsensusBlockRejection: null;
    }>;
    'iroha_data_model::events::pipeline::EntityType': Enum<{
        Block: null;
        Transaction: null;
    }>;
    'iroha_data_model::events::pipeline::Event': {
        entityType: IrohaDataModel['iroha_data_model::events::pipeline::EntityType'];
        status: IrohaDataModel['iroha_data_model::events::pipeline::Status'];
        hash: IrohaDataModel['iroha_crypto::Hash'];
    };
    'iroha_data_model::events::pipeline::EventFilter': {
        entity: IrohaDataModel['Option<iroha_data_model::events::pipeline::EntityType>'];
        hash: IrohaDataModel['Option<iroha_crypto::Hash>'];
    };
    'iroha_data_model::events::pipeline::InstructionExecutionFail': {
        instruction: IrohaDataModel['iroha_data_model::isi::Instruction'];
        reason: IrohaDataModel['str'];
    };
    'iroha_data_model::events::pipeline::NotPermittedFail': {
        reason: IrohaDataModel['str'];
    };
    'iroha_data_model::events::pipeline::RejectionReason': Enum<{
        Block: Valuable<IrohaDataModel['iroha_data_model::events::pipeline::BlockRejectionReason']>;
        Transaction: Valuable<IrohaDataModel['iroha_data_model::events::pipeline::TransactionRejectionReason']>;
    }>;
    'iroha_data_model::events::pipeline::SignatureVerificationFail': {
        signature: IrohaDataModel['iroha_crypto::Signature'];
        reason: IrohaDataModel['str'];
    };
    'iroha_data_model::events::pipeline::Status': Enum<{
        Validating: null;
        Rejected: Valuable<IrohaDataModel['iroha_data_model::events::pipeline::RejectionReason']>;
        Committed: null;
    }>;
    'iroha_data_model::events::pipeline::TransactionRejectionReason': Enum<{
        NotPermitted: Valuable<IrohaDataModel['iroha_data_model::events::pipeline::NotPermittedFail']>;
        UnsatisfiedSignatureCondition: Valuable<
            IrohaDataModel['iroha_data_model::events::pipeline::UnsatisfiedSignatureConditionFail']
        >;
        InstructionExecution: Valuable<IrohaDataModel['iroha_data_model::events::pipeline::InstructionExecutionFail']>;
        SignatureVerification: Valuable<
            IrohaDataModel['iroha_data_model::events::pipeline::SignatureVerificationFail']
        >;
        UnexpectedGenesisAccountSignature: null;
    }>;
    'iroha_data_model::events::pipeline::UnsatisfiedSignatureConditionFail': {
        reason: IrohaDataModel['str'];
    };
    'iroha_data_model::expression::Add': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
    };
    'iroha_data_model::expression::And': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<bool>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<bool>'];
    };
    'iroha_data_model::expression::Contains': {
        collection: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>'];
        element: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
    };
    'iroha_data_model::expression::ContainsAll': {
        collection: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>'];
        elements: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>'];
    };
    'iroha_data_model::expression::ContainsAny': {
        collection: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>'];
        elements: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>'];
    };
    'iroha_data_model::expression::ContextValue': {
        valueName: IrohaDataModel['str'];
    };
    'iroha_data_model::expression::Divide': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
    };
    'iroha_data_model::expression::Equal': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
    };
    'iroha_data_model::expression::EvaluatesTo<alloc::string::String>': {
        expression: IrohaDataModel['iroha_data_model::expression::Expression'];
    };
    'iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>': {
        expression: IrohaDataModel['iroha_data_model::expression::Expression'];
    };
    'iroha_data_model::expression::EvaluatesTo<bool>': {
        expression: IrohaDataModel['iroha_data_model::expression::Expression'];
    };
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>': {
        expression: IrohaDataModel['iroha_data_model::expression::Expression'];
    };
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdentifiableBox>': {
        expression: IrohaDataModel['iroha_data_model::expression::Expression'];
    };
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>': {
        expression: IrohaDataModel['iroha_data_model::expression::Expression'];
    };
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>': {
        expression: IrohaDataModel['iroha_data_model::expression::Expression'];
    };
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::DefinitionId>': {
        expression: IrohaDataModel['iroha_data_model::expression::Expression'];
    };
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::Id>': {
        expression: IrohaDataModel['iroha_data_model::expression::Expression'];
    };
    'iroha_data_model::expression::EvaluatesTo<u32>': {
        expression: IrohaDataModel['iroha_data_model::expression::Expression'];
    };
    'iroha_data_model::expression::Expression': Enum<{
        Add: Valuable<IrohaDataModel['iroha_data_model::expression::Add']>;
        Subtract: Valuable<IrohaDataModel['iroha_data_model::expression::Subtract']>;
        Multiply: Valuable<IrohaDataModel['iroha_data_model::expression::Multiply']>;
        Divide: Valuable<IrohaDataModel['iroha_data_model::expression::Divide']>;
        Mod: Valuable<IrohaDataModel['iroha_data_model::expression::Mod']>;
        RaiseTo: Valuable<IrohaDataModel['iroha_data_model::expression::RaiseTo']>;
        Greater: Valuable<IrohaDataModel['iroha_data_model::expression::Greater']>;
        Less: Valuable<IrohaDataModel['iroha_data_model::expression::Less']>;
        Equal: Valuable<IrohaDataModel['iroha_data_model::expression::Equal']>;
        Not: Valuable<IrohaDataModel['iroha_data_model::expression::Not']>;
        And: Valuable<IrohaDataModel['iroha_data_model::expression::And']>;
        Or: Valuable<IrohaDataModel['iroha_data_model::expression::Or']>;
        If: Valuable<IrohaDataModel['iroha_data_model::expression::If']>;
        Raw: Valuable<IrohaDataModel['iroha_data_model::Value']>;
        Query: Valuable<IrohaDataModel['iroha_data_model::query::QueryBox']>;
        Contains: Valuable<IrohaDataModel['iroha_data_model::expression::Contains']>;
        ContainsAll: Valuable<IrohaDataModel['iroha_data_model::expression::ContainsAll']>;
        ContainsAny: Valuable<IrohaDataModel['iroha_data_model::expression::ContainsAny']>;
        Where: Valuable<IrohaDataModel['iroha_data_model::expression::Where']>;
        ContextValue: Valuable<IrohaDataModel['iroha_data_model::expression::ContextValue']>;
    }>;
    'iroha_data_model::expression::Greater': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
    };
    'iroha_data_model::expression::If': {
        condition: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<bool>'];
        thenExpression: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
        elseExpression: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
    };
    'iroha_data_model::expression::Less': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
    };
    'iroha_data_model::expression::Mod': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
    };
    'iroha_data_model::expression::Multiply': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
    };
    'iroha_data_model::expression::Not': {
        expression: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<bool>'];
    };
    'iroha_data_model::expression::Or': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<bool>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<bool>'];
    };
    'iroha_data_model::expression::RaiseTo': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
    };
    'iroha_data_model::expression::Subtract': {
        left: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
        right: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<u32>'];
    };
    'iroha_data_model::expression::Where': {
        expression: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
        values: IrohaDataModel['BTreeMap<String, iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>>'];
    };
    'iroha_data_model::isi::BurnBox': {
        object: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
        destinationId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'];
    };
    'iroha_data_model::isi::FailBox': {
        message: IrohaDataModel['str'];
    };
    'iroha_data_model::isi::GrantBox': {
        object: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
        destinationId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'];
    };
    'iroha_data_model::isi::If': {
        condition: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<bool>'];
        then: IrohaDataModel['iroha_data_model::isi::Instruction'];
        otherwise: IrohaDataModel['Option<iroha_data_model::isi::Instruction>'];
    };
    'iroha_data_model::isi::Instruction': Enum<{
        Register: Valuable<IrohaDataModel['iroha_data_model::isi::RegisterBox']>;
        Unregister: Valuable<IrohaDataModel['iroha_data_model::isi::UnregisterBox']>;
        Mint: Valuable<IrohaDataModel['iroha_data_model::isi::MintBox']>;
        Burn: Valuable<IrohaDataModel['iroha_data_model::isi::BurnBox']>;
        Transfer: Valuable<IrohaDataModel['iroha_data_model::isi::TransferBox']>;
        If: Valuable<IrohaDataModel['iroha_data_model::isi::If']>;
        Pair: Valuable<IrohaDataModel['iroha_data_model::isi::Pair']>;
        Sequence: Valuable<IrohaDataModel['iroha_data_model::isi::SequenceBox']>;
        Fail: Valuable<IrohaDataModel['iroha_data_model::isi::FailBox']>;
        SetKeyValue: Valuable<IrohaDataModel['iroha_data_model::isi::SetKeyValueBox']>;
        RemoveKeyValue: Valuable<IrohaDataModel['iroha_data_model::isi::RemoveKeyValueBox']>;
        Grant: Valuable<IrohaDataModel['iroha_data_model::isi::GrantBox']>;
    }>;
    'iroha_data_model::isi::MintBox': {
        object: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
        destinationId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'];
    };
    'iroha_data_model::isi::Pair': {
        leftInstruction: IrohaDataModel['iroha_data_model::isi::Instruction'];
        rightInstruction: IrohaDataModel['iroha_data_model::isi::Instruction'];
    };
    'iroha_data_model::isi::RegisterBox': {
        object: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdentifiableBox>'];
    };
    'iroha_data_model::isi::RemoveKeyValueBox': {
        objectId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'];
        key: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::string::String>'];
    };
    'iroha_data_model::isi::SequenceBox': {
        instructions: IrohaDataModel['Vec<iroha_data_model::isi::Instruction>'];
    };
    'iroha_data_model::isi::SetKeyValueBox': {
        objectId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'];
        key: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::string::String>'];
        value: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
    };
    'iroha_data_model::isi::TransferBox': {
        sourceId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'];
        object: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'];
        destinationId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'];
    };
    'iroha_data_model::isi::UnregisterBox': {
        objectId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'];
    };
    'iroha_data_model::metadata::Metadata': {
        map: IrohaDataModel['BTreeMap<String, iroha_data_model::Value>'];
    };
    'iroha_data_model::peer::Id': {
        address: IrohaDataModel['str'];
        publicKey: IrohaDataModel['iroha_crypto::PublicKey'];
    };
    'iroha_data_model::peer::Peer': {
        id: IrohaDataModel['iroha_data_model::peer::Id'];
    };
    'iroha_data_model::permissions::PermissionToken': {
        name: IrohaDataModel['str'];
        params: IrohaDataModel['BTreeMap<String, iroha_data_model::Value>'];
    };
    'iroha_data_model::query::Payload': {
        timestampMs: IrohaDataModel['iroha_schema::Compact<u128>'];
        query: IrohaDataModel['iroha_data_model::query::QueryBox'];
        accountId: IrohaDataModel['iroha_data_model::account::Id'];
    };
    'iroha_data_model::query::QueryBox': Enum<{
        FindAllAccounts: Valuable<IrohaDataModel['iroha_data_model::query::account::FindAllAccounts']>;
        FindAccountById: Valuable<IrohaDataModel['iroha_data_model::query::account::FindAccountById']>;
        FindAccountKeyValueByIdAndKey: Valuable<
            IrohaDataModel['iroha_data_model::query::account::FindAccountKeyValueByIdAndKey']
        >;
        FindAccountsByName: Valuable<IrohaDataModel['iroha_data_model::query::account::FindAccountsByName']>;
        FindAccountsByDomainName: Valuable<
            IrohaDataModel['iroha_data_model::query::account::FindAccountsByDomainName']
        >;
        FindAllAssets: Valuable<IrohaDataModel['iroha_data_model::query::asset::FindAllAssets']>;
        FindAllAssetsDefinitions: Valuable<IrohaDataModel['iroha_data_model::query::asset::FindAllAssetsDefinitions']>;
        FindAssetById: Valuable<IrohaDataModel['iroha_data_model::query::asset::FindAssetById']>;
        FindAssetsByName: Valuable<IrohaDataModel['iroha_data_model::query::asset::FindAssetsByName']>;
        FindAssetsByAccountId: Valuable<IrohaDataModel['iroha_data_model::query::asset::FindAssetsByAccountId']>;
        FindAssetsByAssetDefinitionId: Valuable<
            IrohaDataModel['iroha_data_model::query::asset::FindAssetsByAssetDefinitionId']
        >;
        FindAssetsByDomainName: Valuable<IrohaDataModel['iroha_data_model::query::asset::FindAssetsByDomainName']>;
        FindAssetsByDomainNameAndAssetDefinitionId: Valuable<
            IrohaDataModel['iroha_data_model::query::asset::FindAssetsByDomainNameAndAssetDefinitionId']
        >;
        FindAssetQuantityById: Valuable<IrohaDataModel['iroha_data_model::query::asset::FindAssetQuantityById']>;
        FindAssetKeyValueByIdAndKey: Valuable<
            IrohaDataModel['iroha_data_model::query::asset::FindAssetKeyValueByIdAndKey']
        >;
        FindAllDomains: Valuable<IrohaDataModel['iroha_data_model::query::domain::FindAllDomains']>;
        FindDomainByName: Valuable<IrohaDataModel['iroha_data_model::query::domain::FindDomainByName']>;
        FindAllPeers: Valuable<IrohaDataModel['iroha_data_model::query::peer::FindAllPeers']>;
        FindTransactionsByAccountId: Valuable<
            IrohaDataModel['iroha_data_model::query::transaction::FindTransactionsByAccountId']
        >;
        FindPermissionTokensByAccountId: Valuable<
            IrohaDataModel['iroha_data_model::query::permissions::FindPermissionTokensByAccountId']
        >;
    }>;
    'iroha_data_model::query::QueryResult': [IrohaDataModel['iroha_data_model::Value']];
    'iroha_data_model::query::SignedQueryRequest': {
        payload: IrohaDataModel['iroha_data_model::query::Payload'];
        signature: IrohaDataModel['iroha_crypto::Signature'];
    };
    'iroha_data_model::query::VersionedQueryResult': Enum<{
        V1: Valuable<IrohaDataModel['iroha_data_model::query::_VersionedQueryResultV1']>;
    }>;
    'iroha_data_model::query::VersionedSignedQueryRequest': Enum<{
        V1: Valuable<IrohaDataModel['iroha_data_model::query::_VersionedSignedQueryRequestV1']>;
    }>;
    'iroha_data_model::query::_VersionedQueryResultV1': [IrohaDataModel['iroha_data_model::query::QueryResult']];
    'iroha_data_model::query::_VersionedSignedQueryRequestV1': [
        IrohaDataModel['iroha_data_model::query::SignedQueryRequest'],
    ];
    'iroha_data_model::query::account::FindAccountById': {
        id: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>'];
    };
    'iroha_data_model::query::account::FindAccountKeyValueByIdAndKey': {
        id: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>'];
        key: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::string::String>'];
    };
    'iroha_data_model::query::account::FindAccountsByDomainName': {
        domainName: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::string::String>'];
    };
    'iroha_data_model::query::account::FindAccountsByName': {
        name: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::string::String>'];
    };
    'iroha_data_model::query::account::FindAllAccounts': {};
    'iroha_data_model::query::asset::FindAllAssets': {};
    'iroha_data_model::query::asset::FindAllAssetsDefinitions': {};
    'iroha_data_model::query::asset::FindAssetById': {
        id: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::Id>'];
    };
    'iroha_data_model::query::asset::FindAssetKeyValueByIdAndKey': {
        id: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::Id>'];
        key: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::string::String>'];
    };
    'iroha_data_model::query::asset::FindAssetQuantityById': {
        id: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::Id>'];
    };
    'iroha_data_model::query::asset::FindAssetsByAccountId': {
        accountId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>'];
    };
    'iroha_data_model::query::asset::FindAssetsByAssetDefinitionId': {
        assetDefinitionId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::DefinitionId>'];
    };
    'iroha_data_model::query::asset::FindAssetsByDomainName': {
        domainName: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::string::String>'];
    };
    'iroha_data_model::query::asset::FindAssetsByDomainNameAndAssetDefinitionId': {
        domainName: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::string::String>'];
        assetDefinitionId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::DefinitionId>'];
    };
    'iroha_data_model::query::asset::FindAssetsByName': {
        name: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::string::String>'];
    };
    'iroha_data_model::query::domain::FindAllDomains': {};
    'iroha_data_model::query::domain::FindDomainByName': {
        name: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<alloc::string::String>'];
    };
    'iroha_data_model::query::peer::FindAllPeers': {};
    'iroha_data_model::query::permissions::FindPermissionTokensByAccountId': {
        id: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>'];
    };
    'iroha_data_model::query::transaction::FindTransactionsByAccountId': {
        accountId: IrohaDataModel['iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>'];
    };
    'iroha_data_model::transaction::Payload': {
        accountId: IrohaDataModel['iroha_data_model::account::Id'];
        instructions: IrohaDataModel['Vec<iroha_data_model::isi::Instruction>'];
        creationTime: IrohaDataModel['u64'];
        timeToLiveMs: IrohaDataModel['u64'];
        metadata: IrohaDataModel['BTreeMap<String, iroha_data_model::Value>'];
    };
    'iroha_data_model::transaction::RejectedTransaction': {
        payload: IrohaDataModel['iroha_data_model::transaction::Payload'];
        signatures: IrohaDataModel['Vec<iroha_crypto::Signature>'];
        rejectionReason: IrohaDataModel['iroha_data_model::events::pipeline::TransactionRejectionReason'];
    };
    'iroha_data_model::transaction::Transaction': {
        payload: IrohaDataModel['iroha_data_model::transaction::Payload'];
        signatures: IrohaDataModel['Vec<iroha_crypto::Signature>'];
    };
    'iroha_data_model::transaction::TransactionValue': Enum<{
        Transaction: Valuable<IrohaDataModel['iroha_data_model::transaction::VersionedTransaction']>;
        RejectedTransaction: Valuable<IrohaDataModel['iroha_data_model::transaction::VersionedRejectedTransaction']>;
    }>;
    'iroha_data_model::transaction::VersionedRejectedTransaction': Enum<{
        V1: Valuable<IrohaDataModel['iroha_data_model::transaction::_VersionedRejectedTransactionV1']>;
    }>;
    'iroha_data_model::transaction::VersionedTransaction': Enum<{
        V1: Valuable<IrohaDataModel['iroha_data_model::transaction::_VersionedTransactionV1']>;
    }>;
    'iroha_data_model::transaction::_VersionedRejectedTransactionV1': [
        IrohaDataModel['iroha_data_model::transaction::RejectedTransaction'],
    ];
    'iroha_data_model::transaction::_VersionedTransactionV1': [
        IrohaDataModel['iroha_data_model::transaction::Transaction'],
    ];
    'iroha_schema::Compact<u128>': IrohaDataModel['compact'];
    'BTreeSet<iroha_data_model::permissions::PermissionToken>': Set<
        IrohaDataModel['iroha_data_model::permissions::PermissionToken']
    >;
};

export const irohaCodec = defNamespace<IrohaDataModel>({
    ...StdCodecs,
    'BTreeMap<String, iroha_data_model::Value>': defMap('str', 'iroha_data_model::Value'),
    'BTreeMap<String, iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>>': defMap(
        'str',
        'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>',
    ),
    'BTreeMap<iroha_data_model::account::Id, iroha_data_model::account::Account>': defMap(
        'iroha_data_model::account::Id',
        'iroha_data_model::account::Account',
    ),
    'BTreeMap<iroha_data_model::asset::DefinitionId, iroha_data_model::asset::AssetDefinitionEntry>': defMap(
        'iroha_data_model::asset::DefinitionId',
        'iroha_data_model::asset::AssetDefinitionEntry',
    ),
    'BTreeMap<iroha_data_model::asset::Id, iroha_data_model::asset::Asset>': defMap(
        'iroha_data_model::asset::Id',
        'iroha_data_model::asset::Asset',
    ),
    'Option<iroha_crypto::Hash>': defOption('iroha_crypto::Hash'),
    'Option<iroha_data_model::events::pipeline::EntityType>': defOption(
        'iroha_data_model::events::pipeline::EntityType',
    ),
    'Option<iroha_data_model::isi::Instruction>': defOption('iroha_data_model::isi::Instruction'),
    String: defAlias('str'),
    'Vec<iroha_crypto::PublicKey>': defVec('iroha_crypto::PublicKey'),
    'Vec<iroha_crypto::Signature>': defVec('iroha_crypto::Signature'),
    'Vec<iroha_data_model::Value>': defVec('iroha_data_model::Value'),
    'Vec<iroha_data_model::isi::Instruction>': defVec('iroha_data_model::isi::Instruction'),
    'Vec<iroha_data_model::permissions::PermissionToken>': defVec('iroha_data_model::permissions::PermissionToken'),
    '[u8; 32]': defBytesArray(32),
    'iroha_crypto::Hash': defTuple(['[u8; 32]']),
    'iroha_crypto::PublicKey': defStruct([
        ['digestFunction', 'str'],
        ['payload', 'Vec<u8>'],
    ]),
    'iroha_crypto::Signature': defStruct([
        ['publicKey', 'iroha_crypto::PublicKey'],
        ['signature', 'Vec<u8>'],
    ]),
    'iroha_data_model::IdBox': defEnum(
        new EnumSchema({
            AccountId: { discriminant: 0 },
            AssetId: { discriminant: 1 },
            AssetDefinitionId: { discriminant: 2 },
            DomainName: { discriminant: 3 },
            PeerId: { discriminant: 4 },
            WorldId: { discriminant: 5 },
        }),
        {
            AccountId: 'iroha_data_model::account::Id',
            AssetId: 'iroha_data_model::asset::Id',
            AssetDefinitionId: 'iroha_data_model::asset::DefinitionId',
            DomainName: 'str',
            PeerId: 'iroha_data_model::peer::Id',
        },
    ),
    'iroha_data_model::IdentifiableBox': defEnum(
        new EnumSchema({
            Account: { discriminant: 0 },
            NewAccount: { discriminant: 1 },
            Asset: { discriminant: 2 },
            AssetDefinition: { discriminant: 3 },
            Domain: { discriminant: 4 },
            Peer: { discriminant: 5 },
            World: { discriminant: 6 },
        }),
        {
            Account: 'iroha_data_model::account::Account',
            NewAccount: 'iroha_data_model::account::NewAccount',
            Asset: 'iroha_data_model::asset::Asset',
            AssetDefinition: 'iroha_data_model::asset::AssetDefinition',
            Domain: 'iroha_data_model::domain::Domain',
            Peer: 'iroha_data_model::peer::Peer',
        },
    ),
    'iroha_data_model::Parameter': defEnum(
        new EnumSchema({
            MaximumFaultyPeersAmount: { discriminant: 0 },
            BlockTime: { discriminant: 1 },
            CommitTime: { discriminant: 2 },
            TransactionReceiptTime: { discriminant: 3 },
        }),
        {
            MaximumFaultyPeersAmount: 'u32',
            BlockTime: 'u128',
            CommitTime: 'u128',
            TransactionReceiptTime: 'u128',
        },
    ),
    'iroha_data_model::Value': defEnum(
        new EnumSchema({
            U32: { discriminant: 0 },
            Bool: { discriminant: 1 },
            String: { discriminant: 2 },
            Vec: { discriminant: 3 },
            Id: { discriminant: 4 },
            Identifiable: { discriminant: 5 },
            PublicKey: { discriminant: 6 },
            Parameter: { discriminant: 7 },
            SignatureCheckCondition: { discriminant: 8 },
            TransactionValue: { discriminant: 9 },
            PermissionToken: { discriminant: 10 },
        }),
        {
            U32: 'u32',
            Bool: 'bool',
            String: 'str',
            Vec: 'Vec<iroha_data_model::Value>',
            Id: 'iroha_data_model::IdBox',
            Identifiable: 'iroha_data_model::IdentifiableBox',
            PublicKey: 'iroha_crypto::PublicKey',
            Parameter: 'iroha_data_model::Parameter',
            SignatureCheckCondition: 'iroha_data_model::account::SignatureCheckCondition',
            TransactionValue: 'iroha_data_model::transaction::TransactionValue',
            PermissionToken: 'iroha_data_model::permissions::PermissionToken',
        },
    ),
    'iroha_data_model::account::Account': defStruct([
        ['id', 'iroha_data_model::account::Id'],
        ['assets', 'BTreeMap<iroha_data_model::asset::Id, iroha_data_model::asset::Asset>'],
        ['signatories', 'Vec<iroha_crypto::PublicKey>'],
        ['permissionTokens', 'BTreeSet<iroha_data_model::permissions::PermissionToken>'],
        ['signatureCheckCondition', 'iroha_data_model::account::SignatureCheckCondition'],
        ['metadata', 'iroha_data_model::metadata::Metadata'],
    ]),
    'iroha_data_model::account::Id': defStruct([
        ['name', 'str'],
        ['domainName', 'str'],
    ]),
    'iroha_data_model::account::NewAccount': defStruct([
        ['id', 'iroha_data_model::account::Id'],
        ['signatories', 'Vec<iroha_crypto::PublicKey>'],
        ['metadata', 'iroha_data_model::metadata::Metadata'],
    ]),
    'iroha_data_model::account::SignatureCheckCondition': defTuple(['iroha_data_model::expression::EvaluatesTo<bool>']),
    'iroha_data_model::asset::Asset': defStruct([
        ['id', 'iroha_data_model::asset::Id'],
        ['value', 'iroha_data_model::asset::AssetValue'],
    ]),
    'iroha_data_model::asset::AssetDefinition': defStruct([
        ['valueType', 'iroha_data_model::asset::AssetValueType'],
        ['id', 'iroha_data_model::asset::DefinitionId'],
    ]),
    'iroha_data_model::asset::AssetDefinitionEntry': defStruct([
        ['definition', 'iroha_data_model::asset::AssetDefinition'],
        ['registeredBy', 'iroha_data_model::account::Id'],
    ]),
    'iroha_data_model::asset::AssetValue': defEnum(
        new EnumSchema({
            Quantity: { discriminant: 0 },
            BigQuantity: { discriminant: 1 },
            Store: { discriminant: 2 },
        }),
        {
            Quantity: 'u32',
            BigQuantity: 'u128',
            Store: 'iroha_data_model::metadata::Metadata',
        },
    ),
    'iroha_data_model::asset::AssetValueType': defEnum(
        new EnumSchema({
            Quantity: { discriminant: 0 },
            BigQuantity: { discriminant: 1 },
            Store: { discriminant: 2 },
        }),
        {},
    ),
    'iroha_data_model::asset::DefinitionId': defStruct([
        ['name', 'str'],
        ['domainName', 'str'],
    ]),
    'iroha_data_model::asset::Id': defStruct([
        ['definitionId', 'iroha_data_model::asset::DefinitionId'],
        ['accountId', 'iroha_data_model::account::Id'],
    ]),
    'iroha_data_model::domain::Domain': defStruct([
        ['name', 'str'],
        ['accounts', 'BTreeMap<iroha_data_model::account::Id, iroha_data_model::account::Account>'],
        [
            'assetDefinitions',
            'BTreeMap<iroha_data_model::asset::DefinitionId, iroha_data_model::asset::AssetDefinitionEntry>',
        ],
    ]),
    'iroha_data_model::events::Event': defEnum(
        new EnumSchema({
            Pipeline: { discriminant: 0 },
            Data: { discriminant: 1 },
        }),
        {
            Pipeline: 'iroha_data_model::events::pipeline::Event',
            Data: 'iroha_data_model::events::data::Event',
        },
    ),
    'iroha_data_model::events::EventFilter': defEnum(
        new EnumSchema({
            Pipeline: { discriminant: 0 },
            Data: { discriminant: 1 },
        }),
        {
            Pipeline: 'iroha_data_model::events::pipeline::EventFilter',
            Data: 'iroha_data_model::events::data::EventFilter',
        },
    ),
    'iroha_data_model::events::EventSocketMessage': defEnum(
        new EnumSchema({
            SubscriptionRequest: { discriminant: 0 },
            SubscriptionAccepted: { discriminant: 1 },
            Event: { discriminant: 2 },
            EventReceived: { discriminant: 3 },
        }),
        {
            SubscriptionRequest: 'iroha_data_model::events::SubscriptionRequest',
            Event: 'iroha_data_model::events::Event',
        },
    ),
    'iroha_data_model::events::SubscriptionRequest': defTuple(['iroha_data_model::events::EventFilter']),
    'iroha_data_model::events::VersionedEventSocketMessage': defEnum(
        new EnumSchema({
            V1: { discriminant: 1 },
        }),
        {
            V1: 'iroha_data_model::events::_VersionedEventSocketMessageV1',
        },
    ),
    'iroha_data_model::events::_VersionedEventSocketMessageV1': defTuple([
        'iroha_data_model::events::EventSocketMessage',
    ]),
    'iroha_data_model::events::data::Event': defTuple([]),
    'iroha_data_model::events::data::EventFilter': defTuple([]),
    'iroha_data_model::events::pipeline::BlockRejectionReason': defEnum(
        new EnumSchema({
            ConsensusBlockRejection: { discriminant: 0 },
        }),
        {},
    ),
    'iroha_data_model::events::pipeline::EntityType': defEnum(
        new EnumSchema({
            Block: { discriminant: 0 },
            Transaction: { discriminant: 1 },
        }),
        {},
    ),
    'iroha_data_model::events::pipeline::Event': defStruct([
        ['entityType', 'iroha_data_model::events::pipeline::EntityType'],
        ['status', 'iroha_data_model::events::pipeline::Status'],
        ['hash', 'iroha_crypto::Hash'],
    ]),
    'iroha_data_model::events::pipeline::EventFilter': defStruct([
        ['entity', 'Option<iroha_data_model::events::pipeline::EntityType>'],
        ['hash', 'Option<iroha_crypto::Hash>'],
    ]),
    'iroha_data_model::events::pipeline::InstructionExecutionFail': defStruct([
        ['instruction', 'iroha_data_model::isi::Instruction'],
        ['reason', 'str'],
    ]),
    'iroha_data_model::events::pipeline::NotPermittedFail': defStruct([['reason', 'str']]),
    'iroha_data_model::events::pipeline::RejectionReason': defEnum(
        new EnumSchema({
            Block: { discriminant: 0 },
            Transaction: { discriminant: 1 },
        }),
        {
            Block: 'iroha_data_model::events::pipeline::BlockRejectionReason',
            Transaction: 'iroha_data_model::events::pipeline::TransactionRejectionReason',
        },
    ),
    'iroha_data_model::events::pipeline::SignatureVerificationFail': defStruct([
        ['signature', 'iroha_crypto::Signature'],
        ['reason', 'str'],
    ]),
    'iroha_data_model::events::pipeline::Status': defEnum(
        new EnumSchema({
            Validating: { discriminant: 0 },
            Rejected: { discriminant: 1 },
            Committed: { discriminant: 2 },
        }),
        {
            Rejected: 'iroha_data_model::events::pipeline::RejectionReason',
        },
    ),
    'iroha_data_model::events::pipeline::TransactionRejectionReason': defEnum(
        new EnumSchema({
            NotPermitted: { discriminant: 0 },
            UnsatisfiedSignatureCondition: { discriminant: 1 },
            InstructionExecution: { discriminant: 2 },
            SignatureVerification: { discriminant: 3 },
            UnexpectedGenesisAccountSignature: { discriminant: 4 },
        }),
        {
            NotPermitted: 'iroha_data_model::events::pipeline::NotPermittedFail',
            UnsatisfiedSignatureCondition: 'iroha_data_model::events::pipeline::UnsatisfiedSignatureConditionFail',
            InstructionExecution: 'iroha_data_model::events::pipeline::InstructionExecutionFail',
            SignatureVerification: 'iroha_data_model::events::pipeline::SignatureVerificationFail',
        },
    ),
    'iroha_data_model::events::pipeline::UnsatisfiedSignatureConditionFail': defStruct([['reason', 'str']]),
    'iroha_data_model::expression::Add': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<u32>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<u32>'],
    ]),
    'iroha_data_model::expression::And': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<bool>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<bool>'],
    ]),
    'iroha_data_model::expression::Contains': defStruct([
        ['collection', 'iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>'],
        ['element', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
    ]),
    'iroha_data_model::expression::ContainsAll': defStruct([
        ['collection', 'iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>'],
        ['elements', 'iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>'],
    ]),
    'iroha_data_model::expression::ContainsAny': defStruct([
        ['collection', 'iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>'],
        ['elements', 'iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>'],
    ]),
    'iroha_data_model::expression::ContextValue': defStruct([['valueName', 'str']]),
    'iroha_data_model::expression::Divide': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<u32>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<u32>'],
    ]),
    'iroha_data_model::expression::Equal': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
    ]),
    'iroha_data_model::expression::EvaluatesTo<alloc::string::String>': defStruct([
        ['expression', 'iroha_data_model::expression::Expression'],
    ]),
    'iroha_data_model::expression::EvaluatesTo<alloc::vec::Vec<iroha_data_model::Value>>': defStruct([
        ['expression', 'iroha_data_model::expression::Expression'],
    ]),
    'iroha_data_model::expression::EvaluatesTo<bool>': defStruct([
        ['expression', 'iroha_data_model::expression::Expression'],
    ]),
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>': defStruct([
        ['expression', 'iroha_data_model::expression::Expression'],
    ]),
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdentifiableBox>': defStruct([
        ['expression', 'iroha_data_model::expression::Expression'],
    ]),
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>': defStruct([
        ['expression', 'iroha_data_model::expression::Expression'],
    ]),
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>': defStruct([
        ['expression', 'iroha_data_model::expression::Expression'],
    ]),
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::DefinitionId>': defStruct([
        ['expression', 'iroha_data_model::expression::Expression'],
    ]),
    'iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::Id>': defStruct([
        ['expression', 'iroha_data_model::expression::Expression'],
    ]),
    'iroha_data_model::expression::EvaluatesTo<u32>': defStruct([
        ['expression', 'iroha_data_model::expression::Expression'],
    ]),
    'iroha_data_model::expression::Expression': defEnum(
        new EnumSchema({
            Add: { discriminant: 0 },
            Subtract: { discriminant: 1 },
            Multiply: { discriminant: 2 },
            Divide: { discriminant: 3 },
            Mod: { discriminant: 4 },
            RaiseTo: { discriminant: 5 },
            Greater: { discriminant: 6 },
            Less: { discriminant: 7 },
            Equal: { discriminant: 8 },
            Not: { discriminant: 9 },
            And: { discriminant: 10 },
            Or: { discriminant: 11 },
            If: { discriminant: 12 },
            Raw: { discriminant: 13 },
            Query: { discriminant: 14 },
            Contains: { discriminant: 15 },
            ContainsAll: { discriminant: 16 },
            ContainsAny: { discriminant: 17 },
            Where: { discriminant: 18 },
            ContextValue: { discriminant: 19 },
        }),
        {
            Add: 'iroha_data_model::expression::Add',
            Subtract: 'iroha_data_model::expression::Subtract',
            Multiply: 'iroha_data_model::expression::Multiply',
            Divide: 'iroha_data_model::expression::Divide',
            Mod: 'iroha_data_model::expression::Mod',
            RaiseTo: 'iroha_data_model::expression::RaiseTo',
            Greater: 'iroha_data_model::expression::Greater',
            Less: 'iroha_data_model::expression::Less',
            Equal: 'iroha_data_model::expression::Equal',
            Not: 'iroha_data_model::expression::Not',
            And: 'iroha_data_model::expression::And',
            Or: 'iroha_data_model::expression::Or',
            If: 'iroha_data_model::expression::If',
            Raw: 'iroha_data_model::Value',
            Query: 'iroha_data_model::query::QueryBox',
            Contains: 'iroha_data_model::expression::Contains',
            ContainsAll: 'iroha_data_model::expression::ContainsAll',
            ContainsAny: 'iroha_data_model::expression::ContainsAny',
            Where: 'iroha_data_model::expression::Where',
            ContextValue: 'iroha_data_model::expression::ContextValue',
        },
    ),
    'iroha_data_model::expression::Greater': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<u32>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<u32>'],
    ]),
    'iroha_data_model::expression::If': defStruct([
        ['condition', 'iroha_data_model::expression::EvaluatesTo<bool>'],
        ['thenExpression', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
        ['elseExpression', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
    ]),
    'iroha_data_model::expression::Less': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<u32>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<u32>'],
    ]),
    'iroha_data_model::expression::Mod': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<u32>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<u32>'],
    ]),
    'iroha_data_model::expression::Multiply': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<u32>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<u32>'],
    ]),
    'iroha_data_model::expression::Not': defStruct([['expression', 'iroha_data_model::expression::EvaluatesTo<bool>']]),
    'iroha_data_model::expression::Or': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<bool>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<bool>'],
    ]),
    'iroha_data_model::expression::RaiseTo': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<u32>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<u32>'],
    ]),
    'iroha_data_model::expression::Subtract': defStruct([
        ['left', 'iroha_data_model::expression::EvaluatesTo<u32>'],
        ['right', 'iroha_data_model::expression::EvaluatesTo<u32>'],
    ]),
    'iroha_data_model::expression::Where': defStruct([
        ['expression', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
        ['values', 'BTreeMap<String, iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>>'],
    ]),
    'iroha_data_model::isi::BurnBox': defStruct([
        ['object', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
        ['destinationId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'],
    ]),
    'iroha_data_model::isi::FailBox': defStruct([['message', 'str']]),
    'iroha_data_model::isi::GrantBox': defStruct([
        ['object', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
        ['destinationId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'],
    ]),
    'iroha_data_model::isi::If': defStruct([
        ['condition', 'iroha_data_model::expression::EvaluatesTo<bool>'],
        ['then', 'iroha_data_model::isi::Instruction'],
        ['otherwise', 'Option<iroha_data_model::isi::Instruction>'],
    ]),
    'iroha_data_model::isi::Instruction': defEnum(
        new EnumSchema({
            Register: { discriminant: 0 },
            Unregister: { discriminant: 1 },
            Mint: { discriminant: 2 },
            Burn: { discriminant: 3 },
            Transfer: { discriminant: 4 },
            If: { discriminant: 5 },
            Pair: { discriminant: 6 },
            Sequence: { discriminant: 7 },
            Fail: { discriminant: 8 },
            SetKeyValue: { discriminant: 9 },
            RemoveKeyValue: { discriminant: 10 },
            Grant: { discriminant: 11 },
        }),
        {
            Register: 'iroha_data_model::isi::RegisterBox',
            Unregister: 'iroha_data_model::isi::UnregisterBox',
            Mint: 'iroha_data_model::isi::MintBox',
            Burn: 'iroha_data_model::isi::BurnBox',
            Transfer: 'iroha_data_model::isi::TransferBox',
            If: 'iroha_data_model::isi::If',
            Pair: 'iroha_data_model::isi::Pair',
            Sequence: 'iroha_data_model::isi::SequenceBox',
            Fail: 'iroha_data_model::isi::FailBox',
            SetKeyValue: 'iroha_data_model::isi::SetKeyValueBox',
            RemoveKeyValue: 'iroha_data_model::isi::RemoveKeyValueBox',
            Grant: 'iroha_data_model::isi::GrantBox',
        },
    ),
    'iroha_data_model::isi::MintBox': defStruct([
        ['object', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
        ['destinationId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'],
    ]),
    'iroha_data_model::isi::Pair': defStruct([
        ['leftInstruction', 'iroha_data_model::isi::Instruction'],
        ['rightInstruction', 'iroha_data_model::isi::Instruction'],
    ]),
    'iroha_data_model::isi::RegisterBox': defStruct([
        ['object', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdentifiableBox>'],
    ]),
    'iroha_data_model::isi::RemoveKeyValueBox': defStruct([
        ['objectId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'],
        ['key', 'iroha_data_model::expression::EvaluatesTo<alloc::string::String>'],
    ]),
    'iroha_data_model::isi::SequenceBox': defStruct([['instructions', 'Vec<iroha_data_model::isi::Instruction>']]),
    'iroha_data_model::isi::SetKeyValueBox': defStruct([
        ['objectId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'],
        ['key', 'iroha_data_model::expression::EvaluatesTo<alloc::string::String>'],
        ['value', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
    ]),
    'iroha_data_model::isi::TransferBox': defStruct([
        ['sourceId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'],
        ['object', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>'],
        ['destinationId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'],
    ]),
    'iroha_data_model::isi::UnregisterBox': defStruct([
        ['objectId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::IdBox>'],
    ]),
    'iroha_data_model::metadata::Metadata': defStruct([['map', 'BTreeMap<String, iroha_data_model::Value>']]),
    'iroha_data_model::peer::Id': defStruct([
        ['address', 'str'],
        ['publicKey', 'iroha_crypto::PublicKey'],
    ]),
    'iroha_data_model::peer::Peer': defStruct([['id', 'iroha_data_model::peer::Id']]),
    'iroha_data_model::permissions::PermissionToken': defStruct([
        ['name', 'str'],
        ['params', 'BTreeMap<String, iroha_data_model::Value>'],
    ]),
    'iroha_data_model::query::Payload': defStruct([
        ['timestampMs', 'iroha_schema::Compact<u128>'],
        ['query', 'iroha_data_model::query::QueryBox'],
        ['accountId', 'iroha_data_model::account::Id'],
    ]),
    'iroha_data_model::query::QueryBox': defEnum(
        new EnumSchema({
            FindAllAccounts: { discriminant: 0 },
            FindAccountById: { discriminant: 1 },
            FindAccountKeyValueByIdAndKey: { discriminant: 2 },
            FindAccountsByName: { discriminant: 3 },
            FindAccountsByDomainName: { discriminant: 4 },
            FindAllAssets: { discriminant: 5 },
            FindAllAssetsDefinitions: { discriminant: 6 },
            FindAssetById: { discriminant: 7 },
            FindAssetsByName: { discriminant: 8 },
            FindAssetsByAccountId: { discriminant: 9 },
            FindAssetsByAssetDefinitionId: { discriminant: 10 },
            FindAssetsByDomainName: { discriminant: 11 },
            FindAssetsByDomainNameAndAssetDefinitionId: { discriminant: 12 },
            FindAssetQuantityById: { discriminant: 13 },
            FindAssetKeyValueByIdAndKey: { discriminant: 14 },
            FindAllDomains: { discriminant: 15 },
            FindDomainByName: { discriminant: 16 },
            FindAllPeers: { discriminant: 17 },
            FindTransactionsByAccountId: { discriminant: 18 },
            FindPermissionTokensByAccountId: { discriminant: 19 },
        }),
        {
            FindAllAccounts: 'iroha_data_model::query::account::FindAllAccounts',
            FindAccountById: 'iroha_data_model::query::account::FindAccountById',
            FindAccountKeyValueByIdAndKey: 'iroha_data_model::query::account::FindAccountKeyValueByIdAndKey',
            FindAccountsByName: 'iroha_data_model::query::account::FindAccountsByName',
            FindAccountsByDomainName: 'iroha_data_model::query::account::FindAccountsByDomainName',
            FindAllAssets: 'iroha_data_model::query::asset::FindAllAssets',
            FindAllAssetsDefinitions: 'iroha_data_model::query::asset::FindAllAssetsDefinitions',
            FindAssetById: 'iroha_data_model::query::asset::FindAssetById',
            FindAssetsByName: 'iroha_data_model::query::asset::FindAssetsByName',
            FindAssetsByAccountId: 'iroha_data_model::query::asset::FindAssetsByAccountId',
            FindAssetsByAssetDefinitionId: 'iroha_data_model::query::asset::FindAssetsByAssetDefinitionId',
            FindAssetsByDomainName: 'iroha_data_model::query::asset::FindAssetsByDomainName',
            FindAssetsByDomainNameAndAssetDefinitionId:
                'iroha_data_model::query::asset::FindAssetsByDomainNameAndAssetDefinitionId',
            FindAssetQuantityById: 'iroha_data_model::query::asset::FindAssetQuantityById',
            FindAssetKeyValueByIdAndKey: 'iroha_data_model::query::asset::FindAssetKeyValueByIdAndKey',
            FindAllDomains: 'iroha_data_model::query::domain::FindAllDomains',
            FindDomainByName: 'iroha_data_model::query::domain::FindDomainByName',
            FindAllPeers: 'iroha_data_model::query::peer::FindAllPeers',
            FindTransactionsByAccountId: 'iroha_data_model::query::transaction::FindTransactionsByAccountId',
            FindPermissionTokensByAccountId: 'iroha_data_model::query::permissions::FindPermissionTokensByAccountId',
        },
    ),
    'iroha_data_model::query::QueryResult': defTuple(['iroha_data_model::Value']),
    'iroha_data_model::query::SignedQueryRequest': defStruct([
        ['payload', 'iroha_data_model::query::Payload'],
        ['signature', 'iroha_crypto::Signature'],
    ]),
    'iroha_data_model::query::VersionedQueryResult': defEnum(
        new EnumSchema({
            V1: { discriminant: 1 },
        }),
        {
            V1: 'iroha_data_model::query::_VersionedQueryResultV1',
        },
    ),
    'iroha_data_model::query::VersionedSignedQueryRequest': defEnum(
        new EnumSchema({
            V1: { discriminant: 1 },
        }),
        {
            V1: 'iroha_data_model::query::_VersionedSignedQueryRequestV1',
        },
    ),
    'iroha_data_model::query::_VersionedQueryResultV1': defTuple(['iroha_data_model::query::QueryResult']),
    'iroha_data_model::query::_VersionedSignedQueryRequestV1': defTuple([
        'iroha_data_model::query::SignedQueryRequest',
    ]),
    'iroha_data_model::query::account::FindAccountById': defStruct([
        ['id', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>'],
    ]),
    'iroha_data_model::query::account::FindAccountKeyValueByIdAndKey': defStruct([
        ['id', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>'],
        ['key', 'iroha_data_model::expression::EvaluatesTo<alloc::string::String>'],
    ]),
    'iroha_data_model::query::account::FindAccountsByDomainName': defStruct([
        ['domainName', 'iroha_data_model::expression::EvaluatesTo<alloc::string::String>'],
    ]),
    'iroha_data_model::query::account::FindAccountsByName': defStruct([
        ['name', 'iroha_data_model::expression::EvaluatesTo<alloc::string::String>'],
    ]),
    'iroha_data_model::query::account::FindAllAccounts': defStruct([]),
    'iroha_data_model::query::asset::FindAllAssets': defStruct([]),
    'iroha_data_model::query::asset::FindAllAssetsDefinitions': defStruct([]),
    'iroha_data_model::query::asset::FindAssetById': defStruct([
        ['id', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::Id>'],
    ]),
    'iroha_data_model::query::asset::FindAssetKeyValueByIdAndKey': defStruct([
        ['id', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::Id>'],
        ['key', 'iroha_data_model::expression::EvaluatesTo<alloc::string::String>'],
    ]),
    'iroha_data_model::query::asset::FindAssetQuantityById': defStruct([
        ['id', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::Id>'],
    ]),
    'iroha_data_model::query::asset::FindAssetsByAccountId': defStruct([
        ['accountId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>'],
    ]),
    'iroha_data_model::query::asset::FindAssetsByAssetDefinitionId': defStruct([
        ['assetDefinitionId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::DefinitionId>'],
    ]),
    'iroha_data_model::query::asset::FindAssetsByDomainName': defStruct([
        ['domainName', 'iroha_data_model::expression::EvaluatesTo<alloc::string::String>'],
    ]),
    'iroha_data_model::query::asset::FindAssetsByDomainNameAndAssetDefinitionId': defStruct([
        ['domainName', 'iroha_data_model::expression::EvaluatesTo<alloc::string::String>'],
        ['assetDefinitionId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::asset::DefinitionId>'],
    ]),
    'iroha_data_model::query::asset::FindAssetsByName': defStruct([
        ['name', 'iroha_data_model::expression::EvaluatesTo<alloc::string::String>'],
    ]),
    'iroha_data_model::query::domain::FindAllDomains': defStruct([]),
    'iroha_data_model::query::domain::FindDomainByName': defStruct([
        ['name', 'iroha_data_model::expression::EvaluatesTo<alloc::string::String>'],
    ]),
    'iroha_data_model::query::peer::FindAllPeers': defStruct([]),
    'iroha_data_model::query::permissions::FindPermissionTokensByAccountId': defStruct([
        ['id', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>'],
    ]),
    'iroha_data_model::query::transaction::FindTransactionsByAccountId': defStruct([
        ['accountId', 'iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>'],
    ]),
    'iroha_data_model::transaction::Payload': defStruct([
        ['accountId', 'iroha_data_model::account::Id'],
        ['instructions', 'Vec<iroha_data_model::isi::Instruction>'],
        ['creationTime', 'u64'],
        ['timeToLiveMs', 'u64'],
        ['metadata', 'BTreeMap<String, iroha_data_model::Value>'],
    ]),
    'iroha_data_model::transaction::RejectedTransaction': defStruct([
        ['payload', 'iroha_data_model::transaction::Payload'],
        ['signatures', 'Vec<iroha_crypto::Signature>'],
        ['rejectionReason', 'iroha_data_model::events::pipeline::TransactionRejectionReason'],
    ]),
    'iroha_data_model::transaction::Transaction': defStruct([
        ['payload', 'iroha_data_model::transaction::Payload'],
        ['signatures', 'Vec<iroha_crypto::Signature>'],
    ]),
    'iroha_data_model::transaction::TransactionValue': defEnum(
        new EnumSchema({
            Transaction: { discriminant: 0 },
            RejectedTransaction: { discriminant: 1 },
        }),
        {
            Transaction: 'iroha_data_model::transaction::VersionedTransaction',
            RejectedTransaction: 'iroha_data_model::transaction::VersionedRejectedTransaction',
        },
    ),
    'iroha_data_model::transaction::VersionedRejectedTransaction': defEnum(
        new EnumSchema({
            V1: { discriminant: 1 },
        }),
        {
            V1: 'iroha_data_model::transaction::_VersionedRejectedTransactionV1',
        },
    ),
    'iroha_data_model::transaction::VersionedTransaction': defEnum(
        new EnumSchema({
            V1: { discriminant: 1 },
        }),
        {
            V1: 'iroha_data_model::transaction::_VersionedTransactionV1',
        },
    ),
    'iroha_data_model::transaction::_VersionedRejectedTransactionV1': defTuple([
        'iroha_data_model::transaction::RejectedTransaction',
    ]),
    'iroha_data_model::transaction::_VersionedTransactionV1': defTuple(['iroha_data_model::transaction::Transaction']),
    'iroha_schema::Compact<u128>': defAlias('compact'),
    'BTreeSet<iroha_data_model::permissions::PermissionToken>': defSet(
        'iroha_data_model::permissions::PermissionToken',
    ),
});
