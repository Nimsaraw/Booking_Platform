import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import Home from "./pages/Home";


function App(){


return (

<BrowserRouter>

<Routes>


<Route
path="/login"
element={<Login/>}
/>

<Route
 path="/home"
 element={
   <Home />
 }
/>

<Route
path="/register"
element={<Register/>}
/>


<Route
path="/services"
element={<Services/>}
/>


<Route
path="/bookings"
element={<Bookings/>}
/>


</Routes>

</BrowserRouter>

);


}


export default App;