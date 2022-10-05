import { InlineConditional } from "../src/";

describe("Inline conditional", () => {
    it("Should work with a basic if-then flow", () => {
        const { result } = InlineConditional.if(true).then(1);

        expect(result).toEqual(1);
    });

    it("Should work with a basic if-then-otherwise flow", () => {
        const { result } = InlineConditional.if(false).then(1).otherwise(2);

        expect(result).toEqual(2);
    });

    it("Should work with a if-then-else-if-then-otherwise flow", () => {
        const { result: result1 } = InlineConditional.if(false)
            .then(1)
            .else.if(false)
            .then(2)
            .otherwise(3);

        const { result: result2 } = InlineConditional.if(false)
            .then(1)
            .else.if(true)
            .then(2)
            .otherwise(3);

        expect(result1).toEqual(3);
        expect(result2).toEqual(2);
    });

    it("Should work with a nested conditional flow", () => {
        const { result } = InlineConditional.if(false)
            .then(1)
            .else.if(true)
            .then(InlineConditional.if(false).then(2).otherwise(3));

        expect(result).toEqual(3);
    });
});
