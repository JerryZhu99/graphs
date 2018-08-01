
export interface Graph<V, E> {

    addVertex: (x: V) => void;
    removeVertex: (x: V) => void;

    addEdge: (a: V, b: V, e?: E) => void;
    removeEdge: (a: V, b: V) => void;

    getEdge: (a: V, b: V) => E;
    setEdge: (a: V, b: V, e: E) => void;

    adjacent: (a: V, b: V) => boolean;
    neighbours: (x: V) => V[];
}

