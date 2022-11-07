import React, { useEffect } from 'react';
import './FormParamsValues.css';
import { connect } from 'react-redux';
import { Table } from '../Table/Table';
import { setInitialValues, setIMGData, setData, contriesLoaded, contriesError, contriesRequested } from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { fetchData } from '../../utils/fetchData';
import { useNavigate } from 'react-router';

function getInitialValues(rowAmount, colAmount) {
  let initialValues = {};
  for (let i = 0; i < rowAmount; i++) {
    for (let y = 0; y < colAmount; y++) {
      initialValues[`param${i}${y}`] = '';
    }
  }
  return initialValues;
}

function getData(contries, values) {
  let keysValues = Object.entries(values);
  let amoutContries = contries.length;
  let sortedDataByRows = [];
  let rowNum = 0;
  while (rowNum < amoutContries) {
    let row = [];
    sortedDataByRows.push(row);
    rowNum++;
  }
  keysValues.forEach(([key, value]) => {
    let index = +key[5];
    sortedDataByRows[index].push(value);
  });
  return sortedDataByRows;
}

const FormParamsValues = (props) => {
  let { initialValues, contries, params } = props;
  let { setInitialValues, setIMGData, contriesError, setData, contriesLoaded, contriesRequested } = props;
  let navigate = useNavigate();

  const handleFetch = (path) => {
    contriesRequested();
    fetchData(path).then(data => {
      let IMGparams = Object.keys(data[0]).slice(1, -1);
      let IMGdata = data.map(elem => Object.values(elem));
      let contries = data.map(elem => elem['Страны']);
      setIMGData({ params: IMGparams, data: IMGdata });
      contriesLoaded(contries);
    }).catch(err => contriesError(err));
  }
  const handleSubmit = (values, actions) => {
    if (values) {
      setData(getData(contries, values));
      navigate('graphic')
    }
    actions.setSubmitting(false);
  }
  useEffect(() => {
    handleFetch('/input-data.xlsx');
    setInitialValues(getInitialValues(contries.length, params.length - 1));
  }, [])
  if (!initialValues) {
    return (<h1>Loading...</h1>);
  }
  return (
    <div className='form-params-values'>
      <Table
        initialValues={initialValues}
        params={contries}
        heads={params}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
const mapStateToProps = ({ initialValues, contries, params }) => {
  let modifiedParams = ['Страны', ...params];
  return {
    initialValues,
    contries,
    params: modifiedParams,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setInitialValues, setIMGData, setData, contriesError, contriesLoaded, contriesRequested }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FormParamsValues);