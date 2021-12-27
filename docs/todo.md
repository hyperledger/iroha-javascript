# ToDo

-   Align recipes with the recipes for Iroha 2 Rust Client
-   Design `TransactionBuilder` helper, refactor client for it
-   Make `Client` more opinionated, e.g.:
    -   Inject a key pair into the client instead of passing it to transaction/query entrypoint each time
    -   Inject an account id into the cliean instead of inserting it each time when it needed
