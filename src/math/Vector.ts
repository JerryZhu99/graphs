

export interface PointLike {
    x: number,
    y: number
}


export default class Vector implements PointLike {
    public x: number
    public y: number
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
    }

}