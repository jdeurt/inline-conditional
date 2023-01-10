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

It's pretty straightforward.

Note: Chains are ended by a final `.else(...)` call. Ending the chain returns the resulting value.

```js
import { InlineConditional } from "inline-conditional";

let a;
if (false) {
    a = 0;
} else if (true) {
    a = 1;
} else {
    a = 2;
}

const b = InlineConditional.if(false)(0).elseIf(true)(1).else(2);

const c = InlineConditional.if(false, 0).elseIf(true, 1).else(2);

console.log(a === b); // true
console.log(b === c); // true
```

### Nesting conditional chains

```js
import { InlineConditional } from "inline-conditional";

const a = InlineConditional.if(false, 0)
    .elseIf(true)(InlineConditional.if(false, 1).else(2))
    .else(3);

console.log(a); // 2
```

### Switch chains

Similar to conditional chains, switch chains are ended by a final `.default(...)` call. Ending the chain returns the resulting value.

```js
import { InlineSwitch } from "inline-conditional";

const a = InlineSwitch.switch("c")
    .case("a")(1)
    .case("b")(2)
    .case("c")(3)
    .default(4);

const b = InlineSwitch.switch("c")
    .case("a", 1)
    .case("b", 2)
    .case("c", 3)
    .default(4);

console.log(a === b); // true
```

## Typescript example

```typescript
import { Inline } from "inline-conditional";

const conditionalResult = Inline.if<number>(false, 0).elseIf(true, 1).else(2);

const switchResult = Inline.switch<string, number>("c")
    .case("a", 0)
    .case("b", 1)
    .default(2);
```

## React example

```jsx
import { Inline } from "inline-conditional";

interface ComponentProps {
    foo: number;
}

export const Component = ({ foo }: ComponentProps) => (
    <span>
        {Inline.switch(foo)
            .case(0, <OtherComponent />)
            .case(1, <AnotherComponent />)
            .default(null)}
    </span>
);
```

## License

MIT © [Juan de Urtubey](https://jdeurt.xyz)
