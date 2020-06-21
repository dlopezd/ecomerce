import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Error from '../Error'
import Loader from '../Loader'
import { fetchAmiibo } from '../../redux/amiibo_detail/ActionCreators'
import { currencyFormatter } from '../../Utils/Utils'


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'row'
    },
    filters: {
        width: 320
    }
}));

const Details = props => {
    const classes = useStyles();
    const [amiibo, setAmiibo] = useState(undefined);
    const amiiboState = useSelector(state => state.amiiboDetailState);
    const dispatch = useDispatch();

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

    !amiibo &&  props.history.location.state &&
        setAmiibo(props.history.location.state);

    return (
        amiibo ? (
            <Container className={classes.container}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <div className={classes.details}>
                            <CardMedia
                                className={classes.cover}
                                image={amiibo.image}
                                title="picture"
                            />
                            <CardContent className={classes.content}>
                                <Typography className={classes.title}>
                                    <strong>{amiibo.name}</strong>
                                </Typography>
                                <Typography className={classes.subtitle}>
                                    {amiibo.type}
                                </Typography>
                                <Typography className={classes.price}>
                                    <strong>{currencyFormatter.format(amiibo.price)}</strong>
                                </Typography>
                            </CardContent>
                        </div>
                    </CardActionArea>
                </Card>
            </Container>
        ) :
            amiiboState.isLoading ? <Loader /> :
                amiiboState.ErrMess ? <Error msg={amiiboState.ErrMess} /> : null

    );
}

export default withRouter(Details);