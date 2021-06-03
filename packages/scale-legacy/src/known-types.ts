export * from './primitive';
export * from './codec';

import * as primitive from './primitive';
import * as codec from './codec';
// import { ConstructorDef } from './types';

// const { BitVec, ...CODEC_PRIMITIVES } = primitive;
// export const DEFAULT_SCALE_TYPES = { ...codec, ...CODEC_PRIMITIVES };

// import {

// } from './primitive'

export const DEFAULT_CODECS = {
    ...primitive,
    ...codec,
};

// export type DefaultScaleTypes = typeof DEFAULT_SCALE_TYPES;
