import { Resolvable } from "../structs/resolvable";
import { resolve } from "../util/resolve";

export class InlineConditional<R> extends Resolvable<R> {
    /**
     * Starts a new inline conditional chain.
     * @param expression An expression to test the truthiness of.
     *
     * @returns A function that allows you to specify the value that should be returned if `expression` is truthy.
     */
    static if<R>(
        expression: unknown
    ): (result: R | Resolvable<R>) => InlineConditional<R>;
    /**
     * Starts a new inline conditional chain.
     * @param expression An expression to test the truthiness of.
     * @param result The value that should be returned if `expression` is truthy.
     */
    static if<R>(
        expression: unknown,
        result: R | Resolvable<R>
    ): InlineConditional<R>;
    static if<R>(expression: unknown, result?: R | Resolvable<R>) {
        return arguments.length === 1
            ? new InlineConditional<R>().elseIf(expression)
            : new InlineConditional<R>().elseIf(expression, result!);
    }

    /**
     * Continues an inline conditional chain.
     * @param expression An expression to test the truthiness of.
     *
     * @returns A function that allows you to specify the value that should be returned if `expression` is truthy.
     */
    elseIf(expression: unknown): (result: R | Resolvable<R>) => this;
    /**
     * Continues an inline conditional chain.
     * @param expression An expression to test the truthiness of.
     * @param result The value that should be returned if `expression` is truthy.
     */
    elseIf(expression: unknown, result: R | Resolvable<R>): this;
    elseIf(expression: unknown, result?: R | Resolvable<R>) {
        const action = (result: R | Resolvable<R>) => {
            if (!!expression && this.result === undefined)
                this.result = resolve(result);

            return this;
        };

        return arguments.length === 1 ? action : action(result!);
    }

    /**
     * An alias for `<InlineConditional>.elseIf`.
     */
    elif(expression: unknown): (result: R | Resolvable<R>) => this;
    /**
     * An alias for `<InlineConditional>.elseIf`.
     */
    elif(expression: unknown, result: R | Resolvable<R>): this;
    elif(expression: unknown, result?: R | Resolvable<R>) {
        return arguments.length === 1
            ? this.elseIf(expression)
            : this.elseIf(expression, result!);
    }

    /**
     * Provides a fallback value for the inline conditional chain and completes the chain.
     * @param result The value that should be returned if the previous `if` and `elseIf` expressions are all falsy.
     *
     * @returns The result of the chain.
     */
    else(result: R | Resolvable<R>): R {
        this.fallbackValue = resolve(result);

        return this.getResult() as R;
    }
}
