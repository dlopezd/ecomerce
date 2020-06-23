import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Error from '../Error'
import Loader from '../Loader'
import { fetchAmiibo } from '../../redux/amiibo_detail/ActionCreators'
import { addItemCart } from '../../redux/shopping_cart/ActionCreators'
import { currencyFormatter } from '../../Utils/Utils'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: '20px',
    },
    container: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'row'
    },
    image: {
        display: 'flex',
        justifyContent: 'center'
    },
    price: {
        marginTop: '20px',
        color: '#dc004e'
    },
    quantity: {
        maxWidth: '80px',
        marginRight: 10
    }
}));

const Details = props => {
    const classes = useStyles();
    const [amiibo, setAmiibo] = useState(undefined);
    const [quantity, setQuantity] = useState(1);
    const amiiboState = useSelector(state => state.amiiboDetailState);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleShowAlert = () => {
        setOpen(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        if (!props.history.location.state) {
            dispatch(fetchAmiibo(props.id));
        }
    }, []);

    useEffect(() => {
        if (!amiiboState.isLoading && !amiiboState.ErrMess) {
            setAmiibo(amiiboState.amiibo);
        }
    }, [amiiboState]);


    const handleAddToCart = event => {
        event.preventDefault();
        dispatch(addItemCart({ ...amiibo, quantity: quantity }));
        handleShowAlert();
    }

    const handleShopping = (event) => {
        event.preventDefault();
        props.history.push({ pathname: '/' })
    }


    !amiibo && props.history.location.state &&
        setAmiibo(props.history.location.state);

    return (
        amiibo ? (
            <Paper elevation={0} className={classes.paper}>
                <Container className={classes.container}>
                    <Grid container style={{ flexGrow: 1, width: '100%' }} spacing={2}>
                        <Grid item className={classes.image} style={{ flexGrow: 1 }}>
                            <img height="280" src={amiibo.image} />
                        </Grid>
                        <Grid item style={{ flexGrow: 1 }}>
                            <Typography variant="h6">{amiibo.name}</Typography>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Rating name="read-only" value={0} readOnly />
                                (Sin calificaciones)
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: 40 }}>
                                <Typography variant="body1"><strong>Personaje:</strong></Typography>
                                <Typography variant="body1">&nbsp;{amiibo.character}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1"><strong>Game Serie:</strong></Typography>
                                <Typography variant="body1">&nbsp;{amiibo.gameSeries}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1"><strong>Amiibo Serie:</strong></Typography>
                                <Typography variant="body1">&nbsp;{amiibo.amiiboSeries}</Typography>
                            </div>
                            <Typography
                                variant="h6"
                                className={classes.price}>
                                <strong>{currencyFormatter.format(amiibo.price)}</strong>
                            </Typography>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                                <TextField
                                    className={classes.quantity}
                                    label="Cantidad"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={quantity}
                                    size='small'
                                    onChange={e => { setQuantity(e.target.value) }} />
                                <Button variant="contained" color="secondary" onClick={e => handleAddToCart(e)}>
                                    AGREGAR AL CARRO
                                </Button>
                            </div>
                            <Button style={{ marginTop: 10 }}
                                onClick={e => handleShopping(e)} >
                                SEGUIR COMPRANDO
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
                <Snackbar open={open} autoHideDuration={1500} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success">
                        El producto fue agregado al carro.
                </Alert>
                </Snackbar>
            </Paper>
        ) :
            amiiboState.isLoading ? <Loader /> :
                amiiboState.ErrMess ? <Error msg={amiiboState.ErrMess} /> : null

    );
}

export default withRouter(Details);