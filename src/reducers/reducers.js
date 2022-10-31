let initialState = {
  params: [[], [], []],
  contries: [],
  loading: false,
  error: null,
  amountRows: 4,
  initialValues: null,
  initialValuesParams: null,
  weights: null,
  measures: null,
  data: null,
  ISUdata: null,
  IMGdata: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTRIES_SUCCEES':
      return ({
        ...state,
        contries: action.payload,
        loading: false,
        error: null,
      })
    case 'FETCH_CONTRIES_REQUEST':
      return ({
        ...state,
        loading: true,
      })
    case 'FETCH_CONTRIES_FAILURE':
      return ({
        ...state,
        loading: false,
        error: action.payload,
        contries: [],
      })
    case 'SET_AMOUNT_ROWS':
      return ({
        ...state,
        amountRows: action.payload,
      })
    case 'SET_INITIAL_VALUES':
      return ({
        ...state,
        initialValues: action.payload,
      })
    case 'SET_INITIAL_VALUES_PARAMS':
      return ({
        ...state,
        initialValuesParams: action.payload,
      })
    case 'SET_PARAMS':
      return ({
        ...state,
        params: action.payload,
      })
    case 'SET_WEIGHTS_PARAMS':
      return ({
        ...state,
        weights: action.payload,
      })
    case 'SET_MEASURES_PARAMS':
      return ({
        ...state,
        measures: action.payload,
      })
    case 'SET_DATA':
      return ({
        ...state,
        data: action.payload,
      })
    case 'SET_ISU_DATA':
      return ({
        ...state,
        ISUdata: action.payload,
      })
    case 'SET_IMG_DATA':
      return ({
        ...state,
        IMGdata: action.payload,
      })
    default:
      return state;
  }
}

export { reducer }