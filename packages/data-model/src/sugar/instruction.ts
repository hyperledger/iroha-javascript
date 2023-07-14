import { datamodel } from './model'

export const register = (identifiable: datamodel.IdentifiableBox): datamodel.InstructionBox =>
  datamodel.InstructionBox(
    'Register',
    datamodel.RegisterBox({
      object: datamodel.Expression('Raw', datamodel.Value('Identifiable', identifiable)),
    }),
  )

export const mint = (object: datamodel.Value, destination: datamodel.IdBox): datamodel.InstructionBox =>
  datamodel.InstructionBox(
    'Mint',
    datamodel.MintBox({
      object: datamodel.Expression('Raw', object),
      destination_id: datamodel.Expression('Raw', datamodel.Value('Id', destination)),
    }),
  )

export const transfer = (
  source: datamodel.IdBox,
  object: datamodel.Value,
  destination: datamodel.IdBox,
): datamodel.InstructionBox =>
  datamodel.InstructionBox(
    'Transfer',
    datamodel.TransferBox({
      source_id: datamodel.Expression('Raw', datamodel.Value('Id', source)),
      destination_id: datamodel.Expression('Raw', datamodel.Value('Id', destination)),
      object: datamodel.Expression('Raw', object),
    }),
  )
