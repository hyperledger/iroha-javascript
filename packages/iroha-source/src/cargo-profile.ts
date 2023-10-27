export const PROFILE = 'js_sdk'

// References:
// - Profiles https://doc.rust-lang.org/cargo/reference/profiles.html
// - Env Vars https://doc.rust-lang.org/cargo/reference/environment-variables.html
export const PROFILE_ENV: Record<string, string> = full({
  inherits: 'release',
  // disable some optimisations
  opt_level: 2,
  // unwinding is not needed for JS SDK tests
  panic: 'abort',
})

function full(short: Record<string, string | number | boolean>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(short).map(([key, value]) => [
      `CARGO_PROFILE_${PROFILE.toUpperCase()}_${key.toUpperCase()}`,
      String(value),
    ]),
  )
}
