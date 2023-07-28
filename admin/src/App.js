import './App.css';
import Navbar from  './components/Navbar';
import Home from './components/Home';
import AllInter from './components/AllInter';
import AddInter from './components/AddInter';
import EditInter from './components/EditInter';
import NotFound from './components/NotFound';
import CheckNetwork from './components/CheckNetwork';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/all" component={AllInter}  />
        <Route path="/add" component={AddInter}  />
        <Route path="/edit/:id" component={EditInter}  />
        <Route component={CheckNetwork}/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
