import React from "react";
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

const Profile = (props) => {
 
    return(
        <>
            <Helmet title="Dashboard" />
            <div className="app-title">
                <div>
                <h1><i className="fa fa-user"></i> Profile</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="tile">
                            <form>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input className="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Enter email" /><small className="form-text text-muted" id="emailHelp">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input className="form-control" id="exampleInputPassword1" type="password" placeholder="Password" />
                                </div>
                            </form>
                        <div className="tile-footer">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return{
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