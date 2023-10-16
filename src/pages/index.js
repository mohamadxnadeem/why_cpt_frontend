
import Home03 from "./Home03";

import ItemDetails01 from "./ItemDetails01";


const routes = [
  { path: '/', component: <Home03 />},
  { path: '/itemDetails01/:id', component: <ItemDetails01 />},
]

export default routes;