import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './views/home/home'
import Detail from './views/detail/detail'
import Create from './views/create/create';
import Landing from './views/landing/landing';

//className="App"
function App() {
  return (
    <div > 
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/create' element={<Create/>} />
      </Routes>
    </div>
  );
}

export default App;
