import React from 'react'
import { useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { currencyFormatter } from '../../Utils/Utils'
import { updateItemCart, removeItemCart } from '../../redux/shopping_cart/ActionCreators'
import { Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%'
    },
    details: {
        display: 'flex wrap',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 15,
        marginRight:15
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: 75
    },
    quantity: {
        maxWidth: '80px',
        marginTop: 10,
    },
    lefthalf: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        <div className={classes.item}>
            <div className={classes.lefthalf}>
                <div>
                    <img width="40" src={amiibo.image} />
                </div>
                <div className={classes.details}>
                    <Typography variant="button" display="block" gutterBottom>
                        <strong>{amiibo.name}</strong>
                    </Typography>
                    <span style={{ fontSize: 11 }}>
                        PRECIO UNIDAD
                    </span>
                    <Typography variant="body1" color="secondary">
                        <strong>{currencyFormatter.format(amiibo.price)}</strong>
                    </Typography>
                </div>
            </div>
            <div className={classes.actions}>
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
            </div>
        </div>
    );
}

export default ShoppingCartItem;