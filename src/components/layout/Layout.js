import React, {useState} from "react";
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
//imported
import Header from './Header';
import Sidebar from './Sidebar';
const Layout = (props) => {

    const [showSidebar,setShowSidebar] = useState(false);
    const handleToggleSideBar = () => setShowSidebar(!showSidebar);
 
    return(
        <body className={`app sidebar-mini ${showSidebar ? 'sidenav-toggled' : ''}`}>
            <Helmet titleTemplate={`Demo App`} /> 
            <Header handleToggleSideBar={handleToggleSideBar} />
            <Sidebar />
            <main class="app-content">
                {React.cloneElement(props.children)}
            </main>
        </body>
    )
}

const mapStateToPros = (state, props) => {
    return{
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth,
    }
};

export default connect(
  mapStateToPros,
)(Layout);



