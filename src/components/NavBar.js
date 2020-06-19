import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));

const NavBar = props => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Random Users
                    </Typography>
            </Toolbar>
        </AppBar>
    );
}
export default withRouter(NavBar);