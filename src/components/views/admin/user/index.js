import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import classNames from "classnames";
import * as Path from 'routes/paths';
import AuthService from 'services';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
import swal from 'sweetalert';

const Profile = (props) => {

    const history = useHistory();
    const [data, setUserData] = useState([]);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const showAlert = (id) => {
        setUserIdToDelete(id);
        setAlertVisible(true);
    };  
    const fetchData = async () => {
        try {
            const response = await props.dispatch(AuthService.getUser());
            setUserData(response.body);
            history.push(Path.User);
        } catch (error) {
            console.error('Error fetching user data:', error);
            history.push(Path.User);
        }
    };
    const hideAlert = () => {
        setAlertVisible(false);
    };
    const deleteUser = async() => {
            try {
                const response = await props.dispatch(AuthService.deleteUser(userIdToDelete));
                hideAlert()
                fetchData()
            } catch (err) {
                swal("Oops!", err.data.message, "error");
                history.push(Path.User);
            }
    };

    useEffect(() => {
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
                                <h3 className="tile-title">User Listing</h3>
                            </div>
                            <div className="col-md-6 text-right">
                                <Link className={classNames("btn btn-primary", { 'active': (Path === Path.UserAdd) })} to={Path.UserAdd}><i className="fa fa-user-plus"></i> User</Link>
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
                                    {data.map((index, value) => (
                                        <tr>
                                            <td>{value + 1}</td>
                                            <td>{index.name}</td>
                                            <td>{index.email}</td>
                                            <td>{index.country_code + index.phone}</td>
                                            <td>{index.status}</td>
                                            <td><img src={index.image} style={{ height: "70px", width: "70px" }} /></td>
                                            <td >
                                                <Link title="Edit" to={`${Path.UserEdit}/${index.id}`}>

                                                    <FontAwesomeIcon icon={faEdit} style={{ 'marginRight': '10px', 'height': "16px" }} />
                                                </Link>
                                                <Link title="View" to={`${Path.UserView}/${index.id}`}>
                                                    <FontAwesomeIcon icon={faEye} style={{ marginRight: '10px', height: '16px' }} />
                                                </Link>
                                                <Link
                                                    title="Delete"
                                                    onClick={() => showAlert(index.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} style={{ 'height': '16px' }} />
                                                </Link>

                                            </td>
                                        </tr>
                                    ))}
                                    {isAlertVisible && (
                                        <SweetAlert
                                            title="Are you sure?"
                                            warning
                                            showCancel
                                            confirmBtnText="Yes, delete it!"
                                            confirmBtnBsStyle="danger"
                                            cancelBtnText="Cancel"
                                            onConfirm={deleteUser}
                                            onCancel={hideAlert}
                                            customClass="custom-sweet-alert" 

                                        >
                                            You won't be able to revert this!
                                        </SweetAlert>
                                    )}
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