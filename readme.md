# Inline Conditional

Create inline conditional statements!

## Why?

Mostly as a joke.

## Installation

```bash
npm i inline-conditional
```

or

```bash
yarn add inline-conditional
```

## Usage

```typescript
import { InlineConditional } from "inline-conditional";

// This
let a;
if (false) {
    a = 0;
} else if (true) {
    a = 1;
} else {
    a = 2;
}

// Is the same as this
const a = InlineConditional.if(false)
    .then(0)
    .else.if(true)
    .then(1)
    .otherwise(2).result;
```

You can also nest conditional chains!

```typescript
import { InlineConditional } from "inline-conditional";

// a = 2
const a = InlineConditional.if(false)
    .then(0)
    .else.if(true)
    .then(InlineConditional.if(false).then(1).otherwise(2))
    .otherwise(3).result;
```

## License

MIT © [Juan de Urtubey](https://jdeurt.xyz)
