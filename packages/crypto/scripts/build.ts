import { series } from 'gulp';

import { build_interfaces } from './build-interfaces';
import { build_wasm } from './build-wasm';

export default series(build_wasm, build_interfaces);
