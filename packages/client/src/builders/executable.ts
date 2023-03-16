import model from './model'

export const instructions = (isis: model.Instruction[]): model.Executable =>
  model.Executable('Instructions', model.VecInstruction(isis))

export const instruction = (isi: model.Instruction) => instructions([isi])
