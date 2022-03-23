import { series } from 'gulp'

import { build_target_entries } from './build-target-entries'
import { build_wasm } from './build-wasm'

export default series(build_wasm, build_target_entries)
