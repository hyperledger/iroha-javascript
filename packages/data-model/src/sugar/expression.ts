import model from './model'

export const raw = (value: model.Value): model.Expression => model.Expression('Raw', value)
