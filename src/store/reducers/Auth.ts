import { EnumAuthAction } from '@/types/Auth';
import { TAuthAction, IAuthState } from '../types/Auth/Auth';
const initialState: IAuthState = {
  status: EnumAuthAction.AUTH_PENDING,
};
export const Auth = (state = initialState, action: TAuthAction): IAuthState => {
  switch (action.type) {
    case EnumAuthAction.AUTH_UNAUTHORIZED:
      return { ...state, status: EnumAuthAction.AUTH_UNAUTHORIZED };
    case EnumAuthAction.AUTH_ENTERED:
      return { ...state, status: EnumAuthAction.AUTH_ENTERED };
    default:
      return { ...state };
  }
};