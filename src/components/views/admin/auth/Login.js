import React, { useState } from "react";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Path from '../../../../routes/paths';
import { Field, reduxForm } from 'redux-form';
import LoadingButton from 'components/shared/LoadingButton';
import AuthService from 'services';
import swal from 'sweetalert';
import * as actions from 'store/actions';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';
const renderField = ({
    input,
    placeholder,
    type,
    autoComplete,
    meta: { touched, error, warning }
}) => (
    <>
        <input {...input} type={type} placeholder={placeholder} autoComplete={autoComplete} className="form-control" />

        {touched &&
            (error && <span className="errorMessage">{error}</span>)
        }
    </>
)

const Login = (props) => {

    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const { handleSubmit, submitting } = props;


    const handleSubmit_ = async (values) => {
        try {
            setSending(true);
            props.dispatch(actions.persist_store({ loader: true }));
            values['role'] = 1;
            await props.dispatch(AuthService.login(values)).then((res) => {
                setSending(false);
                props.dispatch(actions.persist_store({ loader: true }));
                swal("Success", res.message, "success");
                setSuccess(true);
            });
        } catch (err) {
            props.dispatch(actions.persist_store({ loader: false }));
            console.log(err);
            setSending(false);
            if (err && err.data && err.data.message) {
                swal("Oops!", err.data.message, "error");
            }
        }
    }

    return (
        <>
            {success == true &&
                <Redirect to={Path.Dashboard} />
            }
            <Helmet title="Login" />
            <section className="material-half">
                <div className="cover"></div>
            </section>
            <section className="login-content">
                <div className="logo">
                    <h1>Demo App</h1>
                </div>
                <div className="login-box">
                    <form className="login-form" onSubmit={handleSubmit(handleSubmit_)} autoComplete="off">
                        <h3 className="login-head"><i className="fa fa-lg fa-fw fa-user"></i>SIGN IN</h3>
                        <div className="form-group">
                            <label className="control-label">E-Mail</label>
                            <Field
                                name="email"
                                component={renderField}
                                placeholder="E-Mail"
                                type="email"
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">PASSWORD</label>
                            <Field
                                name="password"
                                component={renderField}
                                placeholder="Password"
                                type="password"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="form-group">
                        </div>
                        <div className="form-group btn-container">
                            <LoadingButton
                                type="submit"
                                className="btn btn-primary btn-block"
                                loading={sending}
                                disabled={submitting}
                            >
                                <i className="fa fa-sign-in fa-lg fa-fw"></i>SIGN IN
                            </LoadingButton>
                        </div>
                        <div className="form-group btn-container-account">
                            <Link className={classNames("app")} to={Path.Signup}>
                               
                                <span className="app-menu__label">Create your Account <i className="fa fa-sign-in fa-lg fa-fw"></i></span>
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
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
const validate = (values) => {
    const errors = {}
    //email
    if (!values.email) {
        errors.email = 'Email Required'
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    //password
    if (!values.password) {
        errors.password = 'Password Required'
    }
    else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or greater'
    }
    return errors
}
const LoginForm = reduxForm({
    form: 'login',
    validate
})(Login);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);