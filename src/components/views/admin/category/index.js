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
import { deleteCategory } from 'services/authService';

const Category = (props) => {

    const history = useHistory();
    const [data, setcategoryData] = useState([]);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [isStatusVisible, setIsStatusVisible] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [UserIdToStatus, setUserIdToStatus] = useState({});

    const showAlert = (id) => {
        setUserIdToDelete(id);
        setAlertVisible(true);
    };
    const showStatusAlert = (id, status) => {
        let query = {
            id: id, status: status,model:"categories"
        }
        setUserIdToStatus(query);
        setIsStatusVisible(true);
    };
    const fetchData = async () => {
        try {
            const response = await props.dispatch(AuthService.getCategory());
            setcategoryData(response.body);
            // history.push(Path.User);
        } catch (error) {
            console.error('Error fetching user data:', error);
            // history.push(Path.User);
        }
    };
    const hideAlert = () => {
        setAlertVisible(false);
        setIsStatusVisible(false)
    };
    const deleteCategory = async () => {
        try {
            const response = await props.dispatch(AuthService.deleteCategory(userIdToDelete));
            hideAlert()
            fetchData()
        } catch (err) {
            swal("Oops!", err.data.message, "error");
            history.push(Path.User);
        }
    };
    const handleStatusChange = async () => {
        try {
            await props.dispatch(AuthService.updateStatus(UserIdToStatus)).then((res) => {
                swal("Success!", res.message, "success");
                fetchData();
                hideAlert()
            });
        } catch (err) {
            console.log(err);
            if (err && err.data && err.data.message) {
                swal("Oops!", err.data.message, "error");
                history.push(Path.UserAdd);
            }
        }
    }
    useEffect(() => {
        fetchData();
    }, [history]);


    return (
        <>

            <Helmet title="User" />
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-th-list"></i> Categories</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className="tile-title">Category Listing</h3>
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
                                            <td>
                                                {index.status === 1 ? (
                                                    <Link className="btn btn-primary"
                                                        title="Status"
                                                        onClick={() => showStatusAlert(index.id, 0)}
                                                    >
                                                        Active
                                                    </Link>
                                                ) : (
                                                    <Link className="btn btn-secondary"
                                                        title="Status"
                                                        onClick={() => showStatusAlert(index.id, 1)}
                                                    >
                                                        In-Active
                                                    </Link>

                                                )}
                                            </td>
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
                                            onConfirm={deleteCategory}
                                            onCancel={hideAlert}
                                            customClass="custom-sweet-alert"

                                        >
                                            You won't be able to revert this!
                                        </SweetAlert>
                                    )}
                                    {isStatusVisible && (
                                        <SweetAlert
                                            title="Are you sure?
                                            You want to changes Category status"
                                            warning
                                            showCancel
                                            confirmBtnText="Yes, Change It!"
                                            confirmBtnBsStyle="danger"
                                            cancelBtnText="Cancel"
                                            onConfirm={handleStatusChange}
                                            onCancel={hideAlert}
                                            customClass="custom-sweet-alert"
                                        >
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
)(Category);