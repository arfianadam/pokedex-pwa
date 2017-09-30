const CLEAR = 'pokedex-pwa/pokemon/CLEAR';
const EDIT_VALUE = 'pokedex-pwa/pokemon/EDIT_VALUE';
const SEARCH_NOW = 'pokedex-pwa/pokemon/SEARCH_NOW';

const initialState = {
  value: '',
  searchQuery: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        value: ''
      };
    case EDIT_VALUE:
      return {
        ...state,
        value: action.payload
      };
    case SEARCH_NOW:
      return {
        ...state,
        searchQuery: action.payload
      };
    default:
      return state;
  }
}

export function clearSearchInput() {
  return {
    type: CLEAR
  };
}

export function editValue(value) {
  return {
    type: EDIT_VALUE,
    payload: value
  };
}

export function searchNow(value) {
  return {
    type: SEARCH_NOW,
    payload: value
  };
}
