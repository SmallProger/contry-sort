import { utils, writeFileXLSX } from 'xlsx';

function createCellJSON(column, value, rowNum) {
  return {
    [column]: value,
    __rowNum__: rowNum,
  }
}

function getJSONfomData(data) {
  const keyValues = Object.entries(data)[0];
  console.log(keyValues, keyValues[0]);
  const columnName = keyValues[0];
  const values = keyValues[1];
  console.log('values', values);
  const valuesJSON = values.map((elem, index) => createCellJSON(columnName, elem, index));
  return valuesJSON;
}

function exportData2File(data, nameFile) {
  const dataJSON = data.reduce((dataJSON, elem) => dataJSON.concat(getJSONfomData(elem)), []);
  const ws = utils.json_to_sheet(dataJSON);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFileXLSX(wb, `${nameFile}.xlsx`);
}

export { getJSONfomData, exportData2File }