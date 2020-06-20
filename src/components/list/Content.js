import React from 'react'
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

import Error from '../Error'
import Loader from '../Loader'
import ItemList from './ItemList'
import { fetchAmiibos } from '../../redux/amiibo/ActionCreators'

const styles = {
    pagination : {
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
        this.props.fetchAmiibos();
        var currentPage = this.props.page ? this.props.page : 1;
        this.setState({ ...this.state, page: currentPage });
    }

    handlePageChange = (event, value) => {
        event.preventDefault();
        this.setState({ ...this.state, page: value });
    };


    render() {
        const amiiboState = this.props.amiiboState;
        const itemPerPage = 20;
        return (
            amiiboState.isLoading ? <Loader /> :
                amiiboState.ErrMess ? <Error msg={amiiboState.ErrMess} /> :
                    <Container style={styles.container}>
                        <Pagination
                            style={styles.pagination}
                            color="primary"
                            count={Math.ceil(amiiboState.amiibos.length / itemPerPage)}
                            page={this.state.page}
                            onChange={this.handlePageChange} />
                        <Grid container style={{ flexGrow: 1 }} spacing={2}>
                            <Grid item >
                                <Grid container justify="space-around" spacing={2}>
                                    {
                                        amiiboState.amiibos
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
                            count={Math.ceil(amiiboState.amiibos.length / itemPerPage)}
                            page={this.state.page}
                            onChange={this.handlePageChange} />
                    </Container>
        );
    }
}

const mapStateToProps = state => ({
    amiiboState: state.amiiboState
});

const mapDispatchToProps = dispatch => ({
    fetchAmiibos: _ => dispatch(fetchAmiibos())
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);