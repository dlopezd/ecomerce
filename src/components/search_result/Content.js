import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ItemList from './ItemList'

const styles = {
    pagination: {
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        marginTop: '20px',
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
}

const Content = props => {
    const [page, setPage] = useState(1);
    const [orderBy, setOrderBy] = useState('name-asc');


    useEffect(() => {
        var currentPage = props.page ? props.page : 1;
        setPage(currentPage);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [props.amiibos]);

    const handlePageChange = (event, value) => {
        event.preventDefault();
        setPage(value);
    };

    const handleOrderChange = (event) => {
        event.preventDefault();
        setOrderBy(event.target.value);
    }

    let amiibos = props.amiibos;
    const itemPerPage = 20;

    // ORDENANDO ELEMENTOS
    var order = orderBy.split('-');
    amiibos = amiibos.sort((a, b) => { return a[order[0]].toString().localeCompare(b[order[0]].toString()) });
    amiibos = order[1] === 'asc' ? amiibos : amiibos.reverse();

    return (
        <Container style={styles.container}>
            <div style={styles.headerContent}>
                <Pagination
                    style={styles.pagination}
                    color="primary"
                    count={Math.ceil(amiibos.length / itemPerPage)}
                    page={page}
                    onChange={handlePageChange} />
                <FormControl>
                    <InputLabel shrink>Ordenar por</InputLabel>
                    <Select
                        value={orderBy}
                        onChange={handleOrderChange} >
                        <MenuItem value="name-asc">Nombre a - z</MenuItem>
                        <MenuItem value="name-desc">Nombre z - a </MenuItem>
                        <MenuItem value="price-asc">Precio ascendente</MenuItem>
                        <MenuItem value="price-desc">Precio descendente</MenuItem>
                    </Select>
                </FormControl>

            </div>
            <Grid container style={{ flexGrow: 1 }} spacing={2}>
                <Grid item >
                    <Grid container justify="space-around" spacing={2}>
                        {
                            amiibos
                                .slice((page - 1) * itemPerPage, (page - 1) * itemPerPage + itemPerPage)
                                .map(a => {
                                    return (
                                        <ItemList
                                            key={a.tail}
                                            amiibo={a} />
                                    )
                                })
                        }
                    </Grid>
                </Grid>
            </Grid>

            <Pagination
                style={styles.pagination}
                color="primary"
                count={Math.ceil(amiibos.length / itemPerPage)}
                page={page}
                onChange={handlePageChange} />
        </Container>
    );
}


export default Content;