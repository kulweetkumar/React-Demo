import React from "react";
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import classNames from "classnames";
import * as Path from '../../../../routes/paths';

const Profile = (props) => {
    let path = '/';

    return (
        <>
            <Helmet title="User" />
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-user-plus"></i> Users</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className="tile-title">Add User</h3>
                            </div>
                            




                        </div>
                           
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth,
    }
};

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);