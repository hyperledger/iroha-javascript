import model from "@iroha2/client/builders/model";

export const raw = (value: model.Value): model.Expression => model.Expression('Raw', value)