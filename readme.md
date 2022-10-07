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

```js
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

// Is equivalent to this
const a = InlineConditional.if(false)
    .then(0)
    .elseIf(true)
    .then(1)
    .else(2).result;

// And this
const a = InlineConditional.if(false).then(0).elif(true).then(1).elif(2).result;

// And even this
const a = InlineConditional.if(false, 0).elseIf(true, 1).else(2).result;
```

### Nesting conditional chains

```js
import { InlineConditional } from "inline-conditional";

// a = 2
const a = InlineConditional.if(false, 0)
    .elseIf(true, InlineConditional.if(false, 1).else(2))
    .else(3).result;
```

### Switch chains

```js
import { InlineSwitch } from "inline-conditional";

// result = 3
let result = InlineSwitch.switch("c")
    .case("a")
    .do(1)
    .case("b")
    .do(2)
    .case("c")
    .do(3)
    .default(4).result;

// or

// result = 3
result = InlineSwitch.switch("c")
    .case("a", 1)
    .case("b", 2)
    .case("c", 3)
    .default(4).result;
```

## Typescript example

```typescript
import { Inline } from "inline-conditional";

const conditionalResult: number = Inline.if<number>(false, 0)
    .elseIf(true, 1)
    .else(2).result;

const switchResult: number = Inline.switch<string, number>("c")
    .case("a", 0)
    .case("b", 1)
    .default(2).result;
```

## React example

```jsx
import { Inline } from "inline-conditional";

interface ComponentProps {
    foo: number;
}

export const Component = ({ foo }: ComponentProps) => (
    <span>
        {
            Inline.switch(foo)
                .case(0, OtherComponent)
                .case(1, AnotherComponent)
                .default(null).result
        }
    </span>
);
```

## License

MIT © [Juan de Urtubey](https://jdeurt.xyz)
