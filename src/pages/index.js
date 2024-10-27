
import Home03 from "./Home03"; 
import ItemDetails01 from "./ItemDetails01";
import TravelPackage from "./TravelPackage";

import CarDetails from './CarDetails';
import AccomodationDetails from './AccomodationDetails';

import Stays from './Stays';
import AirportTransfers from './chauffeur-hire-cape-town';

import WhereToGetCannabis from './where-to-get-cannabis';

import Tours from './Tours';

import LuxuryVillas from './LuxuryVillas';
import FullPackages from './FullPackages';
import Top3Tours from './Top3Tours';
import Safari from './Safari';

import StudentAccomodation from './StudentAccomodation';
import EventVenues from './EventVenues';
import GardenRoute from './GardenRoute';
import VehicleHire from './VehicleHire';






const routes = [
  
  { path: '/', component: <Home03 />},
  // Dynamic Pages
  
  { path: '/experience/:id', component: <ItemDetails01 />},
  { path: '/car-for-hire/:id', component: <CarDetails />},
  { path: '/accomodation/:id', component: <AccomodationDetails />},
  
  { path: '/travel-package/:id', component: <TravelPackage />},

  { path: '/stays/', component: <Stays />},

  { path: '/chauffeur-hire-cape-town', component: <AirportTransfers />},

  { path: '/where-to-get-cannabis', component: <WhereToGetCannabis />},

  { path: '/full-packages-to-cape-town', component: <FullPackages />},

  { path: '/top-3-tours', component: <Top3Tours />},

  { path: '/safari', component: <Safari />},

  { path: '/luxury-villas', component: <LuxuryVillas />},
  
  { path: '/student-accomodation', component: <StudentAccomodation />},
  { path: '/event-venues', component: <EventVenues />},
  { path: '/garden-route', component: <GardenRoute />},
  { path: '/vehicle-hire', component: <VehicleHire />},


  
  { path: '/tours', component: <Tours />},

]

export default routes;