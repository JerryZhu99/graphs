

export interface PointLike {
    x: number,
    y: number
}


export default class Vector implements PointLike {
    public static ZERO = new Vector(0, 0);

    public static add(a: Vector, b: Vector) {
        return new Vector(a.x + b.x, a.y + b.y);
    }

    public static sub(a: Vector, b: Vector) {
        return new Vector(a.x - b.x, a.y - b.y);
    }

    public static dist2(a: Vector, b: Vector) {
        const disp = Vector.sub(a, b);
        return disp.length2;
    }

    public static dist(a: Vector, b: Vector) {
        const disp = Vector.sub(a, b);
        return disp.length;
    }

    public static dot(a: Vector, b: Vector) {
        return a.x * b.x + a.y * b.y;
    }

    public static scale(v: Vector, factor: number) {
        return new Vector(v.x * factor, v.y * factor);
    }

    public static normalize(v: Vector) {
        if (v.length === 0) { return v };
        return v.scale(1 / v.length);
    }

    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
    }

    public add = (v: Vector) => Vector.add(this, v);
    public sub = (v: Vector) => Vector.sub(this, v);
    public dist2 = (v: Vector) => Vector.dist2(this, v);
    public dist = (v: Vector) => Vector.dist(this, v);
    public dot = (v: Vector) => Vector.dot(this, v);
    public scale = (factor: number) => Vector.scale(this, factor);
    public normalize = () => Vector.normalize(this);

    public get length2() {
        return this.x * this.x + this.y * this.y;
    }

    public get length() {
        return Math.sqrt(this.length2);
    }
}