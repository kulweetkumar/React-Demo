import Http from 'Http';
import * as action from 'store/actions';

let apiPath = 'api';
//login
export function login(credentials) {
    return (dispatch) => new Promise((resolve, reject) => {
      Http.post(`${apiPath}/login`, credentials)
        .then((res) => {
          dispatch(action.authLogin(res.data));
          return resolve(res.data);
        })
        .catch((err) => {
          const { status, data } = err.response;
          const res = {
            status,
            data,
          };
          return reject(res);
        });
    });
}

//logout
export function logout(credentials) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${apiPath}/logout`, credentials)
      .then((res) => {
        dispatch(action.authLogout(res.data));
        return resolve(res.data);
      })
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}

//get profile
export function profile() {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${apiPath}/profile`)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}

//update profile
export function updateProfile(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${apiPath}/update_profile`, values)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}

//update password
export function updatePassword(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${apiPath}/change_password`, values)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}

//reset password
export function resetPassword(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${apiPath}/update_reset_password`, values)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}

//upload file
export function fileUpload(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${apiPath}/file_upload`, values)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}
//dashboard
export function dashboardCount() {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${apiPath}/get_data_count`)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}
//Create User
export function createUser(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${apiPath}/signup`, values)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}
// get user list 
export function getUser(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    const page = parseInt(values.page, 10) || 1;
    const limit = parseInt(values.limit, 10) || 10;
    Http.get(`${apiPath}/getuser?page=${page}&limit=${limit}`)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}
// get user detail
export function getUserDetail(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${apiPath}/getUserDetail?id=${values}`)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}
// delete user 
export function deleteUser(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.delete(`${apiPath}/delete_user/${values}`)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}
export function deleteCategory(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.delete(`${apiPath}/delete_category/${values}`)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}


export function updateStatus(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${apiPath}/update_status`,values)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}

export function getCategory(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${apiPath}/getcategory`)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  });
}

//cms