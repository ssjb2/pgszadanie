import { GET_MEDICINES, GET_MEDICINE, DELETE_MEDICINE } from "../actions/types";

const initialState = {
  medicines: [],
  medicine: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEDICINES:
      return {
        ...state,
        medicines: action.payload
      };

    case GET_MEDICINE:
      return {
        ...state,
        medicine: action.payload
      };
    case DELETE_MEDICINE:
      return {
        ...state,
        medicines: state.medicines.filter(
          medicine => medicine.id !== action.payload
        )
      };

    default:
      return state;
  }
}
