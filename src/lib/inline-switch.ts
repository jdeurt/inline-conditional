import { Resolvable } from "../structs/resolvable";
import { resolve } from "../util/resolve";

export class InlineSwitch<T, U> extends Resolvable<U> {
    private observed: T;

    private constructor(value: T, result?: U, fallbackValue?: U) {
        super();

        this.observed = value;
        this.result = result;
        this.fallbackValue = fallbackValue;
    }

    /**
     * Starts a new inline switch chain.
     * @param value The value to test the cases against.
     */
    static switch<T, U>(value: T) {
        return new InlineSwitch<T, U>(value);
    }

    /**
     * Continues an inline switch chain.
     * @param matchValue A value to test against the original `value` provided to the `InlineSwitch.switch` call.
     *
     * @returns A function that allows you to specify the value that should be returned if `matchValue` matches the original `value` provided to the `InlineSwitch.switch` call.
     */
    case(matchValue: T): <V>(result: V | Resolvable<V>) => InlineSwitch<T, V>;
    /**
     * Continues an inline switch chain.
     * @param matchValue A value to test against the original `value` provided to the `InlineSwitch.switch` call.
     * @param result The value that should be returned if `matchValue` matches the original `value` provided to the `InlineSwitch.switch` call.
     */
    case<V>(matchValue: T, result: V | Resolvable<V>): InlineSwitch<T, V>;
    case<V>(matchValue: T, result?: V | Resolvable<V>) {
        const action = <V>(result: V | Resolvable<V>) => {
            return new InlineSwitch<T, U | V>(
                this.observed,
                matchValue === this.observed && this.result === undefined
                    ? resolve(result)
                    : this.result
            );
        };

        return arguments.length === 1 ? action : action(result!);
    }

    /**
     * Provides a fallback value for the inline switch chain and completes the chain.
     * @param result The value that should be returned if none of the `<InlineSwitch>.case` values match the original `value` provided to the `InlineSwitch.switch` call.
     *
     * @returns The result of the chain.
     */
    default<V>(result: V | Resolvable<V>): U | V {
        return new InlineSwitch<T, U | V>(
            this.observed,
            this.result,
            resolve(result)
        ).getResult() as U | V;
    }
}
