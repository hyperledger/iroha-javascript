import { datamodel } from './model'

export const pipeline = (opts?: {
  entityKind?: 'Transaction' | 'Block'
  statusKind?: 'Validating' | 'Rejected' | 'Committed'
  hash?: datamodel.Hash
}): datamodel.FilterBox =>
  datamodel.FilterBox(
    'Pipeline',
    datamodel.PipelineEventFilter({
      entity_kind: opts?.entityKind
        ? datamodel.OptionPipelineEntityKind('Some', datamodel.PipelineEntityKind(opts.entityKind))
        : datamodel.OptionPipelineEntityKind('None'),
      status_kind: opts?.statusKind
        ? datamodel.OptionPipelineStatusKind('Some', datamodel.PipelineStatusKind(opts.statusKind))
        : datamodel.OptionPipelineStatusKind('None'),
      hash: opts?.hash ? datamodel.OptionHash('Some', opts.hash) : datamodel.OptionHash('None'),
    }),
  )
