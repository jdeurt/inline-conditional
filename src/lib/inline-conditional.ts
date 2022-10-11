import { Resolvable } from "../structs/resolvable";

export type InlineConditionalActionFunction<R> = (
    result: R | Resolvable<R>
) => InlineConditional<R>;

export class InlineConditional<R> extends Resolvable<R> {
    private pairs: [unknown, R][];

    private constructor(pairs?: [unknown, R][]) {
        super();

        this.pairs = pairs ?? [];
    }

    /**
     * Starts a new inline conditional chain
     * @param expression An expression to test the truthiness of
     *
     * @returns an object that contains a `then` function that allows you to specify the value that should be returned if `expression` is truthy
     */
    static if<R>(expression: unknown): {
        then: InlineConditionalActionFunction<R>;
    };
    /**
     * Starts a new inline conditional chain
     * @param expression An expression to test the truthiness of
     * @param result The value that should be returned if `expression` is truthy
     */
    static if<R>(
        expression: unknown,
        result: R | Resolvable<R>
    ): InlineConditional<R>;
    static if<R>(expression: unknown, result?: unknown | Resolvable<unknown>) {
        return arguments.length === 1
            ? new InlineConditional<R>().elseIf(expression)
            : new InlineConditional<R>().elseIf(
                  expression,
                  result as R | Resolvable<R>
              );
    }

    /**
     * Continues an inline conditional chain
     * @param expression An expression to test the truthiness of
     *
     * @returns an object that contains a `then` function that allows you to specify the value that should be returned if `expression` is truthy
     */
    elseIf(expression: unknown): {
        then: InlineConditionalActionFunction<R>;
    };
    /**
     * Continues an inline conditional chain
     * @param expression An expression to test the truthiness of
     * @param result The value that should be returned if `expression` is truthy
     */
    elseIf(
        expression: unknown,
        result: R | Resolvable<R>
    ): InlineConditional<R>;
    elseIf(expression: unknown, result?: R | Resolvable<R>) {
        this.pairs.push([expression, undefined as unknown as R]);

        const targetPair = this.pairs[this.pairs.length - 1];

        const thenCallback: InlineConditionalActionFunction<R> = (
            result: R | Resolvable<R>
        ) => {
            targetPair[1] = Resolvable.resolve(result);

            return this;
        };

        return arguments.length === 1
            ? // eslint-disable-next-line unicorn/no-thenable
              { then: thenCallback }
            : thenCallback(result as R | Resolvable<R>);
    }

    /**
     * An alias for `<InlineConditional>.elseIf`
     */
    elif(expression: unknown): {
        then: InlineConditionalActionFunction<R>;
    };
    /**
     * An alias for `<InlineConditional>.elseIf`
     */
    elif(expression: unknown, result: R | Resolvable<R>): InlineConditional<R>;
    elif(expression: unknown, result?: R | Resolvable<R>) {
        return arguments.length === 1
            ? this.elseIf(expression)
            : this.elseIf(expression, result as R | Resolvable<R>);
    }

    /**
     * Provides a fallback value for the inline conditional chain
     * @param result The value that should be returned if the previous `if` and `elseIf` expressions are all falsy
     */
    else(result: R | Resolvable<R>) {
        const pair: [boolean, R] = [true, Resolvable.resolve(result)];

        this.pairs.push(pair);

        return this;
    }

    /**
     * The result of evaluating the inline conditional chain
     */
    get result() {
        const matched = this.pairs.find((pair) => !!pair[0]);

        if (matched === undefined) {
            return;
        }

        return matched[1];
    }
}
