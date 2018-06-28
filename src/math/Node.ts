import { FreeBody } from "./FreeBody";

export default class Node {
    public props: any;
    public freeBody: FreeBody;
    constructor(freeBody: FreeBody, props: any) {
        this.freeBody = freeBody;
        this.props = props;
    }

    public update(deltaTime: number) {
        return new Node(
            this.freeBody.update(deltaTime),
            this.props
        )
    }

}