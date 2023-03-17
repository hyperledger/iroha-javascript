import model from './model'

export const pipeline = (opts?: {
  entityKind?: 'Transaction' | 'Block'
  statusKind?: 'Validating' | 'Rejected' | 'Committed'
  hash?: model.Hash
}): model.FilterBox =>
  model.FilterBox(
    'Pipeline',
    model.PipelineEventFilter({
      entity_kind: opts?.entityKind
        ? model.OptionPipelineEntityKind('Some', model.PipelineEntityKind(opts.entityKind))
        : model.OptionPipelineEntityKind('None'),
      status_kind: opts?.statusKind
        ? model.OptionPipelineStatusKind('Some', model.PipelineStatusKind(opts.statusKind))
        : model.OptionPipelineStatusKind('None'),
      hash: opts?.hash ? model.OptionHash('Some', opts.hash) : model.OptionHash('None'),
    }),
  )
