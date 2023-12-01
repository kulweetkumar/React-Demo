import React, {useState} from "react";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Path from '../../../../routes/paths';
import { Field, reduxForm } from 'redux-form';
import LoadingButton from 'components/shared/LoadingButton';
import AuthService from 'services';
import swal from 'sweetalert';
import * as actions from 'store/actions';

const renderField = ({
    input,
    placeholder,
    type,
    autoComplete,
    meta: { touched, error, warning }
}) => (
    <>
        <input {...input} type={type} placeholder={placeholder} autoComplete={autoComplete} className="form-control"/>
        
        {touched &&
            (error && <span className="errorMessage">{error}</span>)
        }
    </>
)

const Register = (props) => {

    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const { handleSubmit, submitting} = props;

    const [values, setValues] = useState({
        email:"",
        password:"",
    });

    const handleSubmit_ = async (values) => {
        try{
            setSending(true);
            props.dispatch(actions.persist_store({ loader:true }));
            values['role'] = 1;
            await props.dispatch(AuthService.login(values)).then((res) => {
                setSending(false);
                props.dispatch(actions.persist_store({  loader:true }));
                swal("Success", res.message, "success");
                setSuccess(true);
            });
        }catch(err) {
            props.dispatch(actions.persist_store({ loader:false }));
            console.log(err);
            setSending(false);
            if(err && err.data && err.data.message){
                swal("Oops!", err.data.message, "error");
            }
        }
    }
    return (
        <>
          {success === true && <Redirect to={Path.Dashboard} />}
          <Helmet title="Register" />
          <section className="material-half">
            <div className="cover"></div>
          </section>
          <section className="login-content">
            <div className="logo">
              <h1>Demo App</h1>
            </div>
            <div className="signup-box">
              <form className="login-form" onSubmit={handleSubmit(handleSubmit_)} autoComplete="off">
                <h3 className="login-head"><i className="fa fa-lg fa-fw fa-user"></i>SIGN UP</h3>
                <div className="form-group">
                  <label className="control-label">Name</label>
                  <Field name="name" component={renderField} placeholder="Name" type="text" autoComplete="off" />
                </div>
                <div className="form-group">
                  <label className="control-label">E-Mail</label>
                  <Field name="email" component={renderField} placeholder="E-Mail" type="email" autoComplete="off" />
                </div>
                <div className="form-group">
                  <label className="control-label">Phone</label>
                  <Field name="phone" component={renderField} placeholder="Phone" type="text" autoComplete="off" />
                </div>
                <div className="form-group">
                  <label className="control-label">Password</label>
                  <Field name="password" component={renderField} placeholder="Password" type="password" autoComplete="new-password" />
                </div>
                {/* Add password confirmation field here if needed */}
                <div className="form-group btn-container">
                  <LoadingButton type="submit" className="btn btn-primary btn-block" loading={sending} disabled={submitting}>
                    <i className="fa fa-user-plus fa-lg fa-fw"></i>SIGN UP
                  </LoadingButton>
                </div>
              </form>
            </div>
          </section>
        </>
      );
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
})(Register);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);