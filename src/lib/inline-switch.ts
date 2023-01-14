import { Resolvable } from "../structs/resolvable";

export class InlineSwitch<T, U> extends Resolvable<U> {
    private observed: T;

    private constructor(value: T) {
        super();

        this.observed = value;
    }

    /**
     * Starts a new inline switch chain.
     * @param value The value to test the cases against.
     */
    static switch<T, U = never>(value: T) {
        return new InlineSwitch<T, U>(value);
    }

    /**
     * Continues an inline switch chain.
     * @param matchValue A value to test against the original `value` provided to the `InlineSwitch.switch` call.
     *
     * @returns A function that allows you to specify the value that should be returned if `matchValue` matches the original `value` provided to the `InlineSwitch.switch` call.
     */
    case(matchValue: T): <V>(result: V) => InlineSwitch<T, U | V>;
    /**
     * Continues an inline switch chain.
     * @param matchValue A value to test against the original `value` provided to the `InlineSwitch.switch` call.
     * @param result The value that should be returned if `matchValue` matches the original `value` provided to the `InlineSwitch.switch` call.
     */
    case<V>(matchValue: T, result: V): InlineSwitch<T, U | V>;
    case<V>(matchValue: T, result?: V) {
        const action = <S>(actionResult: S) =>
            this.constructNext(matchValue, actionResult);

        return arguments.length === 1 ? action : action(result!);
    }

    /**
     * Provides a fallback value for the inline switch chain and completes the chain.
     * @param result The value that should be returned if none of the `<InlineSwitch>.case` values match the original `value` provided to the `InlineSwitch.switch` call.
     *
     * @returns The result of the chain.
     */
    default<V>(fallbackValue: V): U | V {
        this.fallbackValue = fallbackValue as unknown as U;

        return this.getResult();
    }

    private constructNext<V>(matchValue: T, result: V): InlineSwitch<T, U | V> {
        const nextInChain = new InlineSwitch<T, U | V>(this.observed);

        if (matchValue === this.observed && !this.isResultAssigned) {
            nextInChain.result = result;
        }

        return nextInChain;
    }
}
