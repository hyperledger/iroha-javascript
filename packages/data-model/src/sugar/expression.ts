import { datamodel } from './model'

export const raw = (value: datamodel.Value): datamodel.Expression => datamodel.Expression('Raw', value)
