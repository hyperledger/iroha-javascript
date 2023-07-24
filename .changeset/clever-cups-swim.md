---
'@iroha2/data-model': major
---

**feat!**: enhance schema transformation.

- Support new schema format
- Remove null aliases. Mostly, it simplifies `QueryBox` enum, e.g. instead of `QueryBox('FindAllAccounts', null)` it is now enough to write `QueryBox('FindAllAccounts')`
- Filter several single-field structures in order to avoid extra nesting. Includes:
    - `EvaluatesTo<..>`
    - `SignaturesOf<..>`
- Simplify `HashOf<..>` to `Hash`
- Handle `NonZero<..>` integers properly
