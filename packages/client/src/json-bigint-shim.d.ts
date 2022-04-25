declare module 'json-bigint/lib/parse' {
  interface Options {
    useNativeBigInt?: boolean
  }

  declare function factory(opts?: Options): (text: string) => any

  export default factory
}
