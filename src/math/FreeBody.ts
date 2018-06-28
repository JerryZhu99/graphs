import Vector from "./Vector";

export class FreeBody {
    public readonly position: Vector;
    public readonly velocity: Vector;

    constructor(position: Vector, velocity: Vector = Vector.ZERO) {
        this.position = position;
        this.velocity = velocity;
    }

    public update(deltaTime: number) {
        const newPosition = this.position.add(this.velocity.scale(deltaTime));
        return new FreeBody(newPosition, this.velocity);
    }
}