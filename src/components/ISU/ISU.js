import React, { useEffect, useState } from 'react';
import FormAmountRows from '../FormAmoutRows/FormAmountRows';
import FormParams from '../FormParams/FormParams';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormParamsValues from '../FormParamsValues/FormParamsValues';
import ISUGraphic from '../ISUGraphic/ISUGraphic';

function ISU() {
  return (
    <div className='IMG'>
      <Routes>
        <Route path='/' element={<FormAmountRows />} />
        <Route path='/formParams' element={<FormParams />} />
        <Route path='/formParams/values' element={<FormParamsValues />} />
        <Route path='/formParams/values/graphic' element={<ISUGraphic />} />
      </Routes>

    </div>
  )
}
export { ISU };