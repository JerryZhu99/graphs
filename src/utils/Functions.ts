type AnyFn = ((...args: any[]) => any)

export const identity = <T>(e: T) => e;

export const curry = (fn: AnyFn, ...given: any[]) =>
    (...args: any[]) =>
        fn(...given, ...args)

export const prop = new Proxy({}, {
    get: (obj, p) => (e: any) => (e[p])
})


export const compose = (...fns: AnyFn[]) =>
    (...args: any[]) =>
        fns.reduceRight((acc: any, fn: AnyFn) =>
            [fn(...acc)], args);

export const cons = <T>(elem: T, arr: T[]) => [elem, ...arr];

export const isEmpty = (arr: any[]) => arr.length === 0;

export const first = (arr: any[]) => arr[0];

export const rest = (arr: any[]) => arr.slice(1);

export const argmax = <T>(fn: (arg: T) => number, arr: T[]) => Math.max(...arr.map(e => fn(e)));

export const argmin = <T>(fn: (arg: T) => number, arr: T[]) => Math.min(...arr.map(e => fn(e)));

export const map: <T>(fn: ((...args: any[]) => T), ...arrs: any[][]) => T[]
    = (fn, ...arrs) =>
        (isEmpty(first(arrs)) ?
            [] : cons(fn(...arrs.map(first)), map(fn, ...arrs.map(rest))));

export const random = (min: number = -1, max: number = 1) => Math.random() * (max - min) + min; 