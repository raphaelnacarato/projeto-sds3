import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const Routes = () => {
   return (
      <BrowserRouter>
         <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/dashboard' component={Dashboard} />
         </Switch>
      </BrowserRouter>
   );
};

export default Routes;
