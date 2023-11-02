import { datamodel } from './model'

export const instructions = (isis: datamodel.InstructionExpr | datamodel.InstructionExpr[]): datamodel.Executable =>
  datamodel.Executable('Instructions', datamodel.VecInstructionExpr(Array.isArray(isis) ? isis : [isis]))
