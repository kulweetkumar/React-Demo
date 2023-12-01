import * as ActionTypes from 'store/action-types';

export function authLogin(payload) {
  return {
    type: ActionTypes.AUTH_LOGIN,
    payload,
  };
}

export function authCheck() {
    return {
      type: ActionTypes.AUTH_CHECK,
    };
}

export function authLogout() {
  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
}

export function profile(payload) {
  return {
    type: ActionTypes.PROFILE,
    payload
  };
}
export function persist_store(payload) {
    return {
      type: ActionTypes.PERSIST_STORE,
        payload
    };
}