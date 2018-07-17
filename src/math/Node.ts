import { FreeBody } from "./FreeBody";

/**
 * A class containing data for a graph node. 
 */
export default class Node {

    public static withFreeBody(node: Node, freeBody: FreeBody) {
        return new Node(freeBody, node.props);
    }

    public static update(node: Node, deltaTime: number) {
        return new Node(
            node.freeBody.update(deltaTime),
            node.props
        )
    }

    public props: any;
    public freeBody: FreeBody;
    constructor(freeBody: FreeBody, props: any) {
        this.freeBody = freeBody;
        this.props = props;
    }

    public withFreeBody = (freeBody: FreeBody) => Node.withFreeBody(this, freeBody);
    public update = (deltaTime: number) => Node.update(this, deltaTime);

}