

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


    public add = Vector.add.bind(Vector, this);
    public sub = Vector.sub.bind(Vector, this);
    public dist2 = Vector.dist2.bind(Vector, this);
    public dist = Vector.dist.bind(Vector, this);
    public dot = Vector.dot.bind(Vector, this);
    public scale = Vector.scale.bind(Vector, this);
    public normalize = Vector.normalize.bind(Vector, this);

    public get length2() {
        return this.x * this.x + this.y * this.y;
    }

    public get length() {
        return Math.sqrt(this.length2);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
    }

}