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
    const [data, setUserData] = useState({ profile: [] });
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [isStatusVisible, setIsStatusVisible] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [UserIdToStatus, setUserIdToStatus] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const showAlert = (id) => {
        setUserIdToDelete(id);
        setAlertVisible(true);
    };
    const showStatusAlert = (id, status) => {
        let query = {
            id: id, status: status, model: "users"
        }
        setUserIdToStatus(query);
        setIsStatusVisible(true);
    };
    const fetchData = async (page) => {
        try {
            let queryData = {
                page: page ? page : 1,
                limit: 15
            }
            const response = await props.dispatch(AuthService.getUser(queryData));
            setUserData(response.body);
            setTotalPages(response.body.totalPages);
            setCurrentPage(response.body.currentPage);
            history.push(Path.User);
        } catch (error) {
            console.error('Error fetching user data:', error);
            history.push(Path.User);
        }
    };
    const handlePageChange = (page) => {
        fetchData(page);
    };
    const hideAlert = () => {
        setAlertVisible(false);
        setIsStatusVisible(false)
    };
    const deleteUser = async () => {
        try {
            const response = await props.dispatch(AuthService.deleteUser(userIdToDelete));
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
        fetchData(1);
    }, [history]);
    let NewData = data.profile;
    const itemsPerPage = 15; // Adjust the page size based on your requirements


    
    const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
        const showPageNumbers = 3;
      
        const renderPageNumbers = () => {
          const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      
          if (totalPages <= showPageNumbers) {
            return pages.map((page) => (
              <button
                key={page}
                className={classNames("btn", { active: page === currentPage })}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ));
          } else {
            const startPage = Math.max(1, currentPage - 1);
            const endPage = Math.min(startPage + showPageNumbers - 1, totalPages);
      
            return (
              <>
                {currentPage > 1 && (
                  <button className="btn" onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                  </button>
                )}
                {pages.slice(startPage - 1, endPage).map((page) => (
                  <button
                    key={page}
                    className={classNames("btn", { active: page === currentPage })}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                {currentPage < totalPages && (
                  <button className="btn" onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                  </button>
                )}
              </>
            );
          }
        };
      
        return <div className="pagination">{renderPageNumbers()}</div>;
      };
      
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

                                    {NewData.map((index, value) => (
                                        <tr key={index.id}>
                                            <td>{(currentPage - 1) * itemsPerPage + value + 1}</td>
                                            <td>{index.name}</td>
                                            <td>{index.email}</td>
                                            <td>{index.country_code + index.phone}</td>
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
                                            onConfirm={deleteUser}
                                            onCancel={hideAlert}
                                            customClass="custom-sweet-alert"

                                        >
                                            You won't be able to revert this!
                                        </SweetAlert>
                                    )}
                                    {isStatusVisible && (
                                        <SweetAlert
                                            title="Are you sure?
                                            You want to changes user status"
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
                            <div className="pagination">
                            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />

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