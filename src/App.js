import './App.css';
// import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';
import { useEffect } from 'react';
// Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
function sheet2arr(sheet) {
  const result = [];
  let row, rowNum, colNum;
  const range = XLSX.utils.decode_range(sheet['!ref']);
  for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    row = [];
    for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
      const nextCell = sheet[
        XLSX.utils.encode_cell({ r: rowNum, c: colNum })
      ];
      if (typeof nextCell === 'undefined') {
        row.push(null);
      } else {
        row.push(nextCell.w);
      }
    }
    result.push(row);
  }
  return result;
}
function getSortedData(dataArray, choosedParam) {
  const indexChoosedParam = dataArray[0].findIndex(elem => elem === choosedParam);
  let contryNamesValues = dataArray.slice(1).map(elem => [elem[0], elem[indexChoosedParam]]);
  let arrOfPars = contryNamesValues.sort((a, b) => b[1] - a[1]);
  return ({
    countries: arrOfPars.map(elem => elem[0]),
    values: arrOfPars.map(elem => elem[1])
  });
}
let myChart = null;
function startProgram(choosedParam = 'Внешняя политика') {
  const req = new XMLHttpRequest();
  req.open('GET', 'input-data.xlsx', true);
  req.responseType = 'arraybuffer';
  let allSheetsRows = [];
  req.onload = function () {
    const workBook = XLSX.read(req.response, { type: 'array' });
    const dataArray = sheet2arr(workBook.Sheets.Sheet1);
    let { countries, values } = getSortedData(dataArray, choosedParam);
    const data = {
      labels: countries,
      datasets: [{
        label: choosedParam,
        backgroundColor: 'gray',
        pointRadius: 5,
        borderColor: '#000000',
        data: values,
      }]
    };
    const config = {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'ИМГ'
          }
        }
      }
    };
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(
      ctx,
      config
    );
  };
  req.send();
  return allSheetsRows;
}
function App() {
  useEffect(() => {
    startProgram();
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
