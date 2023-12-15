import React, { useState } from "react";
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import AuthService from 'services';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import * as Path from 'routes/paths';
import { Field, reduxForm, reset } from 'redux-form';
import LoadingButton from 'components/shared/LoadingButton';
const UserEdit = (props) => {
    const { handleSubmit, submitting } = props;
    const [data, setData] = useState({});
    const [sending, setSending] = useState(false);
    const history = useHistory();
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        });
    };
    const handleSubmit_ = async () => {
        try {
            const formData = new FormData();
            let query = {
                image: data ? data.image[0] : '',
                name: data ? data.name : '',
                email: data ? data.email : '',
                country_code: data ? data.country_code : '',
                phone: data ? data.phone : '',
                password: data ? data.password : '',
                role: 2,
                device_token: "device_token",
                device_type: 1,
            };

            Object.keys(query).forEach(key => {
                formData.append(key, query[key]);
            });
            await props.dispatch(AuthService.createEdit(formData)).then((res) => {
                setSending(false);
                swal("Success!", res.message, "success");
                history.push(Path.User);
            });

        } catch (err) {
            console.log(err);
            setSending(false);
            if (err && err.data && err.data.message) {
                swal("Oops!", err.data.message, "error");
                history.push(Path.UserAdd);
            }
        }
    }
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
                        <form onSubmit={handleSubmit(handleSubmit_)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input className="form-control" type="text" id="name" name="name" onChange={(e) => handleChange(e)} placeholder="Enter Name" />
                                        <small className="form-text text-muted"></small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" name="email" onChange={(e) => handleChange(e)} type="email" id="email" placeholder="Enter Email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Password</label>
                                        <input className="form-control" name="password" onChange={(e) => handleChange(e)} type="password" id="password" placeholder="Enter Password" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="countryCode">Country Code</label>
                                        <input className="form-control" name="country_code" onChange={(e) => handleChange(e)} type="text" id="countryCode" placeholder="Enter Country Code" />
                                        <small className="form-text text-muted" id="emailHelp"></small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input className="form-control" name="phone" onChange={(e) => handleChange(e)} type="number" id="phone" placeholder="Enter Phone" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Image</label>
                                        <input className="form-control" onChange={(e) => handleChange(e)} type="file" id="file" name="image" placeholder="Select Image" />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <LoadingButton
                                            type="submit"
                                            className="btn btn-primary"
                                            loading={sending}
                                            disabled={submitting}>
                                            Submit
                                        </LoadingButton>
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

const UserForm = reduxForm({
    form: 'User',
    enableReinitialize: true,
})(UserEdit);
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);