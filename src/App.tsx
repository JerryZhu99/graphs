import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '../node_modules/@material-ui/core';

import Editor from './editor/Editor';
import Graph from './graph/Graph';

import './App.css';

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
  nodes: any[];
}

class App extends React.Component<Props, State> {
  public state = {
    nodes: [{
      x: -120, y: 0
    }]
  }

  public update = () => {
    requestAnimationFrame(() => {
      this.setState({
        nodes: this.state.nodes.map((e: any) => ({ x: e.x + 10, y: e.y }))
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
