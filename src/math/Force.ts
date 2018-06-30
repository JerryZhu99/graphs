import { FreeBody } from "./FreeBody";
import Vector from "./Vector";

export type Force = (bodies: FreeBody[], deltaTime: number) => FreeBody[];

export const GravityForce = (strength: number) => (bodies: FreeBody[], deltaTime: number) =>
    bodies.reduce(body =>
        body.addVelocity(
            bodies.map(e => e.position.sub(body.position))
                .reduce(Vector.add, Vector.ZERO)
                .scale(strength)
                .scale(deltaTime)));