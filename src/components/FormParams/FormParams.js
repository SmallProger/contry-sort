import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from '../Table/Table';
import { setInitialValuesParams, setParams, setWeights, setMeasures } from '../../actions/actions';
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

const FormParams = (props) => {
  let { amountRows, initialValuesParams } = props;
  let { setInitialValuesParams, setParams, setMeasures, setWeights } = props;
  let navigate = useNavigate();

  const handleSubmit = (values, actions) => {
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
    setMeasures(keysValuesSortedByColumns[1]);
    setWeights(keysValuesSortedByColumns[2]);
    actions.setSubmitting(false);
    navigate('values');
  }
  useEffect(() => {
    setInitialValuesParams(getInitialValues(amountRows, 3));
  }, [amountRows]);
  if (!initialValuesParams) {
    return (
      <h1>Loading...</h1>
    )
  }
  return (
    <Table
      initialValues={initialValuesParams}
      amountRows={amountRows}
      heads={['Критерий', 'Ед. изм.', 'Вес критерия']}
      handleSubmit={handleSubmit}
    />
  )
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setInitialValuesParams, setWeights, setMeasures, setParams }, dispatch);
}
const mapStateToProps = ({ amountRows, params, initialValuesParams }) => {
  return { amountRows, params, initialValuesParams }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormParams);