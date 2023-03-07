
import Orders from "./components/Orders"
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <Orders />
      </header>
    </div>
  );
}

export default App;
