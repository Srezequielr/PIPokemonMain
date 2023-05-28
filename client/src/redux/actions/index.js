import axios from "axios";
import {
  CLEAN_DETAIL,
  GET_ALL_POKEMONS,
  GET_POKEDETAILS,
  GET_TYPES,
  CLEAN_POKEMONS,
} from "./types";

export const getAllPokemons = (pageNumber, inputs) => {
  return async function (dispatch) {
    try {
      const data = await axios
        .get(`/pokemons?pageNumber=${pageNumber}&name=${inputs.search}&sort=${inputs.sort}&type=${inputs.type}`)
        .then((response) => response.data);
        if(data.data.length === 0){
          data.data = null
        }
      dispatch({
        type: GET_ALL_POKEMONS,
        payload: { data: data, error: false },
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_POKEMONS,
        payload: { error: true, data: "No se pudieron Obtener los Pokemons" },
      });
    }
  };
};

export const getPokeDetail = (id) => {
  return async function (dispatch) {
    try {
      const data = await axios
        .get(`/pokemons/${id}`)
        .then((response) => response.data);
      dispatch({
        type: GET_POKEDETAILS,
        payload: { data: data, error: false },
      });
    } catch (error) {
      dispatch({
        type: GET_POKEDETAILS,
        payload: { data: "No se pudo obtener el pokemon", error: true },
      });
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const data = await axios.get("/types").then((response) => response.data);
      dispatch({ type: GET_TYPES, payload: data });
    } catch (error) {
      console.error("Error in action getTypes", error.message);
    }
  };
};

export const cleanPokemons =() =>{
  return {type: CLEAN_POKEMONS}
}

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};
