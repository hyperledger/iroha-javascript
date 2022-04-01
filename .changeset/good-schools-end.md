---
'@iroha2/data-model': minor
---

**BREAKING** - change schema names normalization and align it more to `iroha_data_model::prelude` namespace normalization.

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
