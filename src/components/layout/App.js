import React from "react";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

//imported
import Header from './Header';
import Sidebar from './Sidebar';

const App = (props) => {
  return (
	  	<>
			<div>
				<Helmet titleTemplate={`Demo App`} /> 
				<Header />
				<Sidebar />
				<main class="app-content">
					{React.cloneElement(props.children)}
				</main>
			</div>
		</>
  );
}

const mapStateToPros = (state) => {
    return{
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth,
    }
};

export default connect(
  mapStateToPros,
)(App);


