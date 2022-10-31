const contriesRequested = () => {
  return {
    type: 'FETCH_CONTRIES_REQUEST',
    loading: true,
  }
}
const contriesLoaded = (contries) => {
  return {
    payload: contries,
    type: 'FETCH_CONTRIES_SUCCEES',
    loading: false,
  }
}
const contriesError = (err) => {
  return {
    payload: err,
    type: 'FETCH_CONTRIES_FAILURE',
    loading: false,
  }
}
const setAmountRows = (amount) => {
  return {
    payload: amount,
    type: 'SET_AMOUNT_ROWS',
  }
}
const setInitialValues = (initialValues) => {
  return {
    payload: initialValues,
    type: 'SET_INITIAL_VALUES',
  }
}
const setInitialValuesParams = (initialValuesParams) => {
  return {
    payload: initialValuesParams,
    type: 'SET_INITIAL_VALUES_PARAMS',
  }
}
const setParams = (params) => {
  return {
    payload: params,
    type: 'SET_PARAMS',
  }
}
const setData = (data) => {
  return {
    payload: data,
    type: 'SET_DATA',
  }
}
const setWeights = (weights) => {
  return {
    payload: weights,
    type: 'SET_WEIGHTS_PARAMS',
  }
}
const setMeasures = (measures) => {
  return {
    payload: measures,
    type: 'SET_MEASURES_PARAMS',
  }
}
const setISUData = (ISUdata) => {
  return {
    payload: ISUdata,
    type: 'SET_ISU_DATA',
  }
}
const setIMGData = (IMGdata) => {
  return {
    payload: IMGdata,
    type: 'SET_IMG_DATA',
  }
}
export {
  setAmountRows,
  setInitialValues,
  setInitialValuesParams,
  setParams,
  setData,
  setWeights,
  setMeasures,
  setISUData,
  setIMGData,
  contriesError,
  contriesLoaded,
  contriesRequested
}