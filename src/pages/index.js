
import Home03 from "./Home03";
import ItemDetails01 from "./ItemDetails01";
import CarDetails from './CarDetails';
import AccomodationDetails from './AccomodationDetails';

import Stays from './Stays';
import AirportTransfers from './AirportTransfers';

import WhereToGetCannabis from './where-to-get-cannabis';

import Tours from './Tours';

import LuxuryVillas from './LuxuryVillas';
import StudentAccomodation from './StudentAccomodation';
import EventVenues from './EventVenues';
import GardenRoute from './GardenRoute';
import VehicleHire from './VehicleHire';






const routes = [
  { path: '/', component: <Home03 />},
  { path: '/experience/:id', component: <ItemDetails01 />},
  { path: '/car-for-hire/:id', component: <CarDetails />},
  { path: '/accomodation/:id', component: <AccomodationDetails />},

  { path: '/stays/', component: <Stays />},
  { path: '/airport-transfers', component: <AirportTransfers />},
  { path: '/where-to-get-cannabis', component: <WhereToGetCannabis />},

  { path: '/luxury-villas', component: <LuxuryVillas />},
  { path: '/student-accomodation', component: <StudentAccomodation />},
  { path: '/event-venues', component: <EventVenues />},
  { path: '/garden-route', component: <GardenRoute />},
  { path: '/vehicle-hire', component: <VehicleHire />},


  
  { path: '/tours', component: <Tours />},

]

export default routes;