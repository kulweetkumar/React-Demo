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
                    <h1><i className="fa fa-th-list"></i> Users</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className="tile-title">User Listing</h3>
                            </div>
                            <div className="col-md-6 text-right">
                            <Link className={classNames("btn btn-primary", { 'active': (path === Path.UserAdd) })} to={Path.UserAdd}><i className="fa fa-user-plus"></i> User</Link>
                            </div>
                        </div>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Status</th>
                                            <th>Image</th>
                                            <th style={{ minWidth: '122px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                           
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