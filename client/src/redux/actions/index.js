import axios from "axios";
import {
  CLEAN_DETAIL,
  GET_ALL_POKEMONS,
  GET_POKEDETAILS,
  GET_TYPES,
  CLEAN_POKEMONS,
  POST_DATA_REQ,
  POST_DATA_SUCC,
  POST_DATA_FAIL,
  GET_MY_POKEMONS,
} from "./types";

//Obtener los todos los pokemons tambien busca, filtra y ordena
export const getAllPokemons = (pageNumber, inputs) => {
  return async function (dispatch) {
    try {
      const data = await axios
        .get(
          `/pokemons?pageNumber=${pageNumber}&name=${inputs.search}&sort=${inputs.sort}&type=${inputs.type}`
        )
        .then((response) => response.data);
      if (data.data.length === 0) {
        data.data = null;
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
//----------------------------------

//Limpia los pokemons existentes al realizar una busqueda, filtrado u ordenamiento
export const cleanPokemons = () => {
  return { type: CLEAN_POKEMONS };
};
//----------------------------------

//Obtiene los pokemons del usuario
export const getMyPokemons = () => {
  return async function (dispatch) {
    try {
      let data = await axios
        .get(`/pokemons/my`)
        .then((response) => response.data);
      if (data.length === 0) {
        data = [null];
      }
      dispatch({
        type: GET_MY_POKEMONS,
        payload: { data: data, error: false },
      });
    } catch (error) {
      dispatch({
        type: GET_MY_POKEMONS,
        payload: { error: true, data: "No se pudieron Obtener tus Pokemons" },
      });
    }
  };
};
//----------------------------------

//Obtiene los detalles de un pokemon
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
//----------------------------------

//Limpia los detalles del pokemon al desmontarse el componente
export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};
//----------------------------------

//Postea un Pokemon
export const postPolkemon = (data) => {
  return async function (dispatch) {
    dispatch({ type: POST_DATA_REQ });
    axios
      .post("/pokemons", data)
      .then((response) => dispatch({ type: POST_DATA_SUCC }));
    try {
    } catch (error) {
      dispatch({ type: POST_DATA_FAIL });
    }
  };
};
//----------------------------------

//Obtiene los tipos de pokemon
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
//----------------------------------
