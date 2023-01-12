[![npm version](https://badge.fury.io/js/inline-conditional.svg)](https://badge.fury.io/js/inline-conditional)

# Inline Conditional

> Create inline conditional statements!

## Table of contents

-   [Inline Conditional](#inline-conditional)
    -   [Table of contents](#table-of-contents)
    -   [Installation](#installation)
    -   [Usage](#usage)
        -   [Vanilla JS](#vanilla-js)
        -   [React](#react)
    -   [API](#api)
    -   [Authors](#authors)
    -   [License](#license)

## Installation

To install, run:

```sh
$ npm install inline-conditional
```

Or if you prefer using Yarn:

```sh
$ yarn add inline-conditional
```

## Usage

This library allows you to write if/else and switch statements as expressions. This means that you can use them in places where you would normally use a value, most commonly in front-end development scenarios.

Why use this over a ternary expression? I'll show you:

```js
char === "a"
    ? 1
    : char === "b"
    ? 2
    : char === "c"
    ? someCondition
        ? 3
        : 4
    : 0;

// vs

Inline.switch(char)
    .case("a")(1)
    .case("b")(2)
    .case("c")(Inline.if(someCondition)(3).else(4))
    .default(0);
```

### Vanilla JS

```js
import { Inline } from "inline-conditional";

const inlineIfResult = Inline.if(something === somethingElse)(1)
    .elseIf(something.property === expectedPropertyValue)(2)
    .else(3);

const inlineSwitchResult = Inline.switch(flag)
    .case(1)("Hello 1!")
    .case(2)("Hello 2!")
    .default("Who are you?");
```

### React

```jsx
const Page = () => {
    const isLoggedIn = useSomeAuthenticationHook();

    return (
        <Template>
            {Inline.if(isLoggedIn)(
                // Use functions to prevent components from being called when they're not relevant
                () => <UserPage />
            ).else(() => <AccessDenied />)()}
        </Template>
    );
};
```

## API

**TODO**

For now, all methods are well-documented using JSDoc.

## Authors

-   **Juan de Urtubey** - - [jdeurt](https://github.com/jdeurt)

## License

MIT © [Juan de Urtubey](https://github.com/jdeurt)
