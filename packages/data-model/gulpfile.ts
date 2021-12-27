import { series } from 'gulp';
import compile_json from './scripts/compile-json';
import generate from './scripts/generate';

export const gen = series(compile_json, generate);

export { compile_json, generate };
