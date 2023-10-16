import './App.css';
import {   Routes , Route } from 'react-router-dom';
import routes from './pages/index';
import ReactGA from "react-ga4";





function App() {
    const TRACKING_ID ='G-LCC52EM33V'; // Tracking ID
    ReactGA.initialize(TRACKING_ID);
    
    return (
        <Routes >
            {
            routes.map((data,index) => (
                <Route onUpdate={() => window.scrollTo(0, 0)} exact={true} path={data.path} element={data.component} key={index} />
            ))
            }
      </Routes>
    );
}

export default App;
