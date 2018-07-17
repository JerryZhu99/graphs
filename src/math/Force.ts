import { prop } from "../utils/Functions";
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

export const InelasticCollisionForce: (radius: number) => Force =
    radius => bodies =>
        bodies.map(body =>
            body.withVelocity(
                bodies
                    .reduce((v, e) => {
                        if (e === body) { return v; }
                        const disp = e.position.sub(body.position);
                        const dist = disp.length;
                        if (dist >= 2 * radius) { return v; }
                        const normalVelocity = disp.normalize().scale(Math.max(0, v.dot(disp.normalize())));
                        return normalVelocity.scale(-1).add(v);
                    }, body.velocity)));

export const CenteringForce: () => Force = () =>
    bodies =>
        bodies.map(body =>
            body.withPosition(
                body.position.sub(
                    bodies
                        .map(prop.position)
                        .reduce<Vector>(Vector.add, Vector.ZERO)
                        .scale(1.0 / bodies.length))))