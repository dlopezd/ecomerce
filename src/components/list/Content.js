import React from 'react'
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Error from '../Error'
import Loader from '../Loader'
import { fetchAmiibos } from '../../redux/amiibo/ActionCreators'

class Content extends React.Component {

    componentDidMount(){
        this.props.fetchAmiibos();
    }

    render () {
        return (
            this.props.amiiboState.isLoading ? <Loader /> :
            this.props.amiiboState.ErrMess ? <Error msg={this.props.amiiboState.ErrMess} /> :
            <Container style={{marginTop: '20px'}}>
                <Grid container style={{flexGrow: 1}} spacing={2}>
                    <Grid item >
                        <Grid container justify="space-around" spacing={2}>
                        
                        </Grid>
                    </Grid>
                </Grid>
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