import React from 'react'
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Error from './Error'
import Loader from './Loader'
import { fetchType } from '../redux/type/ActionCreators'
import { fetchAmiibos } from '../redux/amiibo/ActionCreators'
import Content from './list/Content';
import Filters from './filters/Filters';
import { levenshtein } from '../Utils/Utils'

const styles = {
    container: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'row'
    },
    filters: {
        width: 320
    }
}

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
    }

    componentDidMount() {
        this.props.fetchAmiibos();
        this.props.fetchType();
    }

    render() {
        const amiiboState = this.props.amiiboState;
        const filterState = this.props.filterState;

        // BUSQUEDA
        let filteredResults = (amiiboState.isLoading || amiiboState.ErrMess) ? [] :
            !filterState.searchText ? amiiboState.amiibos :
                amiiboState.amiibos.filter(a =>
                    a.name.includes(filterState.searchText) ||
                    a.character.includes(filterState.searchText) ||
                    a.amiiboSeries.includes(filterState.searchText) ||
                    a.gameSeries.includes(filterState.searchText));

        // DETERMINANDO FILTROS POR TIPO
        const incluAllTypes = Object.values(filterState.typeOptions).every(v => v == false);
        const typeFilters = incluAllTypes ? Object.keys(filterState.typeOptions) :
            Object.keys(filterState.typeOptions).filter(k => filterState.typeOptions[k]);

        // APLICANDO FILTROS POR TIPO
        filteredResults = filteredResults.filter(a => typeFilters.some(t => a.type === t))

        // APLICANDO FILTRO POR PRECIO
        filteredResults = filteredResults.filter(a => a.price >= filterState.minPrice && a.price <= filterState.maxPrice)

        return (
            amiiboState.isLoading ? <Loader /> :
                amiiboState.ErrMess ? <Error msg={amiiboState.ErrMess} /> :
                    <Container style={styles.container}>
                        <Grid container style={styles.filters} spacing={2}>
                            <Grid item >
                                <Filters />
                            </Grid>
                        </Grid>
                        <Grid container style={{ flexGrow: 1 }} spacing={2}>
                            <Grid item >
                                <Content
                                    page={this.state.page}
                                    amiibos={filteredResults} />
                            </Grid>
                        </Grid>
                    </Container>
        );
    }
}

const mapStateToProps = state => ({
    amiiboState: state.amiiboState,
    filterState: state.filterState
});

const mapDispatchToProps = dispatch => ({
    fetchAmiibos: _ => dispatch(fetchAmiibos()),
    fetchType: _ => dispatch(fetchType())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);