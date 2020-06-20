import React from 'react'
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { updateTypeFilters, setMinMaxFilters } from '../../redux/filters/ActionCreators'
import TypeFilter from './TypeFilter';
import PriceFilter from './PriceFilter';

const styles = {
    container: {
        marginTop: '20px',
        padding: 0,

    }
}

class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.handleTypeChanges = this.handleTypeChanges.bind(this);
        this.handlePriceChanges = this.handlePriceChanges.bind(this);
    }

    handleTypeChanges(key, value) {
        this.props.updateTypeFilters(key, value);
    }

    handlePriceChanges(minPrice, maxPrice) {
        this.props.setMinMaxFilters(minPrice, maxPrice);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Grid container style={{ flexGrow: 1 }} spacing={2}>
                    <Grid item>
                        <TypeFilter
                            typeOptions={this.props.filterState.typeOptions}
                            handleTypeChanges={this.handleTypeChanges} />
                    </Grid>
                    <Grid item>
                        <PriceFilter
                            minPrice={this.props.filterState.minPrice}
                            maxPrice={this.props.filterState.maxPrice}
                            handlePriceChanges={this.handlePriceChanges} />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    filterState: state.filterState
});

const mapDispatchToProps = dispatch => ({
    updateTypeFilters: (key, value) => dispatch(updateTypeFilters(key, value)),
    setMinMaxFilters: (min, max) => dispatch(setMinMaxFilters({ min: min, max: max }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);