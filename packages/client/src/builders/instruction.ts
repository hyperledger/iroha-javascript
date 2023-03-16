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

/**
 * FIXME shouldn't it be more opinionated?
 */
export const mint = (box: model.MintBox): model.Instruction => model.Instruction('Mint', box)
