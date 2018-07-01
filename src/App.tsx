import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '../node_modules/@material-ui/core';

import Editor from './editor/Editor';
import Graph from './graph/Graph';

import './App.css';
import { CenteringForce, Force, GravityForce, InelasticCollisionForce, SimpleCollisionForce } from './math/Force';
import { FreeBody } from './math/FreeBody';
import Node from './math/Node';
import Vector from './math/Vector';
import { map, prop, random } from './utils/Functions';

const styles = (theme: Theme) => createStyles({
  app: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
});

interface Props extends WithStyles<typeof styles> {

}

interface State {
  nodes: Node[];
}

class App extends React.Component<Props, State> {
  public state = {
    nodes:
      (new Array(20)).fill(0).map(() => (
        new Node(
          new FreeBody(
            new Vector(
              random() * 500,
              random() * 500),
            new Vector(
              random() * 50,
              random() * 50)),
          "Test")
      )),
    forces: [
      GravityForce(10000000),
      InelasticCollisionForce(45),
    ],
    postForces: [
      SimpleCollisionForce(40),
      CenteringForce(),
    ]
  }

  public update = () => {
    let prevTime = performance.now();
    requestAnimationFrame(time => {
      const deltaTime = Math.min((time - prevTime) / 1000.0, 1.0 / 20.0);
      prevTime = time;

      const { nodes, forces, postForces } = this.state;
      this.setState({
        nodes: map(
          Node.withFreeBody,
          nodes,

          postForces
            .reduce<FreeBody[]>((bodies, force: Force) =>
              force(bodies, deltaTime),
              forces
                .reduce<FreeBody[]>(
                  (bodies, force: Force) =>
                    force(bodies, deltaTime),
                  nodes.map(prop.freeBody))
                .map(e => e.update(deltaTime))))




      }, this.update)
    })
  }

  public componentDidMount() {
    this.update();
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.app} style={{ display: "flex" }}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Title
          </Typography>
          </Toolbar>
        </AppBar>
        <Editor />
        <Graph nodes={this.state.nodes} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
