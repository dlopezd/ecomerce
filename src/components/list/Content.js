import React from 'react'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

import ItemList from './ItemList'
import { fetchAmiibos } from '../../redux/amiibo/ActionCreators'

const styles = {
    pagination: {
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        marginTop: '20px',
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };

        this.handlePageChange = this.handlePageChange.bind(this);
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


    render() {
        const amiibos = this.props.amiibos;
        const itemPerPage = 20;

        return (
            <Container style={styles.container}>
                <div>
                    <Pagination
                        style={styles.pagination}
                        color="primary"
                        count={Math.ceil(amiibos.length / itemPerPage)}
                        page={this.state.page}
                        onChange={this.handlePageChange} />


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