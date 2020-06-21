import React from 'react';
import { withRouter } from 'react-router-dom'

import { currencyFormatter } from '../../Utils/Utils'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 180,
        margin: 8,
        padding: 8
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        padding: '16px 0 0 0'
    },
    cover: {
        height: 180,
        width: 'auto',
        backgroundSize: 'contain'
    },
    button: {
        paddingTop: 0,
        paddingBottom: 0
    },
    title: {
        fontSize: '16px',
        lineHeight: '18px',
        fontStyle: 'bold'
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

    return (
        <Card className={classes.root}>
            <CardActionArea
            onClick={_ => {
                props.history.push({
                    pathname: `amiibo/${amiibo.head}${amiibo.tail}`,
                    state: amiibo
                })
            }}
            >
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
    );
}
export default withRouter(ItemList);