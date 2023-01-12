import { InlineSwitch } from "../src/lib/inline-switch";

describe("InlineSwitch", () => {
    it("Should correctly handle chain creation", () => {
        expect(InlineSwitch.switch("a")["result"]).toEqual(undefined);
    });

    it("Should allow itself to be chained", () => {
        expect(InlineSwitch.switch("a").case("a", 1)["result"]).toEqual(1);
    });

    it("Should allow for nesting", () => {
        expect(
            InlineSwitch.switch("a").case(
                "a",
                InlineSwitch.switch("b").case("b", 1).default(2)
            )["result"]
        ).toEqual(1);
    });

    it("Should correctly resolve to a value when complete", () => {
        expect(InlineSwitch.switch("a").case("a", 1).default(2)).toEqual(1);

        expect(InlineSwitch.switch("b").case("a", 1).default(2)).toEqual(2);

        expect(
            // eslint-disable-next-line unicorn/no-useless-undefined
            InlineSwitch.switch("a").case("a", undefined).default(2)
        ).toEqual(undefined);
    });

    it("Should return an action function if a result is not provided", () => {
        const inlineSwitch: InlineSwitch<"a", never> = Reflect.construct(
            InlineSwitch,
            ["a"]
        );

        const action = inlineSwitch.case("a");

        expect(inlineSwitch["result"]).toEqual(undefined);

        expect(action(1)["result"]).toEqual(1);
    });
});
