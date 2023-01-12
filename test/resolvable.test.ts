import { Resolvable } from "../src/structs/resolvable";

describe("Resolvable", () => {
    let resolvable: Resolvable<unknown> = Reflect.construct(Resolvable, []);

    beforeEach(() => {
        resolvable = Reflect.construct(Resolvable, []);
    });

    it("Should initialize without any critical props assigned", () => {
        expect(Reflect.has(resolvable, "result")).toEqual(false);
        expect(Reflect.has(resolvable, "fallbackValue")).toEqual(false);
    });

    it("Should have props that accurately reflect whether or not critical props are assigned", () => {
        expect(resolvable["isResultAssigned"]).toEqual(false);
        expect(resolvable["isFallbackValueAssigned"]).toEqual(false);

        resolvable["result"] = undefined;
        resolvable["fallbackValue"] = undefined;

        expect(resolvable["isResultAssigned"]).toEqual(true);
        expect(resolvable["isFallbackValueAssigned"]).toEqual(true);
    });

    it("Should throw if getResult is called before a fallback value is assigned", () => {
        expect(resolvable["getResult"].bind(resolvable)).toThrowError(
            "Expected a fallback value to exist but got none."
        );
    });

    it("Should correctly resolve to a value when ready and getResult is called", () => {
        resolvable["result"] = 1;
        resolvable["fallbackValue"] = 2;

        expect(resolvable["getResult"]()).toEqual(1);

        resolvable = Reflect.construct(Resolvable, []);

        resolvable["fallbackValue"] = 2;

        expect(resolvable["getResult"]()).toEqual(2);
    });
});
