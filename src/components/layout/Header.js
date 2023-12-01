import React from "react";
import { connect } from 'react-redux';
import classNames from 'classnames';
import { useHistory, Link } from 'react-router-dom';
import * as Path from '../../routes/paths';
import * as actions from 'store/actions';
import AuthService from 'services';
import swal from 'sweetalert';

const Header = ({user, dispatch, handleToggleSideBar}) => {

    //history
    const history = useHistory();

    const pathname = history.location.pathname.split('/');

    const filtered = pathname.filter(function (el) {
        if(el !== ""){
            return el;
        }
    });
    
    let path = '/';

    if(filtered.length>=2){
        path += filtered[0]+"/"+filtered[1];
    }
    else {
        path += filtered[0] ?? '';
    }

    //logout function
    const handleLogout = async () => {
        try{
            const authToken = user && user.user ? user.user.access_token  :'';
            await dispatch(AuthService.logout(authToken)).then((res) => {
                swal("Success", res.message, "success");
            });
        }catch(err) {
            console.log(err);
            dispatch(actions.persist_store({  loader:false }));
            if(err && err.data && err.data.message){
                swal("Oops!", err.data.message, "error");
            }
        }
    };

    return(
        <header className="app-header"><span className="app-header__logo">Demo App</span>
            <span className="app-sidebar__toggle" onClick={handleToggleSideBar} data-toggle="sidebar" aria-label="Hide Sidebar"></span>
            <ul className="app-nav">
                <li className="dropdown"><a className="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i className="fa fa-user fa-lg"></i></a>
                    <ul className="dropdown-menu settings-menu dropdown-menu-right">
                    <li>
                    </li>
                    <li><span className="dropdown-item logout-text"  onClick={handleLogout}><i className="fa fa-sign-out fa-lg"></i> Logout</span></li>
                    </ul>
                </li>
            </ul>
        </header>
    )
}

const mapStateToPros = (state) => {
    return{
        isAuthenticated: state.Auth.isAuthenticated,
        loader: state.persistStore.loader,
        user: state.Auth,
    }
};
function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(Header);
