import ApiClient from 'helpers/ApiClient';
const request = new ApiClient();

const LOAD = 'pokedex-pwa/pokemon/LOAD';
const LOAD_SUCCESS = 'pokedex-pwa/pokemon/LOAD_SUCCESS';

const initialState = {
  pokemon: [],
  loading: false
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
        pokemon: action.payload,
        loading: false
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

export function loadListPokemon(page = 1, limit = 60, toEnd = false) {
  if (toEnd) {
    return;
  }
  return dispatch => {
    dispatch(startLoad());
    request.get(`/pokemon/?offset=${(page - 1) * limit}&limit=${limit}`)
      .then(res => {
        dispatch(saveListPokemon(res.results));
      });
  };
}
