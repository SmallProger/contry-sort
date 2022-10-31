import * as XLSX from 'xlsx';

function sheet2arr(sheet) {
  const result = [];
  let row, rowNum, colNum;
  const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
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

export { sheet2arr };