import * as React from 'react';
import { createStyles, Divider, Drawer, List, ListItem, ListItemText, Theme, withStyles, WithStyles } from '../../node_modules/@material-ui/core';

const drawerWidth = 480;

const styles = (theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        backgroundColor: theme.palette.background.default,
        flexGrow: 1,
        minWidth: 0, // So the Typography noWrap works
        padding: theme.spacing.unit * 3,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
});

interface Props extends WithStyles<typeof styles> {

}

class Editor extends React.Component<Props, {}> {
    public render() {
        const { classes } = this.props;
        return (
            <Drawer
                className="Editor"
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="Button" />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        )
    }
}

export default withStyles(styles)(Editor);