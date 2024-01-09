
import Home03 from "./Home03";
import ItemDetails01 from "./ItemDetails01";
import CarDetails from './CarDetails';


const routes = [
  { path: '/', component: <Home03 />},
  { path: '/experience/:id', component: <ItemDetails01 />},
  { path: '/car-for-hire/:id', component: <CarDetails />},
]

export default routes;