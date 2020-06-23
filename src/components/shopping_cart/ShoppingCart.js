import React from 'react'
import { useSelector } from 'react-redux'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ShoppingCartItem from './ShoppingCartItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography, Divider } from '@material-ui/core';

import { currencyFormatter } from '../../Utils/Utils';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 0,
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

const ShoppingCart = props => {
    const classes = useStyles();
    const shoppingCartState = useSelector(state => state.shoppingCartState);

    const totalBuy = Object.values(shoppingCartState.items).reduce((sum, item) => {
        return sum + item.quantity * item.price
    }, 0)

    const handleBuyClick = event => {
        event.preventDefault();
        props.history.push({ pathname: '/checkout' })
    }

    return (
        <Container className={classes.container}>
            <Grid container className={classes.pannel}>
                <Grid item style={{ width: '100%' }}>
                    {
                        Object.values(shoppingCartState.items).map(i => {
                            return (
                                <>
                                    <ShoppingCartItem
                                        key={`${i.head}${i.tail}`}
                                        amiibo={i} />
                                    <Divider />
                                </>
                            )
                        })
                    }
                </Grid>
                <Grid item className={classes.pagar}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant='overline'>
                            TOTAL A PAGAR
                    </Typography>
                        <Typography variant='h6'>
                            {currencyFormatter.format(totalBuy)}
                        </Typography>
                    </div>
                    <Button style={{ width: '60%', marginTop: 10 }}
                        variant="contained"
                        color="secondary"
                        onClick={e => handleBuyClick(e)} >
                        PAGAR
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default withRouter(ShoppingCart);