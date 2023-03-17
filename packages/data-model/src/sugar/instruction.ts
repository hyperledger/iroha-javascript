import { datamodel } from './model'

export const register = (identifiable: datamodel.IdentifiableBox): datamodel.Instruction =>
  datamodel.Instruction(
    'Register',
    datamodel.RegisterBox({
      object: datamodel.EvaluatesToRegistrableBox({
        expression: datamodel.Expression('Raw', datamodel.Value('Identifiable', identifiable)),
      }),
    }),
  )

export const mint = (object: datamodel.Value, destination: datamodel.IdBox): datamodel.Instruction =>
  datamodel.Instruction(
    'Mint',
    datamodel.MintBox({
      object: datamodel.EvaluatesToValue({ expression: datamodel.Expression('Raw', object) }),
      destination_id: datamodel.EvaluatesToIdBox({
        expression: datamodel.Expression('Raw', datamodel.Value('Id', destination)),
      }),
    }),
  )

export const transfer = (
  source: datamodel.IdBox,
  object: datamodel.Value,
  destination: datamodel.IdBox,
): datamodel.Instruction =>
  datamodel.Instruction(
    'Transfer',
    datamodel.TransferBox({
      source_id: datamodel.EvaluatesToIdBox({
        expression: datamodel.Expression('Raw', datamodel.Value('Id', source)),
      }),
      destination_id: datamodel.EvaluatesToIdBox({
        expression: datamodel.Expression('Raw', datamodel.Value('Id', destination)),
      }),
      object: datamodel.EvaluatesToValue({ expression: datamodel.Expression('Raw', object) }),
    }),
  )
