import { FreeBody } from "./FreeBody";

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

    public withFreeBody = Node.withFreeBody.bind(Node, this);
    public update = Node.update.bind(Node, this)

    public props: any;
    public freeBody: FreeBody;
    constructor(freeBody: FreeBody, props: any) {
        this.freeBody = freeBody;
        this.props = props;
    }


}