import * as React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'

import GraphNode from './GraphNode';

type Node = any;

const styles = (theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    container: {
        position: "relative",
        left: "50%",
        top: "50%",
        width: 0,
        height: 0
    },
    content: {
        backgroundColor: theme.palette.background.default,
        flexGrow: 1,
        minWidth: 0, // So the Typography noWrap works
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
}) as any;


interface Props extends WithStyles<typeof styles> {
    nodes: Node[],
}

class Graph extends React.Component<Props, {}> {
    public render() {
        const { nodes, classes } = this.props;
        return (
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.container}>
                    {
                        nodes.map((node, index) => <GraphNode key={index} position={node.freeBody.position} />)
                    }
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Graph);