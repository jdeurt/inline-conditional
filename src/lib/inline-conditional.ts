import { MaybeFunction } from "../types/maybe-function";
import { extract } from "../util/extract";
import { Resolvable } from "./resolvable";

export class InlineConditional<R> extends Resolvable<R> {
    private pairs: [unknown, MaybeFunction<R>][];

    private constructor(pairs?: [unknown, MaybeFunction<R>][]) {
        super();

        this.pairs = pairs ?? [];
    }

    static if<R>(expression: unknown) {
        return new InlineConditional<R>().elseIf(expression);
    }

    elseIf(expression: unknown): {
        then: (
            result: MaybeFunction<R> | Resolvable<R>
        ) => InlineConditional<R>;
    } {
        this.pairs.push([expression, undefined as unknown as R]);

        const targetPair = this.pairs[this.pairs.length - 1];

        return {
            // eslint-disable-next-line unicorn/no-thenable
            then: (result: MaybeFunction<R> | Resolvable<R>) => {
                targetPair[1] = Resolvable.resolve(result);

                return this;
            },
        };
    }

    elif(expression: unknown) {
        return this.elseIf(expression);
    }

    else(result: MaybeFunction<R> | Resolvable<R>) {
        const pair: [boolean, MaybeFunction<R>] = [
            true,
            Resolvable.resolve(result),
        ];

        this.pairs.push(pair);

        return this;
    }

    get result() {
        const matched = this.pairs.find((pair) => !!pair[0]);

        if (matched === undefined) {
            return;
        }

        return extract(matched[1]);
    }
}
