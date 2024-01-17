
import Home03 from "./Home03";
import ItemDetails01 from "./ItemDetails01";
import CarDetails from './CarDetails';
import AccomodationDetails from './AccomodationDetails';



const routes = [
  { path: '/', component: <Home03 />},
  { path: '/experience/:id', component: <ItemDetails01 />},
  { path: '/car-for-hire/:id', component: <CarDetails />},
  { path: '/accomodation/:id', component: <AccomodationDetails />},
]

export default routes;