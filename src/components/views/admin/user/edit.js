import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import AuthService from 'services';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import * as Path from 'routes/paths';
import { Field, reduxForm, reset } from 'redux-form';
import LoadingButton from 'components/shared/LoadingButton';
const UserEdit = (props) => {

    let UserId = props && props.match.params.id;

    const { handleSubmit, submitting } = props;
    const [EditData, setData] = useState({});
    const [sending, setSending] = useState(false);
    const [data, setUserData] = useState({});
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await props.dispatch(AuthService.getUserDetail(UserId));
                setData(response.body);
            } catch (error) {
                console.error('Error fetching user data:', error);
                history.push(Path.User);
            }
        };

        fetchData();
    }, [history]);


    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setData({
                ...data,
                [e.target.name]: e.target.files,
            });

            const file = e.target.files[0];
            if (file ) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setUserData({
                        ...data,
                        image: reader.result,
                    });
                };
                reader.readAsDataURL(file);
            }
        } else {
                setData({
                    ...data,
                    [e.target.name]: e.target.value,
                });
        }
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
            // await props.dispatch(AuthService.createEdit(formData)).then((res) => {
            //     setSending(false);
            //     swal("Success!", res.message, "success");
            //     history.push(Path.User);
            // });

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
                    <h1><i className="fa fa-user"></i> Users</h1>
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
                                        <input className="form-control" type="text" id="name" name="name" onChange={(e) => handleChange(e)} placeholder="Enter Name" value={EditData.name} />
                                        <small className="form-text text-muted"></small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" disabled readOnly name="email" onChange={(e) => handleChange(e)} type="email" id="email" placeholder="Enter Email" value={EditData.email} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Image</label>
                                        <input
                                            className="form-control"
                                            onChange={(e) => handleChange(e)}
                                            type="file"
                                            id="file"
                                            name="image"
                                            placeholder="Select Image"
                                        />
                                  
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="countryCode">Country Code</label>
                                        <input className="form-control" name="country_code" onChange={(e) => handleChange(e)} type="text" id="countryCode" placeholder="Enter Country Code" value={EditData.country_code} />
                                        <small className="form-text text-muted" id="emailHelp"></small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input className="form-control" name="phone" onChange={(e) => handleChange(e)} type="number" id="phone" value={EditData.phone} placeholder="Enter Phone" />
                                    </div>
                                    <div className="form-group">
                                        <img src={EditData.image} style={{ height: "70px", width: "70px" }} />
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