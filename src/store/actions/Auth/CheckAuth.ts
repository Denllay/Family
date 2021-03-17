import { Dispatch } from 'react';
import { app } from '../../../firebase/config';
import { EnumAuthAction, TAuthAction } from '../../types/Auth/Auth';

export const CheckAuth = () => {
  return async (dispatch: Dispatch<TAuthAction>) => {
    try {
      app.auth().onAuthStateChanged((user) => {
        if (!!user) {
          // При не авторизованном юзере user = null, а авторизованный user = object
          dispatch({ type: EnumAuthAction.AUTH_ENTERED });
        } else {
          dispatch({ type: EnumAuthAction.AUTH_UNAUTHORIZED });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};
