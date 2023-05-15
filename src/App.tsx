import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>} />
      <Route path='/about' element={<About></About>} />
    </Routes>
  );
}

export default App;
