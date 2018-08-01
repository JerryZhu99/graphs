export type AnyFn = ((...args: any[]) => any)

/**
 * The identity function.
 * @param e 
 */
export const identity = <T>(e: T) => e;

/**
 * Creates a function from another with the given arguments.
 * @param fn 
 * @param given 
 */
export const curry = (fn: AnyFn, ...given: any[]) =>
    (...args: any[]) =>
        fn(...given, ...args)

/**
 * An object whose properties are functions accessing the property.
 */
export const prop: {
    [key: string]: <T, K extends keyof T>(e: T) => T[K]
} = new Proxy({}, {
    get: <T>(obj: any, p: keyof T) => (e: T) => (e[p])
});

/**
 * Composes functions into a single function, applied from right to left.
 * @param fns 
 */
export const compose = (...fns: AnyFn[]) =>
    (...args: any[]) =>
        fns.reduceRight((acc: any, fn: AnyFn) =>
            [fn(...acc)], args)[0];


/**
 * Appends an element to the beginning of an array.
 * @param elem 
 * @param arr 
 */
export const cons = <T>(elem: T, arr: T[]) => [elem, ...arr];

/**
 * Returns whether an array is empty.
 * @param arr 
 */
export const isEmpty = (arr: any[]) => arr.length === 0;

/**
 * Returns the first element of an array.
 * @param arr 
 */
export const first = (arr: any[]) => arr[0];

/**
 * Returns every element except the first element in an array.
 * @param arr 
 */
export const rest = (arr: any[]) => arr.slice(1);

/**
 * Returns the argument with the maximum value given by fn.
 * @param fn 
 * @param arr 
 */
export const argmax = <T>(fn: (arg: T) => number, arr: T[]) => {
    const vals = arr.map(e => fn(e));
    const maxVal = Math.max(...vals);
    return arr[vals.indexOf(maxVal)];
}


/**
 * Returns the argument with the minimum value given by fn.
 * @param fn 
 * @param arr 
 */
export const argmin = <T>(fn: (arg: T) => number, arr: T[]) => {
    const vals = arr.map(e => fn(e));
    const maxVal = Math.min(...vals);
    return arr[vals.indexOf(maxVal)];
}

/**
 * Maps elements of arrays by a given function
 * @param fn 
 * @param arrs 
 */
export const map: <T>(fn: ((...args: any[]) => T), ...arrs: any[][]) => T[]
    = (fn, ...arrs) =>
        (isEmpty(first(arrs)) ?
            [] : cons(fn(...arrs.map(first)), map(fn, ...arrs.map(rest))));

/**
 * Returns a random number between min and max.
 * @param min 
 * @param max 
 */
export const random = (min: number = -1, max: number = 1) => Math.random() * (max - min) + min; 