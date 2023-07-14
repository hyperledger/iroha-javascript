import { datamodel } from './model'

export const instructions = (isis: datamodel.InstructionBox | datamodel.InstructionBox[]): datamodel.Executable =>
  datamodel.Executable('Instructions', datamodel.VecInstructionBox(Array.isArray(isis) ? isis : [isis]))
