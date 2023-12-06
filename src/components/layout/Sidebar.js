import React from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import classNames from "classnames";
import * as Path from '../../routes/paths';

const Sidebar = ({ user, userProfile }) => {

    //history
    const history = useHistory();

    const pathname = history.location.pathname.split('/');


    const filtered = pathname.filter(function (el) {
        if (el !== "") {
            return el;
        }
    });

    let path = '/';

    if (filtered.length >= 2) {
        path += filtered[0] + "/" + filtered[1];
    }
    else {
        path += filtered[0] ?? '';
    }
    return (
        <>
            <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
            <aside className="app-sidebar">

                <ul className="app-menu">
                    <li>
                        <Link className={classNames("app-menu__item", { 'active': (path === Path.Dashboard) })} to={Path.Dashboard}><i className="app-menu__icon fa fa-dashboard"></i><span className="app-menu__label">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={classNames("app-menu__item", { 'active': (path === Path.User) })} to={Path.User}><i className="app-menu__icon fa fa-users"></i><span className="app-menu__label">User</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    )
}

const mapStateToPros = (state, props) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        loader: state.persistStore.loader,
        userProfile: state.persistStore.editSetting,
        user: state.Auth,
    }
};

export default connect(
    mapStateToPros,
)(Sidebar);
