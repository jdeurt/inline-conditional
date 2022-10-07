import { Inline } from "../src/";

describe("Inline conditional", () => {
    it("Should work with a basic if-then flow", () => {
        const { result } = Inline.if(true).then(1);

        expect(result).toEqual(1);
    });

    it("Should work with a basic if-then-otherwise flow", () => {
        const { result } = Inline.if(false).then(1).else(2);

        expect(result).toEqual(2);
    });

    it("Should work with a if-then-else-if-then-otherwise flow", () => {
        const { result: result1 } = Inline.if(false)
            .then(1)
            .elif(false)
            .then(2)
            .else(3);

        const { result: result2 } = Inline.if(false)
            .then(1)
            .elif(true)
            .then(2)
            .else(3);

        expect(result1).toEqual(3);
        expect(result2).toEqual(2);
    });

    it("Should work with a nested conditional flow", () => {
        const { result } = Inline.if(false)
            .then(1)
            .elif(true)
            .then(Inline.if(false).then(2).else(3));

        expect(result).toEqual(3);
    });
});

describe("Inline switch", () => {
    it("Should behave like a switch statement", () => {
        const { result } = Inline.switch("c")
            .case("a")
            .do(1)
            .case("b")
            .do(2)
            .case("c")
            .do(3);

        const { result: result2 } = Inline.switch("c")
            .case("a")
            .do(1)
            .case("b")
            .do(2)
            .case("d")
            .do(3)
            .default(4);

        expect(result).toEqual(3);
        expect(result2).toEqual(4);
    });

    it("Should work with a nested switch flow", () => {
        const { result } = Inline.switch("c")
            .case("a")
            .do(1)
            .case("b")
            .do(2)
            .case("c")
            .do(Inline.if(false).then(3).else(4));

        expect(result).toEqual(4);
    });
});
