---
title: Using .env files
---

## Using .env files

[DotEnv](https://github.com/mrsteele/dotenv-webpack) is pre-configured to allow defining environment variables available during runtime. You can create a `.env` file in your project root and define values that will be available to your app during runtime.

In case you need multiple environments, you can create additional env files with the naming convention of `.env.<name>` (e.g. `.env.prod`, `.env.staging`).

The following logic is used when loading environment files:

- `.env` is loaded by default if found
- `.env.<name>` is loaded when `--env.env=<name>` is passed to the build/run command and `.env.<name>` exists, otherwise it falls back to loading `.env` (if found)

### Example .env and .env.prod files

```bash
# example .env file
MY_API_ENDPOINT=https://staging-api-host/api/v2
MY_API_SECRET=supersecrettoken
```

<!--  -->

```bash
# example .env.prod file
MY_API_ENDPOINT=https://production-api-host/api/v2
MY_API_SECRET=verysuperverysecretverytoken
```

<!--  -->

```ts
// example usage - loaded from .env by default
console.log(process.env.MY_API_ENDPOINT) // https://staging-api-host/api/v2
console.log(process.env.MY_API_SECRET) // supersecrettoken

// --env.env=prod: loaded from .env.prod
console.log(process.env.MY_API_ENDPOINT) // https://production-api-host/api/v2
console.log(process.env.MY_API_SECRET) // verysuperverysecretverytoken

// --env.env=nonexistent: falls back to .env
console.log(process.env.MY_API_ENDPOINT) // https://staging-api-host/api/v2
console.log(process.env.MY_API_SECRET) // supersecrettoken
```

::: warning Note

Please note that the way DotEnv works is it's using the webpack [DefinePlugin](#extending-the-defineplugin-options) internally to define the `process.env.<x>` values, meaning they are essentially statically replaced in the bundled code. This is important to keep in mind because destructuring, looping etc over `process` or `process.env` is not possible.

See details about the limitations in the [DotEnv documentation](https://github.com/mrsteele/dotenv-webpack#limitations)

:::
