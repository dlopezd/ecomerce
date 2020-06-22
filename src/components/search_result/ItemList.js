import React from 'react';
import { withRouter } from 'react-router-dom'
import  { useDispatch } from 'react-redux'

import { currencyFormatter } from '../../Utils/Utils'
import { addItemCart } from '../../redux/shopping_cart/ActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 200,
        margin: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    info: {
        padding: 10,
    },
    content: {
        padding: 0,
        paddingTop: 16,
        paddingBottom: '0px',
    },
    cover: {
        height: 180,
        width: 'auto',
        backgroundSize: 'contain'
    },
    button: {
        paddingBottom: 15
    },
    title: {
        fontSize: '16px',
        lineHeight: '18px',
    },
    subtitle: {
        fontSize: '13px',
        lineHeight: '15px'
    },
    price: {
        marginTop: '5px',
        color: '#dc004e'
    }
}));

const ItemList = props => {
    const classes = useStyles();
    const amiibo = props.amiibo;
    const dispatch = useDispatch();

    const handleAddToCart = event => {
        event.preventDefault();
        dispatch(addItemCart({...amiibo, quantity: 1}))
    }

    return (
        <Card className={classes.root}>
            <CardActionArea
                className={classes.info}
                onClick={_ => {
                    props.history.push({
                        pathname: `amiibo/${amiibo.head}${amiibo.tail}`,
                        state: amiibo
                    })
                }} >
                <CardMedia
                    className={classes.cover}
                    image={amiibo.image}
                    title="picture"
                />
                <div className={classes.content}>
                    <Typography className={classes.title}>
                        <strong>{amiibo.name}</strong>
                    </Typography>
                    <Typography className={classes.subtitle}>
                        {amiibo.type}
                    </Typography>
                    <Typography className={classes.price}>
                        <strong>{currencyFormatter.format(amiibo.price)}</strong>
                    </Typography>
                </div>
            </CardActionArea>
            <Button
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<AddShoppingCartIcon />}
                onClick={event => handleAddToCart(event)}
            >
                Añadir al carro
      </Button>
        </Card>
    );
}
export default withRouter(ItemList);