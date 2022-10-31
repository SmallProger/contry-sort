function sortDataByParam(dataArray, choosedParam) {
  const indexChoosedParam = dataArray[0].findIndex(elem => elem === choosedParam.param);
  let contryNamesValues = dataArray.slice(1).map(elem => [elem[0], elem[indexChoosedParam]]);
  let arrOfPars = contryNamesValues.sort((a, b) => b[1] - a[1]);
  const data = {
    labels: arrOfPars.map(elem => elem[0]),
    datasets: [{
      label: choosedParam.param,
      data: arrOfPars.map(elem => elem[1]),
    }]
  };
  return data;
}
export { sortDataByParam };