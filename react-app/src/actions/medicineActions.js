import axios from "axios";
import {
  GET_ERRORS,
  GET_MEDICINES,
  GET_MEDICINE,
  DELETE_MEDICINE
} from "../actions/types";

export const createMedicine = (medicine, history) => async dispatch => {
  try {
    const res = await axios.post("/api/medicines", medicine);
    history.push("/pharmacy");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getMedicines = () => async dispatch => {
  const res = await axios.get("/api/medicines/all");
  dispatch({
    type: GET_MEDICINES,
    payload: res.data
  });
};

export const getMedicine = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/medicines/${id}`);
    dispatch({
      type: GET_MEDICINE,
      payload: res.data
    });
  } catch (error) {
    history.push("/pharmacy");
  }
};

export const deleteMedicine = id => async dispatch => {
  if (window.confirm("Are you sure you want delete this?")) {
    await axios.delete(`/api/medicines/${id}`);
    dispatch({
      type: DELETE_MEDICINE,
      payload: id
    });
  }
};
