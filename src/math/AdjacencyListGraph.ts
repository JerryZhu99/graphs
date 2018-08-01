import { Graph } from "./Graph";

interface Edge<V, E> {
    from: Vertex<V, E>
    to: Vertex<V, E>
    value: E
}

interface Vertex<V, E> {
    edges: Array<Edge<V, E>>
    value: V
}

export default class AdjacencyListGraph<V, E> implements Graph<V, E>{
    private vertices: Map<V, Vertex<V, E>>;



    public addVertex = (v: V) => {
        this.vertices.set(v, {
            edges: [],
            value: v,
        })
    }

    public removeVertex = (v: V) => {
        this.vertices.delete(v);
    }

    public addEdge = (a: V, b: V, e: E) => {
        const from = this.getV(a);
        const to = this.getV(b);
        const edge = { from, to, value: e };
        from.edges.push(edge);
    }

    public removeEdge = (a: V, b: V) => {
        const from = this.getV(a);
        const to = this.getV(b);
        from.edges = from.edges.filter(e => e.to !== to);
    }

    public getEdge = (a: V, b: V) => {
        const from = this.getV(a);
        const to = this.getV(b);
        const edge = this.getE(from, to);
        return edge.value;
    }

    public setEdge = (a: V, b: V, e: E) => {
        const from = this.getV(a);
        const to = this.getV(b);
        const edge = this.getE(from, to);
        edge.value = e;
    }

    public adjacent = (a: V, b: V) => {
        const from = this.getV(a);
        const to = this.getV(b);
        return from.edges.some(g => g.to === to)
    }

    public edges = (a: V) => {
        const from = this.getV(a);
        return from.edges.map(e => e.value);
    }

    public neighbours = (a: V) => {
        const from = this.getV(a);
        return from.edges.map(e => e.to.value);
    }

    private getV = (v: V) => {
        const vert = this.vertices.get(v);
        if (vert === undefined) { throw new Error("Vertex not Found"); }
        return vert;
    }

    private getE = (from: Vertex<V, E>, to: Vertex<V, E>) => {
        const edge = from.edges.find(g => g.to === to)
        if (edge === undefined) { throw new Error("Edge not Found"); }
        return edge;
    }
}