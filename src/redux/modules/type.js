import ApiClient from 'helpers/ApiClient';
import { getTypeId, getPokemonId } from 'helpers/polyfill';
const request = new ApiClient();

const LOAD = 'pokedex-pwa/type/LOAD';
const LOAD_SUCCESS = 'pokedex-pwa/type/LOAD_SUCCESS';
const LOAD_ALL_SUCCESS = 'pokedex-pwa/type/LOAD_ALL_SUCCESS';
const SAVE_DETAIL_TYPE = 'pokedex-pwa/type/SAVE_DETAIL_TYPE';
const CLEAR_DETAIL_TYPE = 'pokedex-pwa/type/CLEAR_DETAIL_TYPE';

const initialState = {
  type: [],
  loading: false,
  allLoaded: false,
  detail: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        type: [...state.type, ...action.payload],
        loading: false
      };
    case LOAD_ALL_SUCCESS:
      return {
        ...state,
        allLoaded: true
      };
    case SAVE_DETAIL_TYPE:
      return {
        ...state,
        detail: action.payload,
        loading: false
      };
    case CLEAR_DETAIL_TYPE:
      return {
        ...state,
        detail: {}
      };
    default:
      return state;
  }
}

function startLoad() {
  return {
    type: LOAD
  };
}

function saveListType(list) {
  return {
    type: LOAD_SUCCESS,
    payload: list
  };
}

function saveDetailType(detail) {
  return {
    type: SAVE_DETAIL_TYPE,
    payload: detail
  };
}

function mapPokemonId(pokemon) {
  return { ...pokemon.pokemon, id: getPokemonId(pokemon.pokemon.url) };
}

export function loadDetailType(id) {
  return dispatch => {
    dispatch(startLoad());
    request.get(`/type/${id}`)
      .then(res => {
        const mappedPokemon = res.pokemon.map(mapPokemonId);
        dispatch(saveDetailType({
          ...res,
          pokemon: mappedPokemon
        }));
      });
  };
}

export function clearDetailType() {
  return {
    type: CLEAR_DETAIL_TYPE
  };
}

function mapTypeId(Type) {
  return {
    ...Type,
    id: getTypeId(Type.url)
  };
}

function finishedLoadingAll() {
  return {
    type: LOAD_ALL_SUCCESS
  };
}

export function loadListType(page = 1, limit = 60, toEnd = false) {
  return dispatch => {
    dispatch(startLoad());
    request.get(`/type/?offset=${(page - 1) * limit}&limit=${limit}`)
      .then(res => {
        dispatch(saveListType(res.results.map(mapTypeId)));
        if (toEnd && res.next) {
          dispatch(loadListType(page + 1, 60, true));
        }
        if (toEnd && !res.next) {
          dispatch(finishedLoadingAll());
        }
      });
  };
}
