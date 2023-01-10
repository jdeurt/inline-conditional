export class Resolvable<T> {
    protected result?: T;
    protected fallbackValue?: T;

    protected getResult() {
        return this.result === undefined ? this.fallbackValue : this.result;
    }
}
