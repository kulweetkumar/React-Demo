import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const resetPasswordValidation = Yup.object({
    old_password: Yup.string().trim().required("Please enter your old password"),
    new_password: Yup.string().trim().min(6, "Enter atleast 6 character").required("Please enter your new password"),
    confirm_password: Yup.string().trim()
        .oneOf([Yup.ref("new_password")], "Confirm Password doesn't match with password")
        .required("Please enter your confirm password"),
 });

export default resetPasswordValidation;