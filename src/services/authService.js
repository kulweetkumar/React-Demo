import Http from 'Http';
import axios from 'axios';
import * as action from 'store/actions';

let adminApiPath = 'admin_api';
let apiPath = 'api';
//login
export function login(credentials) {
    return (dispatch) => new Promise((resolve, reject) => {
      Http.post(`${adminApiPath}/login`, credentials)
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
    Http.post(`${adminApiPath}/logout`, credentials)
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
    Http.get(`${adminApiPath}/profile`)
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
    Http.post(`${adminApiPath}/update_profile`, values)
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
    Http.post(`${adminApiPath}/change_password`, values)
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

export function resetForm(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${apiPath}/reset_password/`+values)
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

//user 
//list
export function getList(value) {
  let page = value.page;
  let sort = value.sortby;
  let search = value.search ? value.search : "";
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${adminApiPath}/${value.MODULE_NAME}/list?page=`+page+`&search_string=`+search+`&sort=`+sort)
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

export function getCategory(value) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${adminApiPath}/${value.MODULE_NAME}/get_categories`)
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

//view
export function getDetail(value) {
  return (dispatch) => new Promise((resolve, reject) => {
    let view = value.MODULE_NAME_VIEW ? value.MODULE_NAME_VIEW : 'view'
    Http.get(`${adminApiPath}/${value.MODULE_NAME}/${view}/`+value.id)
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

//add
export function createData(value) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${adminApiPath}/${value.MODULE_NAME}/add`, value)
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

//update
export function updateData(value) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${adminApiPath}/${value.MODULE_NAME}/update`, value)
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

//update status
export function updateStatus(value) {
  let id = value.id;
  let type = value.type;
  return (dispatch) => new Promise((resolve, reject) => {
    if(type == 'ADDS'){
      Http.post(`${adminApiPath}/${value.MODULE_NAME}/update_status`, value)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      }); 
    }
    else{
      Http.post(`${adminApiPath}/${value.MODULE_NAME}/update_status/`+id+`?type=`+type)
        .then((res) => resolve(res.data))
        .catch((err) => {
          const { status, data } = err.response;
          const res = {
            status,
            data,
          };
          return reject(res);
        });
      }
  });
}

//delete
export function deleteData(value) {
  return (dispatch) => new Promise((resolve, reject) => {
    let type = value.type;
  if(type == 'ADDS'){
    Http.post(`${adminApiPath}/${value.MODULE_NAME}/delete/`+value.id[0], value)
    .then((res) => resolve(res.data))
    .catch((err) => {
      const { status, data } = err.response;
      const res = {
        status,
        data,
      };
      return reject(res);
    });
  } else {
    Http.post(`${adminApiPath}/${value.MODULE_NAME}/delete/`+value.id)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { status, data } = err.response;
        const res = {
          status,
          data,
        };
        return reject(res);
      });
  }
  });
}

//delete img
export function deleteImgData(value) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${adminApiPath}/${value.MODULE_NAME}/delete_image`, value)
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
    Http.get(`${adminApiPath}/dashboard/get_data_count`)
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
export function getContent(value) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${adminApiPath}/${value.MODULE_NAME}/`+value.slug)
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

export function updateContent(values) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${adminApiPath}/cms/update`, values)
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
//updatePlan Status
export function updatePlanStatus(value) {
  let id = value.id;
  let status = value.is_subscribed ? value.is_subscribed : '';
  return (dispatch) => new Promise((resolve, reject) => {
    Http.post(`${adminApiPath}/${value.MODULE_NAME}/update_plan_status/`+id+`/`+status)
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

export function getUserBusiness(value) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${adminApiPath}/${value.MODULE_NAME}/get_business_user`)
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

export function getHomeBannerCat(value) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${adminApiPath}/${value.MODULE_NAME}/`+`${value.API_NAME}`)
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

export function getHomeBanner(value) {
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${adminApiPath}/${value.MODULE_NAME}/`+`${value.API_NAME}`)
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

export function getCategoriesHomeBanner(value) {
  let cat_name = value.cat_name ? value.cat_name : "";
  return (dispatch) => new Promise((resolve, reject) => {
    Http.get(`${adminApiPath}/${value.MODULE_NAME}/`+`${value.API_NAME}?cat_name=`+cat_name)
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

  export function getHomeBannerSubCat(value) {
    let cat_name = value.cat_name ? value.cat_name : "";
    let cat_id = value.cat_id ? value.cat_id : "";
    return (dispatch) => new Promise((resolve, reject) => {
      Http.get(`${adminApiPath}/${value.MODULE_NAME}/`+`${value.API_NAME}?cat_name=`+cat_name+`&cat_id=`+cat_id)
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