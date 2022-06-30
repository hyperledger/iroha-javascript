# Integration tests of Iroha Client

- [`test-node`](./test-node/) contains specs to run them with `test:node` command
- [`test-web`](./test-web/) contains a package with a Vite App and Cypress tests around it to run it all with `test:web` command

**Important**: Do not run tests in parallel, because each test starts its own peer.
