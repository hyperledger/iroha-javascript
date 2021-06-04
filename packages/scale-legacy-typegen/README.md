# @iroha/scale-codec-legacy-typegen

This is the cutted and minor re-worked version of `@polkadot/typegen`.

### Usage

This package exports only one function:

```ts
export declare function generateInterfacesByDefinitions(opts: {
    /**
     * @description path to the lib with scale codec implementation, like 'scale-codec'.
     * This'll be embedded in final script string
     */
    scaleLibEmbedName: string;

    /**
     * @description definitions of types
     */
    definitions: DefinitionsTypes;

    /**
     * @description name of the interface that will be exported and will be a map of all
     * generated interfaces - it will be useful for helpers
     */
    constructorDefInterfaceName: string;
}): string;
```

For example, for this call:

```ts
generateInterfacesByDefinitions({
    scaleLibEmbedName: 'my-awesome-scale-lib',
    constructorDefInterfaceName: 'MyAwesomeGeneratedInterfaces',
    definitions: {
        Account: {
            id: 'AccountId',
            assets: 'BTreeMap<AssetId,Asset>',
            signatories: 'Vec<PublicKey>',
            permissionTokens: 'BTreeSet<PermissionToken>',
            signatureCheckCondition: 'SignatureCheckCondition',
            metadata: 'Metadata',
        },
        AccountId: {
            name: 'Text',
            domainName: 'Text',
        },
        Add: {
            left: 'EvaluatesTo',
            right: 'EvaluatesTo',
        },
    },
});
```

The result will be like this (maybe not so pretty):

```ts
import { Vec, BTreeMap, BTreeSet } from 'my-awesome-scale-lib';

/* eslint-disable */

/** @name Account */
export interface Account extends Struct {
    readonly id: AccountId;
    readonly assets: BTreeMap<AssetId, Asset>;
    readonly signatories: Vec<PublicKey>;
    readonly permissionTokens: BTreeSet<PermissionToken>;
    readonly signatureCheckCondition: SignatureCheckCondition;
    readonly metadata: Metadata;
}

/** @name AccountId */
export interface AccountId extends Struct {
    readonly name: Text;
    readonly domainName: Text;
}

/** @name Add */
export interface Add extends Struct {
    readonly left: EvaluatesTo;
    readonly right: EvaluatesTo;
}

export interface MyAwesomeGeneratedInterfaces {
    Account: Account;
    AccountId: AccountId;
    Add: Add;
}
```

> Note that it returns the `string` of TypeScript code. You can do anything you wish with that.
