import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import './FormAmountRows.css';
import { setAmountRows } from '../../actions/actions';
import { useNavigate } from 'react-router';

const FormAmountRows = ({ amountRows, setAmountRows }) => {
  let [amountRowsInput, setAmountRowsInput] = useState(amountRows);
  let navigate = useNavigate();

  let handleClick = (event) => {
    setAmountRows(amountRowsInput);
    navigate('formParams');
  }
  let handleChange = (event) => {
    console.log(event.target.value);
    setAmountRowsInput(event.target.value);
  }
  return (
    <form className='form-amount-rows' onSubmit={handleClick}>
      <div className='form-amount-rows__pair'>
        <span className='form-amount-rows__header'>Какое количество парметров в ИМГ?</span>
        <input className='form-amount-rows__input' type='text' value={amountRowsInput} onChange={handleChange} />
      </div>

      <button className='form-amount-rows__btn'>Перейти к выбору параметров</button>
    </form>
  )
}
const mapDispatchToProps = (dispatch) => {
  let boundedSetAmountRows = bindActionCreators(setAmountRows, dispatch);
  return ({
    setAmountRows: boundedSetAmountRows,
  })
}
const mapStateToProps = ({ amountRows }) => {
  return { amountRows }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormAmountRows);