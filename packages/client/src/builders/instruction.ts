import model from './model'

export const register = (identifiable: model.IdentifiableBox): model.Instruction =>
  model.Instruction(
    'Register',
    model.RegisterBox({
      object: model.EvaluatesToRegistrableBox({
        expression: model.Expression('Raw', model.Value('Identifiable', identifiable)),
      }),
    }),
  )

export const mint = (object: model.Value, destination: model.IdBox): model.Instruction =>
  model.Instruction(
    'Mint',
    model.MintBox({
      object: model.EvaluatesToValue({ expression: model.Expression('Raw', object) }),
      destination_id: model.EvaluatesToIdBox({
        expression: model.Expression('Raw', model.Value('Id', destination)),
      }),
    }),
  )

export const transfer = (source: model.IdBox, object: model.Value, destination: model.IdBox): model.Instruction =>
  model.Instruction(
    'Transfer',
    model.TransferBox({
      source_id: model.EvaluatesToIdBox({
        expression: model.Expression('Raw', model.Value('Id', source)),
      }),
      destination_id: model.EvaluatesToIdBox({
        expression: model.Expression('Raw', model.Value('Id', destination)),
      }),
      object: model.EvaluatesToValue({ expression: model.Expression('Raw', object) }),
    }),
  )
