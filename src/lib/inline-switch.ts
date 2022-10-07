import { MaybeFunction } from "../types/maybe-function";
import { extract } from "../util/extract";
import { Resolvable } from "./resolvable";

export class InlineSwitch<T, R> extends Resolvable<R> {
    private value: T;
    private pairs: [T, MaybeFunction<R>][];

    private constructor(value: T) {
        super();

        this.value = value;
        this.pairs = [];
    }

    static switch<T, R>(value: T) {
        return new InlineSwitch<T, R>(value);
    }

    case(matchValue: T): {
        do: (
            expression: MaybeFunction<R> | Resolvable<R>
        ) => InlineSwitch<T, R>;
    } {
        this.pairs.push([matchValue, undefined as unknown as R]);

        const targetPair = this.pairs[this.pairs.length - 1];

        return {
            do: (expression: MaybeFunction<R> | Resolvable<R>) => {
                targetPair[1] = Resolvable.resolve(expression);

                return this;
            },
        };
    }

    get result() {
        const matched = this.pairs.find((pair) => pair[0] === this.value);

        if (matched === undefined) {
            return;
        }

        return extract(matched[1]);
    }
}
