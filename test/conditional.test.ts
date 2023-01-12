import { InlineConditional } from "../src/lib/inline-conditional";

describe("InlineConditional", () => {
    it("Should correctly handle chain creation", () => {
        expect(InlineConditional.if(false, 1)["result"]).toEqual(undefined);

        expect(InlineConditional.if(true, 1)["result"]).toEqual(1);
    });

    it("Should allow itself to be chained", () => {
        expect(
            InlineConditional.if(false, 1).elseIf(true, 2)["result"]
        ).toEqual(2);
    });

    it("Should allow for nesting", () => {
        expect(
            InlineConditional.if(false, 1).elseIf(
                true,
                InlineConditional.if(true, 2).else(3)
            )["result"]
        ).toEqual(2);
    });

    it("Should correctly resolve to a value when complete", () => {
        expect(InlineConditional.if(true, 1).else(2)).toEqual(1);

        expect(InlineConditional.if(false, 1).else(2)).toEqual(2);

        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(InlineConditional.if(true, undefined).else(2)).toEqual(
            undefined
        );
    });

    it("Should return an action function if a result is not provided", () => {
        const inlineConditional: InlineConditional<never> = Reflect.construct(
            InlineConditional,
            []
        );

        const action = inlineConditional.elseIf(true);

        expect(inlineConditional["result"]).toEqual(undefined);

        expect(action(1)["result"]).toEqual(1);
    });
});
