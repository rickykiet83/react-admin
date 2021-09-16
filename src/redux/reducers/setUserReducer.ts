import { User } from './../../models/user.model';
const initialState = {
  user: new User(),
}

export const setUserReducer = (state = initialState, action: { type: string, user: User }) => {

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: initialState.user
      }

    default:
      return state;
  }

}