import { datamodel } from './model'

export const register = (identifiable: datamodel.IdentifiableBox): datamodel.InstructionExpr =>
  datamodel.InstructionExpr(
    'Register',
    datamodel.RegisterExpr({
      object: datamodel.Expression('Raw', datamodel.Value('Identifiable', identifiable)),
    }),
  )

export const mint = (object: datamodel.Value, destination: datamodel.IdBox): datamodel.InstructionExpr =>
  datamodel.InstructionExpr(
    'Mint',
    datamodel.MintExpr({
      object: datamodel.Expression('Raw', object),
      destination_id: datamodel.Expression('Raw', datamodel.Value('Id', destination)),
    }),
  )

export const transfer = (
  source: datamodel.IdBox,
  object: datamodel.Value,
  destination: datamodel.IdBox,
): datamodel.InstructionExpr =>
  datamodel.InstructionExpr(
    'Transfer',
    datamodel.TransferExpr({
      source_id: datamodel.Expression('Raw', datamodel.Value('Id', source)),
      destination_id: datamodel.Expression('Raw', datamodel.Value('Id', destination)),
      object: datamodel.Expression('Raw', object),
    }),
  )
