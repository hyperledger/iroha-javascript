# @iroha2/data-model

## 2.0.2

### Patch Changes

- fbe19e9: **docs**: update versions table in README, chores

## 2.0.1

### Patch Changes

- ff266d3: Update `@scale-codec/*` version that uses correct `.mjs` ext for ESM bundles
- Updated dependencies [ff266d3]
  - @iroha2/i64-fixnum@0.4.1

## 2.0.0

### Minor Changes

- a99d219: **fix!**: define `exports` field; use `*.cjs` extension for `require()` imports and `*.mjs` for `import`

### Patch Changes

- Updated dependencies [a99d219]
  - @iroha2/i64-fixnum@0.4.0

## 1.4.0

### Minor Changes

- 5439042: **feat**: update data model according to Iroha `2.0.0-pre-rc.6-lts` (`75da907f66d5270f407a50e06bc76cec41d3d409`)

## 1.3.0

### Minor Changes

- bdddf78: **breaking**: update and data-model accordingly to Iroha 2 RC 5 (`43be45fc7fb7b0bd73f87b4fef167d61680c8e1e`)

## 1.2.1

### Patch Changes

- 49c8451: chore: include only necessary files into `files` field in the `package.json`
- Updated dependencies [49c8451]
  - @iroha2/i64-fixnum@0.3.1

## 1.2.0

### Minor Changes

- update data model according to Iroha 2 RC 4 (`d00e0a9172d2a887a97f504796db5f2e05939c10`)

## 1.1.0

### Minor Changes

- a453fcd: update data model according to Iroha 2 RC 3 (`8d83a3eff33f29b49004a0a5efe643b10f0f256e`)
- a453fcd: **BREAKING** - change schema names normalization and align it more to `iroha_data_model::prelude` namespace normalization.

  List of changes:

  | Before                    | After                      |
  | ------------------------- | -------------------------- |
  | `DefinitionId`            | `AssetDefinitionId`        |
  | `Id`                      | `DomainId`                 |
  | `EntityType`              | `PipelineEntityType`       |
  | ...and `OptionEntityType` | `OptionPipelineEntityType` |
  | `Status`                  | `PipelineStatus`           |
  | `ExpressionIf`            | `IfExpression`             |
  | `IsiIf`                   | `IfInstruction`            |

  ...and some others.

- e34f8a5: **BREAKING**: `BTreeSet` now is not an `Array`, but a `Set`

## 1.0.0

### Major Changes

- b86aa76: **feat**: compile Iroha Data Model accordingly to `iroha v2.0.0-pre-rc.2` (`920e4d12754b0f3bf08cbaa5221d91c27863fcdc`)

## 0.5.0

### Minor Changes

- 98d3638: update data model & bump scale runtime version

### Patch Changes

- 92c5a9a: Add library top-level short documentation
- Updated dependencies [33a58c5]
- Updated dependencies [92c5a9a]
- Updated dependencies [92c5a9a]
  - @iroha2/i64-fixnum@0.3.0

## 0.4.0

### Minor Changes

- c59c85b: **Breaking:** update data model generation approach & usage with updated SCALE codec kit

### Patch Changes

- Updated dependencies [c59c85b]
  - @iroha2/i64-fixnum@0.2.0

## 0.3.0

### Minor Changes

- 0a583c2: breaking: re-generate data model with some optimizations and updated compiler
- 0a583c2: deps: update `@scale-codec/*` deps

### Patch Changes

- Updated dependencies [0a583c2]
  - @iroha2/i64-fixnum@0.1.3

## 0.2.1

### Patch Changes

- 1833de7: Fix package.json, bump version of definition runtime with correct export of `jsbi` stuff
- Updated dependencies [1833de7]
  - @iroha2/i64-fixnum@0.1.2
