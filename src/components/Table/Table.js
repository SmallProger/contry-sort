import { Formik, Field } from 'formik';
import './Table.css'

const Row = ({ index, elem, children }) => {
  return (<tr className='table__row' key={`${index}row`}>
    <td className='table__cell'>{index}</td>
    {elem ? <td className='table__cell'>{elem}</td> : null}
    {children}
  </tr>)
}

const Rows = ({ params, colNum, rowNum }) => {
  let rows = [];
  if (params) {
    rows = params.map((elem, index) => {
      let cells = [];
      for (let i = 0; i < colNum; i++) {
        cells.push(
          <td key={`field${index}${i}`} className='table__cell'>
            <Field name={`param${index}${i}`} />
          </td>
        );
      }
      return (
        <Row key={`row${index}`} index={index} elem={elem}>
          {cells}
        </Row>
      )
    })
  } else {
    for (let x = 0; x < rowNum; x++) {
      let cellsInRow = [];
      for (let y = 0; y < colNum; y++) {
        cellsInRow.push(
          <td key={`field${x}${y}`} className='table__cell'>
            <Field name={`param${x}${y}`} />
          </td>
        )
      }
      rows.push(
        <Row key={`row${x}`} index={x}>
          {cellsInRow}
        </Row>
      );
    }
  }
  return rows;
}
const Thead = ({ heads }) => {
  return (
    <tr>
      <th className='table__cell'>№</th>
      {heads.map((elem, index) => <th className='table__cell' key={`th${index}`}>{elem}</th>)}
    </tr>
  )
}

function Table({ initialValues, params, heads, amountRows, handleSubmit }) {
  console.log('Table render', heads);
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <form className='form' onSubmit={handleSubmit}>
            <table className='table'>
              {heads ? (<thead> <Thead heads={heads} /> </thead>) : null}
              <tbody>
                {params ?
                  <Rows colNum={heads.length - 1} params={params} /> :
                  <Rows colNum={heads.length} rowNum={amountRows} />
                }
              </tbody>
            </table>
            <button className='button' type="submit">
              Сохранить
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export { Table };