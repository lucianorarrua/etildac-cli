import createReducer from 'store/createReducer'
import * as types from './types'

const initialState = {
  items: [],
  total: 0,
  loading: false,
  options: [],
  loadingAuto: false,
  deleting: false,
  creating: false,
  updating: false,
  finish: undefined,
  errorMessage: undefined
}

export default createReducer(initialState, {
  /* GET BY FILTER */
  [types.GET_<%= entityNameSnakeCase %>] (state, action) {
    return {
      ...state,
      [action?.payload?.autocompletable ? 'options' : 'items']: action?.payload?.autocompletable
        ? []
        : [...state.items],
      [action?.payload?.autocompletable ? 'loadingAuto' : 'loading']: true,
      finish: undefined,
      errorMessage: undefined
    }
  },
  [types.GET_<%= entityNameSnakeCase %>_FAILED] (state, action) {
    return {
      ...state,
      loading: false,
      finish: 'ERROR_GET',
      errorMessage: action.payload
    }
  },
  [types.GET_<%= entityNameSnakeCase %>_SUCCESS] (state, action) {
    return {
      ...state,
      [action?.payload?.autocompletable ? 'options' : 'items']: action.payload?.elements || [],
      [action?.payload?.autocompletable ? 'loadingAuto' : 'loading']: false,
      total: action.payload?.total || 0
    }
  },
  /* GET ALL */
  [types.GET_ALL_<%= entityNameSnakeCase %>S] (state, action) {
    return {
      ...state,
      loading: true,
      finish: undefined,
      errorMessage: undefined
    }
  },
  [types.GET_ALL_<%= entityNameSnakeCase %>S_FAILED] (state, action) {
    return {
      ...state,
      loading: false,
      finish: 'ERROR_GET',
      errorMessage: action.payload
    }
  },
  [types.GET_ALL_<%= entityNameSnakeCase %>S_SUCCESS] (state, action) {
    return {
      ...state,
      items: action.payload || [],
      loading: false
    }
  },
  /* CREATE */
  [types.SAVE_<%= entityNameSnakeCase %>] (state, action) {
    return {
      ...state,
      creating: true,
      finish: undefined
    }
  },
  [types.SAVE_<%= entityNameSnakeCase %>_FAILED] (state, action) {
    return {
      ...state,
      creating: false,
      finish: 'ERROR_CREATE',
      errorMessage: action.payload
    }
  },
  [types.SAVE_<%= entityNameSnakeCase %>_SUCCESS] (state, action) {
    return {
      ...state,
      creating: false,
      finish: 'SUCCESS_CREATE'
    }
  },
  /* UPDATE */
  [types.UPDATE_<%= entityNameSnakeCase %>] (state, action) {
    return {
      ...state,
      updating: true,
      finish: undefined
    }
  },
  [types.UPDATE_<%= entityNameSnakeCase %>_FAILED] (state, action) {
    return {
      ...state,
      updating: false,
      finish: 'ERROR_UPDATE',
      errorMessage: action.payload
    }
  },
  [types.UPDATE_<%= entityNameSnakeCase %>_SUCCESS] (state, action) {
    return {
      ...state,
      updating: false,
      finish: 'SUCCESS_UPDATE'
    }
  },
  /* DELETE */
  [types.DELETE_<%= entityNameSnakeCase %>] (state, action) {
    return {
      ...state,
      deleting: true,
      finish: undefined
    }
  },
  [types.DELETE_<%= entityNameSnakeCase %>_FAILED] (state, action) {
    return {
      ...state,
      deleting: false,
      finish: 'ERROR_DELETE',
      errorMessage: action.payload
    }
  },
  [types.DELETE_<%= entityNameSnakeCase %>_SUCCESS] (state, action) {
    return {
      ...state,
      deleting: false,
      finish: 'SUCCESS_DELETE'
    }
  },
  /* CLEAR */
  [types.CLEAR_STATE] (state, action) {
    return action.payload.clearAll
      ? initialState
      : {
        ...state,
        finish: undefined,
        errorMessage: undefined
      }
  }
})
