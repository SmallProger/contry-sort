import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { setISUData } from '../../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './ISUGraphic.css'
import { useNavigate } from 'react-router';

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
const Graphics = ({ contries, IMGdata, data, weights, setISUData }) => {
  let [graphicIMGISUData, setGraphicIMGISUData] = useState(null);
  let [graphicIMGData, setGraphicIMGData] = useState(null);
  let [choosedParam, setChoosedParam] = useState('Внешняя политика');
  let navigate = useNavigate();

  useEffect(() => {
    let countedIMG = getIMG(IMGdata.data);
    let countedISU = countISU(data, weights);
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
          {IMGdata.params.map(elem => <option>{elem}</option>)}
        </select>
        <Bar
          className='graphic'
          options={OPTIONS_IMG}
          datasetIdKey='id1'
          data={graphicIMGData}
        />
      </div>
      <button className='btn btn_save'></button>
    </div>
  )
}
const mapStateToProps = (state) => {
  console.log(state);
  let { contries, weights, data, IMGdata } = state;
  return {
    contries,
    data,
    weights,
    IMGdata,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setISUData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphics);