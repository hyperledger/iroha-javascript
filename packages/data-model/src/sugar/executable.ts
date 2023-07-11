import { datamodel } from './model'

export const instructions = (isis: datamodel.Instruction | datamodel.Instruction[]): datamodel.Executable =>
  datamodel.Executable('Instructions', datamodel.VecInstruction(Array.isArray(isis) ? isis : [isis]))
