export class InlineConditional {
    private parent?: InlineConditional;

    private condition: unknown;
    private value?: unknown;

    constructor(
        parent?: InlineConditional,
        condition?: unknown,
        value?: unknown
    ) {
        this.parent = parent;
        this.condition = condition;
        this.value = value;
    }

    static if(expression: unknown) {
        return new InlineConditional().if(expression);
    }

    if(expression: unknown): { then: (value: unknown) => InlineConditional } {
        this.condition = expression;

        return {
            // eslint-disable-next-line unicorn/no-thenable
            then: (value: unknown) => {
                this.value =
                    value instanceof InlineConditional ? value.result : value;

                return this;
            },
        };
    }

    otherwise(value: unknown) {
        return new InlineConditional(this, true, value);
    }

    get else() {
        return new InlineConditional(this, false);
    }

    get result() {
        const ladder: [unknown, unknown][] = [];

        let current:
            | {
                  parent?: InlineConditional;
                  condition: unknown;
                  value?: unknown;
              }
            | undefined = {
            parent: this.parent,
            condition: this.condition,
            value: this.value,
        };

        while (current !== undefined) {
            ladder.push([current.condition, current.value]);

            current = current.parent
                ? {
                      parent: current.parent.parent,
                      condition: current.parent.condition,
                      value: current.parent.value,
                  }
                : undefined;
        }

        return ladder.reverse().find((pair) => !!pair[0] === true)?.[1];
    }
}
