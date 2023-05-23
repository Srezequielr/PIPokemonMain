import axios from "axios";
import {
  CLEAN_DETAIL,
  GET_ALL_POKEMONS,
  GET_POKEDETAILS,
  GET_TYPES,
  SEARCH_POKEMON,
} from "./types";

export const getAllPokemons = (pageNumber) => {
  return async function (dispatch) {
    try {
      const data = await axios
        .get(`/pokemons?pageNumber=${pageNumber}`)
        .then((response) => response.data);
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

export const searchPokemon = (name) => {
  return async function (dispatch) {
    try {
      let data = await axios
        .get(`/pokemons?name=${name}`)
        .then((response) => [response.data]);
      if (!data[0].name) data = false;
      console.log("reducer", data.length);
      dispatch({ type: SEARCH_POKEMON, payload: data });
    } catch (error) {
      console.error("Error in action getPokemonByName", error.message);
    }
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};
