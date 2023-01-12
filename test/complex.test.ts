import { Inline } from "../src";

describe("Complex behavior", () => {
    it("Should allow for complex nesting", () => {
        const result = Inline.switch("z")
            .case("a", 1)
            // eslint-disable-next-line unicorn/no-useless-undefined
            .default(Inline.if(false, 2).elseIf(true, undefined).else(4));

        expect(result).toEqual(undefined);
    });
});
