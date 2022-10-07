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
    .elseIf(true)
    .then(1)
    .else(2).result;
```

You can also nest conditional chains!

```typescript
import { InlineConditional } from "inline-conditional";

// a = 2
const a = InlineConditional.if(false)
    .then(0)
    .elseIf(true)
    .then(InlineConditional.if(false).then(1).else(2))
    .else(3).result;
```

Switch statements are also supported

```typescript
import { InlineSwitch } from "inline-conditional";

// result = 3
const result = InlineSwitch.switch("c")
    .case("a")
    .do(1)
    .case("b")
    .do(2)
    .case("c")
    .do(3).result;
```

## React example

```tsx
import { Inline } from "inline-conditional";

interface ComponentProps {
    foo: number;
    bar?: string;
}

export const Component = ({ foo, bar }: ComponentProps) => (
    <span>
        {
            Inline.if(bar === undefined)
                .then("Nothing...")
                .else(
                    Inline.switch(foo)
                        .case(1)
                        .do(bar)
                        .case(0)
                        .do(`Not ${bar}`)
                        .default("Uh oh!")
                ).result
        }
    </span>
);
```

## License

MIT © [Juan de Urtubey](https://jdeurt.xyz)
