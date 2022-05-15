## How to use it?

### Using `create-next-app`

Execute
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
with [npm](https://docs.npmjs.com/cli/init) or
[Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-typescript with-typescript-app
# or
yarn create next-app --example with-typescript with-typescript-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/vercel/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-typescript
cd with-typescript
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

## Notes

This example shows how to integrate the TypeScript type system into Next.js.
Since TypeScript is supported out of the box with Next.js, all we have to do is
to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and
Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts`
or `.tsx` files in our project and builds it. It even automatically creates a
`tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for
Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's
`tsc` CLI in `noEmit` mode to run type-checking separately. You can then include
this, for example, in your `test` scripts.

## Firebase

`yarn add firebase firebase-tools`

`npm install -g firebase-tools`

`firebase login`

`firebase init`

`firebase deploy`

## Deploy to server

### `yarn build`

Builds the app for production to the `build` folder.
Make sure you have correct configuration in .env file

### `firebase target:apply hosting sprint-planner-dev`

### `firebase deploy --only hosting:sprint-planner-dev`
