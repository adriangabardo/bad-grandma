# Bad Grandma

Bad Grandma is a little algorithm that reads image files, then randomly processes them using a port of the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) to NodeJS with the [canvas NPM package](https://www.npmjs.com/package/canvas).

## Requirements

- NodeJS
- NPM (or Yarn)

## Usage

```bash
npm i
npm start
```

Alternatively, with Yarn:

```bash
yarn
yarn start
```

With these quick commands, the `src/index.ts` file will read all files under `batch/` folder and try to process them. Once that is finished, the generated files will be written into the `output/` folder.
