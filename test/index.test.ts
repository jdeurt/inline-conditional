/* eslint-disable unicorn/no-useless-undefined */
import { Inline } from "../src/";

function mockFunction({
    event,
    flag,
    id,
}: {
    event: "PUSH" | "PULL" | "CLONE";
    flag: number;
    id: string;
}) {
    const result = Inline.if<() => string>(flag === 0, () => {
        throw new Error("Operation prohibited");
    }).else(
        Inline.switch<typeof event, () => string>(event)
            .case("CLONE", () => `Cloned ${id}`)
            .case("PULL", () => `Pulled ${id}`)
            .case("PUSH", () => `Pushed ${id}`)
            .default(Inline.if(flag === -1, () => `Secret action!`))
    );

    return result;
}

describe("Inline conditional", () => {
    it("Should work with a basic if-then flow", () => {
        const result = Inline.if(true)(1).else(undefined);

        expect(result).toEqual(1);
    });

    it("Should work with a basic if-then-otherwise flow", () => {
        const result = Inline.if(false)(1).else(2);

        expect(result).toEqual(2);
    });

    it("Should work with a if-then-else-if-then-otherwise flow", () => {
        const result1 = Inline.if(false)(1).elif(false)(2).else(3);

        const result2 = Inline.if(false)(1).elif(true)(2).else(3);

        expect(result1).toEqual(3);
        expect(result2).toEqual(2);
    });

    it("Should work with a nested conditional flow", () => {
        const result = Inline.if(false)(1)
            .elif(true)(Inline.if(false)(2).else(3))
            .else(undefined);

        expect(result).toEqual(3);
    });
});

describe("Inline switch", () => {
    it("Should behave like a switch statement", () => {
        const result1 = Inline.switch("c")
            .case("a")(1)
            .case("b")(2)
            .case("c")(3)
            .default(undefined);

        const result2 = Inline.switch("c")
            .case("a")(1)
            .case("b")(2)
            .case("d")(3)
            .default(4);

        expect(result1).toEqual(3);
        expect(result2).toEqual(4);
    });

    it("Should work with a nested switch flow", () => {
        const result = Inline.switch("c")
            .case("a")(1)
            .case("b")(2)
            .case("c")(Inline.if(false)(3))
            .default(undefined);

        expect(result).toEqual(undefined);
    });
});

describe("Complex behavior", () => {
    it("Should correctly handle complex nested behavior", () => {
        expect(
            mockFunction({ event: "CLONE", flag: 0, id: "12345" })
        ).toThrow();

        expect(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockFunction({ event: "DNE", flag: 1, id: "12345" })
        ).toEqual(undefined);

        expect(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockFunction({ event: "DNE", flag: -1, id: "12345" })?.()
        ).toEqual("Secret action!");

        expect(
            mockFunction({ event: "CLONE", flag: 1, id: "12345" })?.()
        ).toEqual("Cloned 12345");

        expect(
            mockFunction({ event: "PULL", flag: 1, id: "12345" })?.()
        ).toEqual("Pulled 12345");

        expect(
            mockFunction({ event: "PUSH", flag: 1, id: "12345" })?.()
        ).toEqual("Pushed 12345");
    });
});
