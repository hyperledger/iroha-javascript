import model from './model'

export const instructions = (isis: model.Instruction | model.Instruction[]): model.Executable =>
  model.Executable('Instructions', model.VecInstruction(Array.isArray(isis) ? isis : [isis]))
