import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utils/fetchData';
import { Table } from '../Table/Table';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions'
import './Form.css';
import { bindActionCreators } from 'redux';

function getInitialValues(rowAmount, colAmount) {

  let initialValues = {};
  for (let i = 0; i < rowAmount; i++) {
    for (let y = 0; y < colAmount; y++) {
      initialValues[`param${i}${y}`] = '';
    }
  }
  return initialValues;
}
function Form(props) {
  let {
    amountRows,
    params,
    initialValues,
    initialValuesParams,
    contries,
    loading,
    error } = props;
  let {
    setAmountRows,
    setInitialValues,
    setInitialValuesParams,
    contriesError,
    contriesLoaded,
    contriesRequested,
    setParams
  } = props;
  const handleFetch = (path) => {
    contriesRequested();
    fetchData(path).then(data => contriesLoaded(data)).catch(err => contriesError(err));
  }
  useEffect(() => {
    console.log(contries);
    handleFetch('/input-data.xlsx');
    setInitialValues(getInitialValues(contries.length, params.length));
    setInitialValuesParams(getInitialValues(amountRows, 3));
  }, [amountRows, params]);

  const handleSubmitFormParam = (values, actions) => {
    let keysValues = Object.entries(values);
    let keysValuesSortedByColumns = [[], [], []]
    keysValues.forEach(([key, value]) => {
      if (key[6] === '0') {
        keysValuesSortedByColumns[0].push(value);
      } else if (key[6] === '1') {
        keysValuesSortedByColumns[1].push(value);
      } else if (key[6] === '2') {
        keysValuesSortedByColumns[2].push(value);
      }
    })
    setParams(keysValuesSortedByColumns[0]);
    actions.setSubmitting(false);
  }
  const handleAddRow = () => {
    console.log(amountRows);
    setAmountRows(amountRows + 1);
  }
  if (loading) {
    return (<h1>Загрузка...</h1>)
  } else {
    return (
      <div className='tables-wrapper'>
        <Table
          initialValues={initialValuesParams}
          amountRows={amountRows}
          heads={['Критерий', 'Ед. изм.', 'Вес критерия']}
          handleAddRow={handleAddRow}
          handleSubmit={handleSubmitFormParam}
        />
        {/* <Table initialValues={initialValues} params={contries} heads={params} /> */}
      </div>
    )
  }

}
const mapStateToProps = (props) => props;
const mapDispatchToProps = (dispatch) => {
  let { contriesError, contriesLoaded, contriesRequested } = actions;
  let {
    setAmountRows,
    setInitialValues,
    setInitialValuesParams,
    setParams } = actions;
  const handleFetch = (path) => {
    contriesRequested();
    fetchData(path).then(data => contriesLoaded(data)).catch(err => contriesError(err));
  }
  console.log('dispatch', { handleFetch, ...actions });
  return bindActionCreators({ handleFetch, setAmountRows, setInitialValues, setInitialValuesParams, setParams }, dispatch);
}

export default connect(mapStateToProps, actions)(Form);