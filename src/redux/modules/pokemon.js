import ApiClient from 'helpers/ApiClient';
import { getPokemonId } from 'helpers/polyfill';
const request = new ApiClient();

const LOAD = 'pokedex-pwa/pokemon/LOAD';
const LOAD_SUCCESS = 'pokedex-pwa/pokemon/LOAD_SUCCESS';
const LOAD_ALL_SUCCESS = 'pokedex-pwa/pokemon/LOAD_ALL_SUCCESS';

const initialState = {
  pokemon: [],
  loading: false,
  allLoaded: false
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
        pokemon: [...state.pokemon, ...action.payload],
        loading: false
      };
    case LOAD_ALL_SUCCESS:
      return {
        ...state,
        allLoaded: true
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

function saveListPokemon(list) {
  return {
    type: LOAD_SUCCESS,
    payload: list
  };
}

export function loadDetailPokemon(url) {
  return () => new Promise((resolve) => {
    request.get(url, {}, true)
      .then(res => {
        resolve(res);
      });
  });
}

function mapPokemonId(pokemon) {
  return {
    ...pokemon,
    id: getPokemonId(pokemon.url)
  };
}

function finishedLoadingAll() {
  return {
    type: LOAD_ALL_SUCCESS
  };
}

export function loadListPokemon(page = 1, limit = 60, toEnd = false) {
  return dispatch => {
    dispatch(startLoad());
    request.get(`/pokemon/?offset=${(page - 1) * limit}&limit=${limit}`)
      .then(res => {
        dispatch(saveListPokemon(res.results.map(mapPokemonId)));
        if (toEnd && res.next) {
          dispatch(loadListPokemon(page + 1, 60, true));
        }
        if (toEnd && !res.next) {
          dispatch(finishedLoadingAll());
        }
        // const promises = [];
        // res.results.forEach(pokemon => {
        //   promises.push(dispatch(loadDetailPokemon(pokemon.url)));
        // });
        // Promise.all(promises)
        //   .then(completedPokemon => {
        //     dispatch(saveListPokemon(completedPokemon));
        //   });
      });
  };
}
