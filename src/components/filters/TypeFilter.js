import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    }
}));

const TypeFilter = props => {
    const classes = useStyles();

    const handleChange = (event) => {
        props.handleTypeChanges(event.target.name, event.target.checked);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Tipo
            </Typography>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    {
                        Object.keys(props.typeOptions).map(key => {
                            return (
                                <FormControlLabel
                                    key={key}
                                    control={
                                        <Checkbox
                                            checked={props.typeOptions[key]}
                                            onChange={handleChange}
                                            name={key} />
                                    }
                                    label={key}
                                />
                            );
                        })
                    }

                </FormGroup>
            </FormControl>
        </div>
    );
}

export default TypeFilter;