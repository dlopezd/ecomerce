import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Error from '../Error'
import Loader from '../Loader'
import { fetchType } from '../../redux/type/ActionCreators'
import { fetchAmiibos } from '../../redux/amiibo_list/ActionCreators'
import Content from './Content';
import Filters from '../filters/Filters';

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

const SearchResult = props => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const amiiboListState = useSelector(state => state.amiiboListState);
    const filterState = useSelector(state => state.filterState);

    useEffect(() => {
        if (!amiiboListState.amiibos) {
            dispatch(fetchAmiibos())
        }
        if (!filterState.typeOptions)
            dispatch(fetchType())
    }, []);

    // BUSQUEDA
    let filteredResults = (amiiboListState.isLoading || amiiboListState.ErrMess || !amiiboListState.amiibos) ? [] :
        !filterState.searchText ? amiiboListState.amiibos :
            amiiboListState.amiibos.filter(a =>
                a.name.toLowerCase().includes(filterState.searchText.toLowerCase()) ||
                a.character.toLowerCase().includes(filterState.searchText.toLowerCase()) ||
                a.amiiboSeries.toLowerCase().includes(filterState.searchText.toLowerCase()) ||
                a.gameSeries.toLowerCase().includes(filterState.searchText.toLowerCase()));

    // DETERMINANDO FILTROS POR TIPO
    if (filterState.typeOptions) {
        const incluAllTypes = Object.values(filterState.typeOptions).every(v => v == false);
        const typeFilters = incluAllTypes ? Object.keys(filterState.typeOptions) :
            Object.keys(filterState.typeOptions).filter(k => filterState.typeOptions[k]);

        // APLICANDO FILTROS POR TIPO
        if (JSON.stringify(typeFilters) !== JSON.stringify([])) {
            filteredResults = filteredResults.filter(a => typeFilters.some(t => a.type === t))
        }
    }

    // APLICANDO FILTRO POR PRECIO
    filteredResults = filteredResults.filter(a => a.price >= filterState.minPrice && a.price <= filterState.maxPrice)

    return (
        amiiboListState.isLoading ? <Loader /> :
            amiiboListState.ErrMess ? <Error msg={amiiboListState.ErrMess} /> :
                <Container style={styles.container}>
                    <Grid container style={styles.filters} spacing={2}>
                        <Grid item >
                            <Filters />
                        </Grid>
                    </Grid>
                    <Grid container style={{ flexGrow: 1 }} spacing={2}>
                        <Grid item >
                            <Content
                                page={page}
                                amiibos={filteredResults} />
                        </Grid>
                    </Grid>
                </Container>
    );
}

export default SearchResult;