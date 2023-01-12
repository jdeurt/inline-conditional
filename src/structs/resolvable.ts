export class Resolvable<T> {
    protected result?: T;
    protected fallbackValue?: T;

    protected constructor() {
        Reflect.deleteProperty(this, "result");
        Reflect.deleteProperty(this, "fallbackValue");
    }

    protected get isResultAssigned(): boolean {
        return Reflect.has(this, "result");
    }

    protected get isFallbackValueAssigned(): boolean {
        return Reflect.has(this, "fallbackValue");
    }

    protected getResult(): T {
        if (!this.isFallbackValueAssigned) {
            throw new Error("Expected a fallback value to exist but got none.");
        }

        return (this.isResultAssigned ? this.result : this.fallbackValue) as T;
    }
}
