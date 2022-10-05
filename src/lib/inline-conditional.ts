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
            then: (value: unknown) => {
                if (value instanceof InlineConditional) {
                    this.value = value.result;
                } else {
                    this.value = value;
                }

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

        let curr:
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

        while (curr !== undefined) {
            ladder.push([curr.condition, curr.value]);

            curr = curr.parent
                ? {
                      parent: curr.parent.parent,
                      condition: curr.parent.condition,
                      value: curr.parent.value,
                  }
                : undefined;
        }

        return ladder.reverse().find((pair) => !!pair[0] === true)?.[1];
    }
}
