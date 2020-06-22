import React from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { currencyFormatter } from '../../Utils/Utils'


const useStyles = makeStyles((theme) => ({
    item: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
    details: {
        display: 'flex wrap',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        fontSize: 12,
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        flexGrow: 1
    },
    quantity: {
        maxWidth: '80px'
    },
    otherDetail: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1
    }
}));

const CheckoutListItem = props => {
    const classes = useStyles();
    const amiibo = props.amiibo;

    return (
        <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
        <Grid container className={classes.item}>
            <Grid item style={{width:80}}>
                <img width="60" src={amiibo.image} />
            </Grid>
            <Grid item className={classes.details}>
                <Typography variant="button" display="block" gutterBottom>
                    <strong>{amiibo.name}</strong>
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span><strong>Personaje:</strong></span>
                    <span>&nbsp;{amiibo.character}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span><strong>Game Serie:</strong></span>
                    <span>&nbsp;{amiibo.gameSeries}</span>
                </div>
            </Grid>
        </Grid>
        <Grid container className={classes.item}>
            <Grid item className={classes.otherDetail}>
                <span style={{ fontSize: 11 }}>
                    CANTIDAD
                    </span>
                <Typography variant="body1">
                    <strong>x {amiibo.quantity}</strong>
                </Typography>
            </Grid>
            <Grid item className={classes.otherDetail}>
                <span style={{ fontSize: 11 }}>
                    PRECIO UNIDAD
                    </span>
                <Typography variant="body1">
                    <strong>{currencyFormatter.format(amiibo.price)}</strong>
                </Typography>
            </Grid>
            <Grid item className={classes.actions} style={{ flexGrow: 1 }}>
                <span style={{ fontSize: 11 }}>
                    PRECIO TOTAL
                    </span>
                <Typography variant="body1" color="secondary">
                    <strong>{currencyFormatter.format(amiibo.price * amiibo.quantity)}</strong>
                </Typography>
            </Grid>
        </Grid>
        </div>
    );
}

export default CheckoutListItem;