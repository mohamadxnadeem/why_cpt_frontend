
// import Home03 from "./Home03"; 
import ItemDetails01 from "./ItemDetails01";
import TravelPackage from "./TravelPackage";

import CarHireDetails from './CarHireDetails';
import AccomodationDetails from './AccomodationDetails';

import OneBedroomDetials from './OneBedroomDetials';
import TwoBedroomDetails from './TwoBedroomDetails';
import PenthouseDetails from './PenthouseDetails';
import VillaDetails from './VillaDetails';
import HotelDetails from './HotelDetails';


import Stays from './Stays';
import AirportTransfers from './chauffeur-hire-cape-town';

import WhereToGetCannabis from './where-to-get-cannabis';

import PrivateToursCapeTown from './Private-tours-cape-town';

import LuxuryVillas from './LuxuryVillas';
import FullPackages from './FullPackages';
import Top3Tours from './Top3Tours';
import Safari from './Safari';

import StudentAccomodation from './StudentAccomodation';
import EventVenues from './EventVenues';
import GardenRoute from './GardenRoute';
import VehicleHire from './VehicleHire';

import TopRestaurantsCapeTown from './TopRestaurantsCapeTown';
import TopWineFarmsCapeTown from './BestWineFarms';
import TopActivitiesCapeTown from './TopActivitiesCapeTown';









const routes = [
  
  { path: '/', component: <AirportTransfers />},
  // Dynamic Pages
  
  { path: '/experience/:id', component: <ItemDetails01 />},

  { path: '/car-hire/:id', component: <CarHireDetails />},

  
  { path: '/accomodation/:id', component: <AccomodationDetails />},

  { path: '/accomodation/:id', component: <AccomodationDetails />},

  { path: '/1-Bedroom-Apartments/:id', component: <OneBedroomDetials />},
  { path: '/2-Bedroom-Apartments/:id', component: <TwoBedroomDetails />},
  { path: '/penthouse-apartments/:id', component: <PenthouseDetails />},
  { path: '/luxury-villas-in-cape-town/:id', component: <VillaDetails />},
  { path: '/best-hotels/:id', component: <HotelDetails />},
  
  
  { path: '/travel-package/:id', component: <TravelPackage />},

  { path: '/stays/', component: <Stays />},

  { path: '/chauffeur-hire-cape-town', component: <AirportTransfers />},

  { path: '/where-to-get-cannabis', component: <WhereToGetCannabis />},

  { path: '/full-packages-to-cape-town', component: <FullPackages />},

  { path: '/top-3-tours', component: <Top3Tours />},

  { path: '/safari', component: <Safari />},

  { path: '/accomodation', component: <LuxuryVillas />},
  
  { path: '/student-accomodation', component: <StudentAccomodation />},

  { path: '/top-10-resturants-in-cape-town', component: <TopRestaurantsCapeTown />},
  { path: '/top-5-winefarms-in-Cape-Town', component: <TopWineFarmsCapeTown />},
  { path: '/best-activities-to-do-in-cape-town', component: <TopActivitiesCapeTown />},



  { path: '/event-venues', component: <EventVenues />},
  { path: '/garden-route', component: <GardenRoute />},
  { path: '/vehicle-hire', component: <VehicleHire />},


  
  { path: '/private-tours-cape-town', component: <PrivateToursCapeTown />},

]

export default routes;