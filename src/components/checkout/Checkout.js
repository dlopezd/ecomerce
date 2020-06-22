import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography, Paper } from '@material-ui/core';

import CheckoutListItem from './CheckoutListItem';
import { currencyFormatter } from '../../Utils/Utils';


const useStyles = makeStyles((theme) => ({
    container: {
        width: '70%',
        padding: 0,
        marginTop: 20
    },
    pannel: {
        padding: theme.spacing(0, 2),
        ...theme.mixins.toolbar,
    },
    pagar: {
        width: '100%',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));



const Checkout = props => {
    const classes = useStyles();
    const shoppingCartState = useSelector(state => state.shoppingCartState);

    const items = Object.values(shoppingCartState.items);
    const totalBuy = items.reduce((sum, item) => {
        return sum + item.quantity * item.price
    }, 0);

    const handleShopping = (event) => {
        event.preventDefault();
        props.history.push({ pathname: '/' })
    }

    return (
        <Container className={classes.container}>
            <Paper style={{ padding: 15 }}>
                <Grid container className={classes.pannel}>
                    <Grid item style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: 10 }}>
                        <Typography variant="h5">
                            DETALLE DE LA COMPRA
                        </Typography>
                    </Grid>
                    <Grid item style={{ width: '100%' }}>
                        {
                            items.map(i => {
                                return (
                                    <CheckoutListItem
                                        key={`${i.head}${i.tail}`}
                                        amiibo={i} />
                                )
                            })
                        }
                    </Grid>
                    <Grid item className={classes.pagar}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
                            <Typography variant='h6'>
                                TOTAL A PAGAR
                            </Typography>
                            <Typography variant='h6'>
                                {currencyFormatter.format(totalBuy)}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            <Button style={{ marginTop: 10 }}
                                color="primary"
                                onClick={e => handleShopping(e)} >
                                SEGUIR COMPRANDO
                            </Button>
                            <Button style={{ width: 200, marginTop: 10 }}
                                variant="contained"
                                color="secondary">
                                PAGAR
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default withRouter(Checkout);