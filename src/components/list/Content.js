import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Error from '../Error'
import Loader from '../Loader'

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 20
    },
    griptop: {
        flexGrow: 1,
    }
}));

const Content = props => {
    const [spacing, setSpacing] = useState(2);
    const classes = useStyles();

    return (
        // isLoading ? <Loader /> :
            // error ? <Error msg="Error al cargar la información." /> :
                <Container className={classes.container}>
                    <Grid container className={classes.griptop} spacing={2}>
                        <Grid item >
                            <Grid container justify="space-around" spacing={spacing}>
                               
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
    );
}

export default Content;