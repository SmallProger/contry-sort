import { read, utils } from 'xlsx';

async function fetchData(path, numSheet = 0) {
  let response = await fetch(path).then(answer => {
    if (!answer.ok) {
      throw new Error("HTTP error " + response.status);
    } else {
      return answer.arrayBuffer();
    }
  }).catch(err => console.log(err.message));
  const workBook = read(response, { type: 'array' });
  const data = utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[numSheet]]);
  return data;
}

export { fetchData };