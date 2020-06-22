import React from 'react'
import { useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { currencyFormatter } from '../../Utils/Utils'
import { updateItemCart, removeItemCart } from '../../redux/shopping_cart/ActionCreators'


const useStyles = makeStyles((theme) => ({
    item: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop:5,
        marginBottom:5,
    },
    details: {
        display: 'flex wrap',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
    },
    quantity: {
        maxWidth: '80px'
    },
    remove: {
        fontSize: 11,
        marginTop: 6
    }
}));

const ShoppingCartItem = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const amiibo = props.amiibo;

    const handleUpdateItem = event => {
        event.preventDefault();
        dispatch(updateItemCart(`${amiibo.head}${amiibo.tail}`, { ...amiibo, quantity: event.target.value }))
    }

    const handleRemoveItem = event => {
        event.preventDefault();
        dispatch(removeItemCart(`${amiibo.head}${amiibo.tail}`));
    }

    return (
        <Grid container className={classes.item} spacing={2}>
            <Grid item>
                <img width="60" src={amiibo.image} />
            </Grid>
            <Grid item className={classes.details}>
                <Typography variant="button" display="block" gutterBottom>
                    <strong>{amiibo.name}</strong>
                </Typography>
                <span style={{ fontSize: 11 }}>
                    PRECIO UNIDAD
                    </span>
                <Typography variant="body1" color="secondary">
                    <strong>{currencyFormatter.format(amiibo.price)}</strong>
                </Typography>
            </Grid>
            <Grid item className={classes.actions}>
                <TextField
                    className={classes.quantity}
                    label="Cantidad"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={amiibo.quantity}
                    size='small'
                    onChange={e => handleUpdateItem(e)} />
                <Button
                    size="small"
                    className={classes.remove}
                    onClick={e => handleRemoveItem(e)}>
                    Eliminar
                    </Button>
            </Grid>
        </Grid>
    );
}

export default ShoppingCartItem;