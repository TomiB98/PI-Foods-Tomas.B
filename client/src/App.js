import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './views/home/home'
import Detail from './views/detail/detail'
import Create from './views/create/create';
import Landing from './views/landing/landing';

//className="App"
function App() {
  return (
    <div > 
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route path={`/detail/:id`} component={Detail} />
        <Route path='/create' component={Create} />
      </Switch>
    </div>
  );
}

export default App;
