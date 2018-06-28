import * as React from 'react';
import { PointLike } from '../math/Vector';


interface Props {
    position: PointLike
}

class GraphNode extends React.Component<Props, {}> {
    public render() {
        return (
            <div style={{ position: "absolute", left: this.props.position.x, bottom: this.props.position.y }}>
                Text
            </div>
        )
    }
}

export default GraphNode;