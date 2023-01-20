# iroha-crypto Rust sources

## How this is built

TODO describe the pipeline

## Interfaces rules

**Don't expose ownership model implicitly**

It is not visible from JS side. Prefer always to borrow structs.

```rust
#[wasm_bindgen]
pub struct User {
    name: String
}

// WRONG
// `user` will be freed after invocation of this function so
// any usage of related object on JS side after this will be
// incorrect
#[wasm_bindgen]
pub fn get_user_name(user: User) -> String {
    user.name
}

// GOOD
#[wasm_bindgen]
pub fn get_user_name(user: &User) -> String {
    user.name.clone()
}
```

**Avoid "static" class methods**

Classes are the thing that is hard to type in TypeScript. When you write code like this:

```rust
#[wasm_bindgen]
pub struct User {
    name: String
}

#[wasm_bindgen]
impl User {
    #[wasm_bindgen(constructor)]
    pub fn new(name: String) -> User {
        User { name }
    }

    pub fn with_empty_name() -> User {
        User::new("".to_owned())
    }

    pub fn get_name(&self) -> String {
        self.name.clone()
    }
}
```

It transforms into such class:

```ts
declare class User {
  constructor(name: string)

  static with_empty_name(): User

  get_name(): string
}
```

The problem is that library have to expose universal API interface for each target and it is decoupled from implementation, but classes are always a mix of runtime and types sides. Also it has 2 type sides: static type and instance type. It is hard to pack it all in `IrohaCryptoInterface`, so I decided to move all static methods away from classes and leave there only instance methods. So, do like this:

```rust
#[wasm_bindgen]
pub struct User {
    name: String
}

#[wasm_bindgen]
pub fn new_user(name: String) -> User {
    User { name }
}

#[wasm_bindgen]
pub fn user_with_empty_name() -> User {
    User::new("".to_owned())
}

#[wasm_bindgen]
impl User {
    pub fn get_name(&self) -> String {
        self.name.clone()
    }
}
```
