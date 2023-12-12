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
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input className="form-control" type="text" id="name" placeholder="Enter Name" />
                                        <small className="form-text text-muted"></small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" type="email" id="email" placeholder="Enter Email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Password</label>
                                        <input className="form-control" type="password" id="password" placeholder="Enter Password" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="countryCode">Country Code</label>
                                        <input className="form-control" type="text" id="countryCode" placeholder="Enter Country Code" />
                                        <small className="form-text text-muted" id="emailHelp"></small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input className="form-control" type="number" id="phone" placeholder="Enter Phone" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Image</label>
                                        <input className="form-control" type="file" id="image" placeholder="Enter Phone" />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-primary" type="submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

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