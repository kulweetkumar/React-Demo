import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import classNames from "classnames";
import * as Path from 'routes/paths';
import AuthService from 'services';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

const UserView = (props) => {
    let UserId = props && props.match.params.id;
    const history = useHistory();
    const [data, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await props.dispatch(AuthService.getUserDetail(UserId));
                console.log(response)
                setUserData(response.body);
            } catch (error) {
                console.error('Error fetching user data:', error);
                history.push(Path.User);
            }
        };

        fetchData();
    }, [history]);



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
                                <h3 className="tile-title">User View</h3>
                            </div>
                            <div className="col-md-6 text-right">
                                <Link className={classNames("btn btn-primary", { 'active': (Path === Path.User) })} to={Path.User}><FontAwesomeIcon icon={faBackward} />
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="tile">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input className="form-control" value={data.name} type="text" id="name" name="name" />
                                                <small className="form-text text-muted"></small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input className="form-control" value={data.email} name="email" type="email" id="email" />
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="countryCode">Country Code</label>
                                                <input className="form-control" name="country_code" value={data.country_code} type="text" id="countryCode" />
                                                <small className="form-text text-muted" id="emailHelp"></small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone</label>
                                                <input className="form-control" name="phone" value={data.phone} type="number" id="phone" />
                                            </div>
                                            <div className="form-group">
                                                <img src={data.image} style={{ height: "70px", width: "70px" }} />
                                            </div>
                                            <div className="d-flex justify-content-end">
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
)(UserView);