import './App.css';
import Form from './components/Form/Form';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SheetJSReactAoO } from './components/test/test'
import { Provider } from 'react-redux';
import { store } from './store';
import { ISU } from './components/ISU/ISU';

function App() {
  console.log('App render')
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/ISU/*' element={<Provider store={store}><ISU /></Provider>} />
          <Route path='/test' element={<SheetJSReactAoO />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
