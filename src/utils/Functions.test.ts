
import { argmax, argmin, compose, cons, curry, first, identity, isEmpty, map, prop, random, rest } from "./Functions";

describe("Function Tests", () => {
    test("identity", () => {
        expect(identity(0)).toBe(0);
        expect(identity({ a: 1 })).toEqual({ a: 1 });
        expect(identity([1, 2, 3])).toEqual([1, 2, 3]);
    })
    test("curry", () => {
        const add = (a: number, b: number) => a + b;
        expect(curry(add, 1)(2)).toBe(3);
        const sum = (...arr: number[]) => arr.reduce(add, 0);
        expect(curry(sum, 1, 3)(2, 4)).toBe(10)
    })
    test("prop", () => {
        const obj = {
            a: 1,
            b: "two",
            c: identity,
        }
        expect(prop.a(obj)).toBe(1);
        expect(prop.b(obj)).toBe("two");
        expect(prop.c<typeof obj, "c">(obj)(123)).toEqual(123);
    })
    test("compose", () => {
        const add = (a: number, b: number) => a + b;
        const sqr = (a: number) => a * a;
        const double = (a: number) => a * 2;
        const fn = compose(double, sqr, add);
        expect(fn(1, 2)).toBe(18);
        expect(fn(-3, 2)).toBe(2);
    })
    test("cons", () => {
        expect(cons(0, [1, 2])).toEqual([0, 1, 2]);
        expect(cons("a", ["b", "c"])).toEqual(["a", "b", "c"])
    })
    test("isEmpty", () => {
        expect(isEmpty([])).toBe(true);
        expect(isEmpty([1, 2, 3])).toBe(false);
    })
    test("first", () => {
        expect(first([1, 2, 3])).toBe(1);
        expect(first(["a", "b", "c"])).toBe("a");
        expect(first([])).toBeUndefined();
    })
    test("rest", () => {
        expect(rest([1, 2, 3])).toEqual([2, 3]);
        expect(rest(["a", "b", "c"])).toEqual(["b", "c"]);
        expect(rest([])).toEqual([]);
    })
    test("argmax", () => {
        const a = { n: 1, s: "  1" };
        const b = { n: 2, s: "99" };
        const c = { n: 3, s: "0" };
        const arr = [a, b, c];
        expect(argmax((e: any) => e.s.length, arr)).toBe(a);
        expect(argmax((e: any) => e.n, arr)).toBe(c);
        expect(argmax((e: any) => parseInt(e.s), arr)).toBe(b);
    })
    test("argmin", () => {
        const a = { n: 1, s: "  1" };
        const b = { n: 2, s: "99" };
        const c = { n: 3, s: "0" };
        const arr = [a, b, c];
        expect(argmin((e: any) => e.s.length, arr)).toBe(c);
        expect(argmin((e: any) => e.n, arr)).toBe(a);
        expect(argmin((e: any) => parseInt(e.s), arr)).toBe(c);
    })
    test("map", () => {
        const nums = [1, 2, 3, 4];
        const othernums = [2, 4, 6, 8];
        const strs = ["a", "b", "c", "d"];
        const sqr = (a: number) => a * a;
        const add = (a: number, b: number) => a + b;
        const repeat = (str: string, n: number) => str.repeat(n);
        expect(map(sqr, nums)).toEqual([1, 4, 9, 16]);
        expect(map(add, nums, othernums)).toEqual([3, 6, 9, 12]);
        expect(map(repeat, strs, nums)).toEqual(["a", "bb", "ccc", "dddd"]);
    })
    test("random", () => {
        expect(random()).toBeLessThanOrEqual(1);
        expect(random()).toBeLessThanOrEqual(1);
        expect(random()).toBeLessThanOrEqual(1);
        expect(random()).toBeGreaterThanOrEqual(-1);
        expect(random()).toBeGreaterThanOrEqual(-1);
        expect(random()).toBeGreaterThanOrEqual(-1);
        expect(random(500, 1000)).toBeLessThanOrEqual(1000);
        expect(random(500, 1000)).toBeLessThanOrEqual(1000);
        expect(random(500, 1000)).toBeLessThanOrEqual(1000);
        expect(random(500, 1000)).toBeGreaterThanOrEqual(500);
        expect(random(500, 1000)).toBeGreaterThanOrEqual(500);
        expect(random(500, 1000)).toBeGreaterThanOrEqual(500);
    })
})
