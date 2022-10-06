export class InlineSwitch<T> {
    private value: T;
    private pairs: [T, () => unknown][];

    private constructor(value: T) {
        this.value = value;
        this.pairs = [];
    }

    static switch<T>(value: T) {
        return new InlineSwitch(value);
    }

    case(matchValue: T): {
        do: (operation: () => unknown) => InlineSwitch<T>;
    } {
        this.pairs.push([matchValue, () => void 0]);

        const targetPair = this.pairs[this.pairs.length - 1];

        return {
            do: (operation: () => unknown) => {
                targetPair[1] = operation;

                return this;
            },
        };
    }

    get result() {
        const matched = this.pairs.find((pair) => pair[0] === this.value);

        return matched?.[1]();
    }
}
