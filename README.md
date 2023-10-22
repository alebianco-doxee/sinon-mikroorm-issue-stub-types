# sinon-mikroorm-issue-stub-types

Demonstration of the typescript type instantiation error when stubbing a method in mikro-orm

## Requirements

- Node 20.8.1
- Npm 10.1.0
- Typescript 5.2.2

Tested and reproduced also with other versions of Node (down to 18.2.1)

## Usage

`npm test` or `tsc`

## Error reported

```log
src/index.spec.ts:48:5 - error TS2589: Type instantiation is excessively deep and possibly infinite.

48 sinon.stub(mikro.em, 'find').withArgs(Item).resolves([expected]);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

## Details

The same error happens with other methods of the EntityManager like `findOne` or `count`. Probably anything that uses the `FilterQuery<Entity>` type in the arguments.

The error happens only when using the `withArgs` method on the stub, other methods to conditionally control the stub, like `onCall`, are not affected.
