# Integration tests of Iroha Client

`test-node` dir contains jest specs to run them with `test:node` command.

`test-web` dir contains a package with a Vite App and some Cypress tests around it to run it all with `test:web` command.

**Do not run tests in parallel**, because each test starts its own peer.
