import React, {useState, useEffect} from "react";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import AuthService from 'services';
import swal from 'sweetalert';
import env from 'env.json';
import { Field, reduxForm, reset } from 'redux-form';
import ImageUploader from 'react-images-upload';
import LoadingButton from 'components/shared/LoadingButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import resetPasswordValidation from 'components/validation/resetPasswordValidation';

const renderField = ({
    input,
    placeholder,
    type,
    disabled,
    meta: { touched, error, warning }
}) => (
    <>
        <input {...input} type={type} placeholder={placeholder} disabled={disabled} className="form-control"/>
        
        {touched &&
            (error && <span className="errorMessage">{error}</span>)
        }
    </>
)

const Setting = (props) => {

    const [load, setLoad] = useState(false);
    const [sending, setSending] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [data, setData] = useState({});
    const [image, setImage] = useState(null);
    const [dbImage, setDbImage] = useState({});

    //initialValues
    const initialValues = {
        email: data ? data.businessname : "",
        first_name: data ? data.categoryId : "",
        old_password: "",
        new_password: "",
        confirm_password: "",
    };
    const { handleSubmit, submitting} = props;

     //get data
    let isMounted = true;
    async function getData() {
        try{
            setLoad(true);
            await props.dispatch(AuthService.profile()).then((res) => {
                if(isMounted){
                    if(res.body){
                        props.dispatch(actions.persist_store({ editSetting:res.body}));
                    }
                    setLoad(false);
                    setData(res.body);
                    setDbImage(res.body.image);
                }
            });
 
        }catch(err) {
            setSending(false);
            setLoad(false);
            console.log(err);
            if(err && err.data && err.data.message){
                swal("Oops!", err.data.message, "error");
            }
        }
    }

    useEffect(() => {
        getData();
        return () => {
            isMounted = false;
        };
    }, []);

    //profile image 
    const profileImage = (picture, base64) => {
        setImage(picture[0]);
    }
    
    const updateProfile = async (values) => {
        try{
            const formData = new FormData(); 
            formData.append('image', image);
            formData.append('type', 'image');
            formData.append('folder', 'user');
           
            let data = {
                first_name : values ? values.first_name : props.initialValues.first_name,
                email : values ? values.email : props.initialValues.email,
            }
            if(image!=null){
                await props.dispatch(AuthService.fileUpload(formData)).then((res) => {
                    let profileImg = res.body;
                    data.image = JSON.stringify(profileImg)
                });
            }
            setSending(true);
            await props.dispatch(AuthService.updateProfile(data)).then((res) => {
                setSending(false);
                swal("Success", res.message, "success");
                getData();
            });
        }catch(err) {
             console.log(err);
             setSending(false);
              if(err && err.data && err.data.message){
                swal("Oops!", err.data.message, "error");
            }
        }
    }

    //update password
    const onSubmitPassword = async (values, { setSubmitting, resetForm }) => {
        try{ 
            setSending(true);
            await props.dispatch(AuthService.updatePassword(values)).then((res) => {
                setSending(false);
                swal("Success", res.message, "success");
                props.dispatch(reset('setting'));
                resetForm({});
            });
        }catch(err) {
             console.log(err);
             setSending(false);
              if(err && err.data && err.data.message){
                swal("Oops!", err.data.message, "error");
            }
        }
    }

    //Renderimages
	const renderImages = (name, buttonText) => {
        let defaultImage = '';
        if(dbImage && name==='image'){
            defaultImage = dbImage && dbImage.original ? env.SERVER_URL+dbImage.original : '';
        }
        return(
             <div className="profile_images_boxs">
                 <ImageUploader
                     name={name}
                     withIcon={false}
                     withPreview={true}
                     singleImage={true}
                     buttonText={buttonText}
                     onChange={(picture, base64) => profileImage(picture, base64, name)}
                     imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                     fileSizeError="file size is too big"
                     accept="accept=image/*"
                     label={<div className="label-image-profile">Choose Here</div>}
                    //  defaultImages={ defaultImage ? [defaultImage] : [] }
                 />
                    {(dbImage && dbImage.original) &&
                    <>
                        <img src={defaultImage} style={{width:'200px', height:'200px', marginBottom:'20px'}}/>
                    </>
                    }
             </div>
         )
    };

    //render profile content
    const _renderProfile = () => {
        return(
            <>
            <form onSubmit={handleSubmit(updateProfile)}>
                <div class="row">
                    <div class="col-md-8 mb-4">
                        <label>Name</label>
                        <Field 
                            name="first_name" 
                            component={renderField}
                            placeholder="Enter name"
                            type="text" 
                            autofocus
                        />
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-md-8 mb-4">
                        <label>Email</label>
                        <Field 
                            name="email" 
                            component={renderField}
                            placeholder="Enter email"
                            type="email" 
                            autofocus
                        />
                    </div>
                </div>
               
                {renderImages('image', <img src='/assets/images/upld.png' className="img-user" />)}

                <div className="row">
                    <div className="col-4 loading--submit-button">
                        <LoadingButton
                            type="submit"
                            className="btn btn-primary"
                            loading={sending}
                            disabled={submitting}
                        >
                        Update
                        </LoadingButton>
                    </div>
                </div>  
            </form>
            </>
        )
    }

    //render changepassword
    const _renderChangePassword = () => {
        return(
            <>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={resetPasswordValidation}
                onSubmit={onSubmitPassword}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div class="row">
                            <div class="col-md-8 mb-4">
                                <label>Old Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.errors && 'is-danger'}`}
                                    name="old_password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.old_password}
                                />
                                {(errors.old_password && touched.old_password) &&
                                    <p className="help is-danger">{errors.old_password}</p>
                                }
                            </div>
                            <div class="col-md-8 mb-4">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.errors && 'is-danger'}`}
                                    name="new_password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.new_password}
                                />
                                {(errors.new_password && touched.new_password) &&
                                    <p className="help is-danger">{errors.new_password}</p>
                                }
                            </div>
                            <div class="col-md-8 mb-4">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.errors && 'is-danger'}`}
                                    name="confirm_password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirm_password}
                                />
                                {(errors.confirm_password && touched.confirm_password) &&
                                    <p className="help is-danger">{errors.confirm_password}</p>
                                }
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4 loading--submit-button">
                                <LoadingButton
                                    type="submit"
                                    className="btn btn-primary"
                                    loading={sending}
                                    disabled={submitting}
                                >
                                    Update
                                </LoadingButton>
                            </div>
                        </div>  
                    </form>
                    )}
                </Formik>
            </>
        )
    }

    return(
        <>
        <Helmet title="Setting" />
            <div className="app-title">
                <div>
                <h1><i className="fa fa-cog"></i> Setting</h1>
                </div>
                <ul className="app-breadcrumb breadcrumb">
                <li className="breadcrumb-item"><i className="fa fa-cog fa-lg"></i></li>
                </ul>
            </div>
            <Tabs selectedIndex={tabIndex} onSelect={tabIndex  => setTabIndex(tabIndex)}>
            <div className="row user">
                <div className="col-md-3">
                    <div className="tile p-0">
                        <ul className="nav flex-column nav-tabs user-tabs">
                        <TabList>
                            <Tab className="nav-link">Profile</Tab>
                            <Tab className="nav-link">Change password</Tab>
                        </TabList>
                        </ul>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="tab-content">
                    <div class="tile user-settings">
                        <TabPanel>
                            <h4 class="line-head">Profile</h4>
                            {_renderProfile()}
                        </TabPanel>
                        <TabPanel>
                            <h4 class="line-head">Change Password</h4>
                            {_renderChangePassword()}
                        </TabPanel>
                        </div>
                    </div>
                </div>
            </div>
            </Tabs>

        </>
    )
}

const profileInitialValues = (values) => {	
	if(values) {
		return {
			...values,
			first_name: values.profile && values.profile.first_name  ? values.profile.first_name : "",
			email:values.profile && values.profile.email ? values.profile.email : "",
        }
	}
}
  
const mapStateToProps = (state) => {
    let val = {
        profile : state.persistStore.editSetting,
    }
    return{
        initialValues: profileInitialValues(val),
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth,
    }
};

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

const SettingForm = reduxForm({
    form: 'setting',
    enableReinitialize: true,
})(Setting);

export default connect(mapStateToProps, mapDispatchToProps)(SettingForm);
