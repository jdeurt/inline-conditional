import { Resolvable } from "../structs/resolvable";
import { resolve } from "../util/resolve";

export class InlineSwitch<T, R> extends Resolvable<R> {
    private observed: T;

    private constructor(value: T) {
        super();

        this.observed = value;
    }

    /**
     * Starts a new inline switch chain.
     * @param value The value to test the cases against.
     */
    static switch<T, R>(value: T) {
        return new InlineSwitch<T, R>(value);
    }

    /**
     * Continues an inline switch chain.
     * @param matchValue A value to test against the original `value` provided to the `InlineSwitch.switch` call.
     *
     * @returns A function that allows you to specify the value that should be returned if `matchValue` matches the original `value` provided to the `InlineSwitch.switch` call.
     */
    case(matchValue: T): (result: R | Resolvable<R>) => this;
    /**
     * Continues an inline switch chain.
     * @param matchValue A value to test against the original `value` provided to the `InlineSwitch.switch` call.
     * @param result The value that should be returned if `matchValue` matches the original `value` provided to the `InlineSwitch.switch` call.
     */
    case(matchValue: T, result: R | Resolvable<R>): this;
    case(matchValue: T, result?: R | Resolvable<R>) {
        const action = (result: R | Resolvable<R>) => {
            if (this.observed === matchValue && this.result === undefined)
                this.result = resolve(result);

            return this;
        };

        return arguments.length === 1 ? action : action(result!);
    }

    /**
     * Provides a fallback value for the inline switch chain and completes the chain.
     * @param result The value that should be returned if none of the `<InlineSwitch>.case` values match the original `value` provided to the `InlineSwitch.switch` call.
     *
     * @returns The result of the chain.
     */
    default(result: R | Resolvable<R>) {
        this.fallbackValue = resolve(result);

        return this.getResult() as R;
    }
}
