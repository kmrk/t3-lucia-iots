## Derived from create-t3-turbo
Boilerplate that makes t3-turbo easy to use (with my non-vercle-cloud side-projects)
  - nextjs
  - expo
  - trpc
  - drizzle
  - ~~authjs~~ -> lucia
  - ~~zod~~ -> io-ts
  - ~~pnpm~~ -> bun
  - ~~turbo~~
  - remove env config and validations
  - add some docker config for local-dev
  - remove some scripts command


## Using
  - clone project
  - replace `@acme` with own app-ns
  - init db & init caddy (optional)
    - init postgres with docker
    - init caddy with docker // for user upload file's static serve
  - bun db:sync //generate lucia-auth tables
  - bun web:dev
