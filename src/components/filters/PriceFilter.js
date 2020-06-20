import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { currencyFormatter } from '../../Utils/Utils';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
    root: {
        width: 200,
    },
    inputs: {
        width: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

function valuetext(value) {
    return `${currencyFormatter.format(value)}`;
}

const PriceFilter = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState([props.minPrice, props.maxPrice]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.handlePriceChanges(newValue[0], newValue[1]);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Precio
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                min={0}
                max={50000}
                marks={[{
                    value: 0,
                    label: currencyFormatter.format(0),
                }, {
                    value: 50000,
                    label: currencyFormatter.format(50000),
                }
                ]}
            />
            <div className={classes.inputs}>
                <TextField
                    label="Desde"
                    id="desde"
                    className={classes.textField}
                    value={value[0]}
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    label="Hasta"
                    id="hasta"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    value={value[1]}
                />
            </div>
        </div>
    );
}

export default PriceFilter;