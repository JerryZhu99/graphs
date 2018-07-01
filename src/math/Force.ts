import { FreeBody } from "./FreeBody";
import Vector from "./Vector";

export type Force = (bodies: FreeBody[], deltaTime: number) => FreeBody[];

export const GravityForce = (strength: number) => (bodies: FreeBody[], deltaTime: number) =>
    bodies.map(body =>
        body.addVelocity(
            bodies
                .map(e => {
                    if (e === body) { return Vector.ZERO; }
                    const disp = e.position.sub(body.position);
                    return disp.normalize().scale(1 / disp.length2);
                })
                .reduce(Vector.add, Vector.ZERO)
                .scale(strength)
                .scale(deltaTime)));