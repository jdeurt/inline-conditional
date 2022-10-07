import { Resolvable } from "../structs/resolvable";

export type InlineSwitchActionFunction<T, R> = (
    result: R | Resolvable<R>
) => InlineSwitch<T, R>;

export class InlineSwitch<T, R> extends Resolvable<R> {
    private value: T;
    private pairs: [T, R][];

    private constructor(value: T) {
        super();

        this.value = value;
        this.pairs = [];
    }

    /**
     * Starts a new inline switch chain
     * @param value The value to test the cases against
     */
    static switch<T, R>(value: T) {
        return new InlineSwitch<T, R>(value);
    }

    /**
     * Continues an inline switch chain
     * @param matchValue A value to test against the original `value` provided to the `InlineSwitch.switch` call
     *
     * @returns an object that contains a `do` function that allows you to specify the value that should be returned if `matchValue` matches the original `value` provided to the `InlineSwitch.switch` call
     */
    case(matchValue: T): {
        do: InlineSwitchActionFunction<T, R>;
    };
    /**
     * Continues an inline switch chain
     * @param matchValue A value to test against the original `value` provided to the `InlineSwitch.switch` call
     * @param result the value that should be returned if `matchValue` matches the original `value` provided to the `InlineSwitch.switch` call
     */
    case(matchValue: T, result: R | Resolvable<R>): InlineSwitch<T, R>;
    case(matchValue: T, result?: R | Resolvable<R>) {
        this.pairs.push([matchValue, undefined as unknown as R]);

        const targetPair = this.pairs[this.pairs.length - 1];

        const doCallback: InlineSwitchActionFunction<T, R> = (
            result: R | Resolvable<R>
        ) => {
            targetPair[1] = Resolvable.resolve(result);

            return this;
        };

        return arguments.length === 1
            ? { do: doCallback }
            : doCallback(result as R | Resolvable<R>);
    }

    /**
     * Provides a fallback value for the inline switch chain
     * @param result The value that should be returned if none of the `<InlineSwitch>.case` values match the original `value` provided to the `InlineSwitch.switch` call
     */
    default(result: R | Resolvable<R>) {
        const pair: [T, R] = [this.value, Resolvable.resolve(result)];

        this.pairs.push(pair);

        return this;
    }

    /**
     * The result of evaluating the inline switch chain
     */
    get result() {
        const matched = this.pairs.find((pair) => pair[0] === this.value);

        if (matched === undefined) {
            return;
        }

        return matched[1];
    }
}
