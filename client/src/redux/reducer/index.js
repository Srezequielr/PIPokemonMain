import {
  CLEAN_DETAIL,
  GET_ALL_POKEMONS,
  GET_POKEDETAILS,
  GET_TYPES,
  CLEAN_POKEMONS,
} from "../actions/types";

const initialState = {
  pokemons: { error: false, data: [], totalPages: 0 },
  pokeDetail: { error: false, data: {} },
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      // console.log(`data que me llega: ${action.payload.data.data} \n data que tengo almacenada: ${state.pokemons.data}`);
      if (action.payload.error) {
        return {
          ...state,
          pokemons: {
            error: true,
            data: action.payload.data,
          },
        };
      }
      return {
        ...state,
        pokemons: {
          error: false,
          data: state.pokemons.data.concat(action.payload.data.data),
          totalPages: action.payload.data.totalPages,
        },
      };
    case GET_POKEDETAILS:
      if (action.payload.error) {
        return {
          ...state,
          pokeDetail: { error: true, data: action.payload.data },
        };
      }
      return {
        ...state,
        pokeDetail: { error: false, data: action.payload.data },
      };
    case GET_TYPES:
      return { ...state, types: action.payload };
    case CLEAN_DETAIL:
      return { ...state, pokeDetail: {} };
    case CLEAN_POKEMONS:
      return {
        ...state,
        pokemons: {
          error: false,
          data: [],
          totalPages: 0,
        },
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
