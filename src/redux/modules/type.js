import ApiClient from 'helpers/ApiClient';
const request = new ApiClient();

const LOAD = 'pokedex-pwa/type/LOAD';
const LOAD_SUCCESS = 'pokedex-pwa/type/LOAD_SUCCESS';
const LOAD_ALL_SUCCESS = 'pokedex-pwa/type/LOAD_ALL_SUCCESS';

const initialState = {
  type: [],
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
        type: [...state.type, ...action.payload],
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

function saveListType(list) {
  return {
    type: LOAD_SUCCESS,
    payload: list
  };
}

export function loadDetailType(url) {
  return () => new Promise((resolve) => {
    request.get(url, {}, true)
      .then(res => {
        resolve(res);
      });
  });
}

function getTypeId(url) {
  return url.substring(41, url.lastIndexOf('/'));
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
