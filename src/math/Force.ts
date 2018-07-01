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

export const SimpleCollisionForce = (radius: number) => (bodies: FreeBody[], deltaTime: number) =>
    bodies.map(body =>
        body.addPosition(
            bodies
                .map(e => {
                    if (e === body) { return Vector.ZERO; }
                    const disp = body.position.sub(e.position);
                    const dist = disp.length;
                    if (dist >= 2 * radius) { return Vector.ZERO }
                    return disp.normalize().scale(radius).sub(disp.scale(0.5));
                })
                .reduce(Vector.add, Vector.ZERO)));

export const InelasticCollisionForce = (radius: number) => (bodies: FreeBody[], deltaTime: number) =>
    bodies.map(body =>
        body.addVelocity(
            bodies
                .map(e => {
                    if (e === body) { return Vector.ZERO; }
                    const disp = e.position.sub(body.position);
                    const dist = disp.length;
                    if (dist >= 2 * radius) { return Vector.ZERO }
                    const normalVelocity = disp.normalize().scale(body.velocity.dot(disp.normalize()));
                    return normalVelocity.scale(-1);
                })
                .reduce(Vector.add, Vector.ZERO)));