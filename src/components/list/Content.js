import React from 'react'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            orderBy: 'name-asc'
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
    }

    componentDidMount() {
        var currentPage = this.props.page ? this.props.page : 1;
        this.setState({ ...this.state, page: currentPage });
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.amiibos.length !== nextProps.amiibos.length) {
            this.setState({ ...this.state, page: 1 });
        }
        return true;
    }

    handlePageChange = (event, value) => {
        event.preventDefault();
        this.setState({ ...this.state, page: value });
    };

    handleOrderChange = (event) => {
        event.preventDefault();
        this.setState({ ...this.state, orderBy: event.target.value });
    }


    render() {
        let amiibos = this.props.amiibos;
        const itemPerPage = 20;

        // ORDENANDO ELEMENTOS
        var order = this.state.orderBy.split('-');
        amiibos = amiibos.sort((a, b) => { return a[order[0]].toString().localeCompare(b[order[0]].toString()) });
        amiibos = order[1] === 'asc' ? amiibos : amiibos.reverse();

        return (
            <Container style={styles.container}>
                <div style={styles.headerContent}>
                    <Pagination
                        style={styles.pagination}
                        color="primary"
                        count={Math.ceil(amiibos.length / itemPerPage)}
                        page={this.state.page}
                        onChange={this.handlePageChange} />
                    <FormControl>
                        <InputLabel shrink>Ordenar por</InputLabel>
                        <Select
                            value={this.state.orderBy}
                            onChange={this.handleOrderChange} >
                            <MenuItem value="name-asc">Nombre ascendiente</MenuItem>
                            <MenuItem value="name-desc">Nombre descendiente</MenuItem>
                            <MenuItem value="price-asc">Precio ascendiente</MenuItem>
                            <MenuItem value="price-desc">Precio descendiente</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                <Grid container style={{ flexGrow: 1 }} spacing={2}>
                    <Grid item >
                        <Grid container justify="space-around" spacing={2}>
                            {
                                amiibos
                                    .slice((this.state.page - 1) * itemPerPage, (this.state.page - 1) * itemPerPage + itemPerPage)
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
                    page={this.state.page}
                    onChange={this.handlePageChange} />
            </Container>
        );
    }
}


export default Content;