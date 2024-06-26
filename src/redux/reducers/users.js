import { TURN_OF_SPINNER } from "../actions";
import { GET_PROFILE, UPDATE_PROFILE } from "../actions/userAction";

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
    phone: "",
    avatarURL: "",
  },
  isLoading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
          phone: action.payload.phone,
          avatarURL: action.payload.avatarURL,
        },
      };

    case TURN_OF_SPINNER:
      return {
        ...state,
        isLoading: false,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.field]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
