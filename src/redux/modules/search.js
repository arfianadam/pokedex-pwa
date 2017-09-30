const CLEAR = 'pokedex-pwa/pokemon/CLEAR';
const EDIT_VALUE = 'pokedex-pwa/pokemon/EDIT_VALUE';

const initialState = {
  value: ''
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
    default:
      return state;
  }
}

export function clearSearchInput() {
  return {
    type: CLEAR
  };
}

export function editSearchInput(value) {
  return {
    type: EDIT_VALUE,
    payload: value
  };
}
