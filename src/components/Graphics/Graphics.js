import React, { useEffect, useState, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { setISUData } from '../../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Graphics.css'
import { useNavigate } from 'react-router';
import { read, utils, writeFileXLSX } from 'xlsx';

const OPTIONS_IMG_ISU = {
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'ИСУ + ИМГ',
    },
  }
}
const OPTIONS_IMG = {
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Значения показателей ИМГ',
    }
  }
}
const rounded = function (number) {
  return +number.toFixed(2);
}

const countISU = (data, weights) => {
  let arrMaxValuesOfParams = [];
  let ISUvalues = [];

  data.forEach(row => {
    row.forEach((elem, index) => {
      if (!arrMaxValuesOfParams[index] || arrMaxValuesOfParams[index] < +elem) {
        arrMaxValuesOfParams[index] = +elem;
      }
    })
  });

  data.forEach(row => {
    let ISUvalue = row.reduce((prev, elem, index) => {
      let term = rounded((+elem) / arrMaxValuesOfParams[index] * (+weights[index]));
      return prev + term;
    }, 0);
    ISUvalues.push(ISUvalue);
  })

  return ISUvalues;
}

const getIMG = (data) => {
  let countedIMG = data.map(elem => {
    let length = elem.length;
    return elem[length - 1];
  });
  return countedIMG;
}

const Graphics = ({ contries, IMGdata, data, measures, weights, setISUData, ISUdata, params }) => {
  let [graphicIMGISUData, setGraphicIMGISUData] = useState(null);
  let [graphicIMGData, setGraphicIMGData] = useState(null);
  let [choosedParam, setChoosedParam] = useState('Внешняя политика');
  let navigate = useNavigate();

  useEffect(() => {
    let countedIMG = getIMG(IMGdata.data);
    let countedISU = countISU(data, weights);
    console.log(countedISU);
    setISUData(countedISU);
    setGraphicIMGISUData({
      labels: contries,
      datasets: [
        {
          id: 2,
          label: 'ИМГ',
          data: countedIMG,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          stack: 'Stack 0',
        },
        {
          id: 1,
          label: 'ИСУ',
          data: countedISU,
          stack: 'Stack 0',
          backgroundColor: 'rgba(53, 162, 235, 1)'
        },
      ]
    });
  }, [])
  useEffect(() => {
    let { data, params } = IMGdata;
    let indexChoosedParamIMG = params.findIndex((elem) => elem === choosedParam) + 1;
    let sortedByChoosedParam = data.sort((a, b) => b[indexChoosedParamIMG] - a[indexChoosedParamIMG]);
    let sortedByChoosedParamData = [];
    let sortedByChoosedParamContries = [];
    sortedByChoosedParam.forEach(elem => {
      sortedByChoosedParamData.push(elem[indexChoosedParamIMG]);
      sortedByChoosedParamContries.push(elem[0]);
    })
    setGraphicIMGData({
      labels: sortedByChoosedParamContries,
      datasets: [
        {
          id: 1,
          label: choosedParam,
          data: sortedByChoosedParamData,
          backgroundColor: 'gray',
        }
      ]
    });
  }, [choosedParam])

  const saveData = useCallback(() => {
    const wb = utils.book_new();

    let ISUdataToSave = contries.reduce((arr, contry, contryIndex) => {
      let ISUdataElem = {
        'Cтрана': contry,
      }
      params.map((param, paramIndex) => ISUdataElem[param] = data[contryIndex][paramIndex]);
      ISUdataElem['ИСУ'] = ISUdata[contryIndex];
      arr.push(ISUdataElem);
      return arr;
    }, []);
    const wsISU = utils.json_to_sheet(ISUdataToSave);
    utils.book_append_sheet(wb, wsISU, "ИСУ");

    let ISUparamsToSave = params.reduce((arr, param, indexParam) => {
      let elemISUData = {
        'Параметр': param,
        'Вес': weights[indexParam],
        'Единица измерения': measures[indexParam],
      }
      arr.push(elemISUData);
      return arr;
    }, [])
    const wsISUparams = utils.json_to_sheet(ISUparamsToSave);
    utils.book_append_sheet(wb, wsISUparams, "Параметры ИСУ");

    let IMGdataToSave = IMGdata.data.reduce((arr, contryData) => {
      let elemIMGData = {
        'Страна': contryData[0],
      }
      let lenContryData = contryData.length;
      IMGdata.params.map((param, indexParam) => elemIMGData[param] = contryData[indexParam + 1]);
      console.log(contryData[lenContryData - 1], contryData)
      elemIMGData['ИМГ'] = contryData[lenContryData - 1];
      arr.push(elemIMGData);
      return arr;
    }, [])
    const wsIMG = utils.json_to_sheet(IMGdataToSave);
    utils.book_append_sheet(wb, wsIMG, "ИМГ");
    writeFileXLSX(wb, "output.xlsx");
  }, [ISUdata, contries])

  if (!graphicIMGISUData && !graphicIMGData) {
    return (
      <h1>Loading...</h1>
    )
  }
  return (
    <div className='wrapper'>
      <button className='btn btn_back' onClick={() => navigate(-1)}></button>
      <Bar
        className='graphic'
        options={OPTIONS_IMG_ISU}
        datasetIdKey='id'
        data={graphicIMGISUData}
      />
      <div className='wrap-select-graphic'>
        <select className='select' onChange={event => setChoosedParam(event.target.value)}>
          {IMGdata.params.map((elem, index) => <option key={index}>{elem}</option>)}
        </select>
        <Bar
          className='graphic'
          options={OPTIONS_IMG}
          datasetIdKey='id1'
          data={graphicIMGData}
        />
      </div>
      <button onClick={() => saveData(contries, ISUdata)} className='btn btn_save'></button>
    </div>
  )
}
const mapStateToProps = (state) => {
  console.log(state);
  let { contries, weights, data, IMGdata, ISUdata, params, measures } = state;
  return {
    contries,
    data,
    params,
    weights,
    IMGdata,
    ISUdata,
    measures,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setISUData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphics);