import React, { useContext } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import NavBar from './NavBar'
import SearchResult from './search_result/SearchResult';
import Details from './details/Details';
import Checkout from './checkout/Checkout';

const App = _ => {

	return (
		<>
			<NavBar />
			<Switch>
				<Route exact path='/amiibo/:id' render={
					({ match }) => {
						const id = match.params.id;
						return (
							<Details
								id={id} />);
					}} />
				} />
				<Route exact path='/checkout' component={Checkout} />
				<Route exact path='/' component={SearchResult} />
			</Switch>
		</>
	);
}

export default withRouter(App);
