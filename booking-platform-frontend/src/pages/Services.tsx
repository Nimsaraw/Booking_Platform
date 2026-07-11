import {useEffect,useState} from "react";
import {motion} from "framer-motion";
import api from "../api/axios";


export default function Services(){


const [services,setServices] =
useState<any[]>([]);



const loadServices = async()=>{


try{


const res =
await api.get("/services");



console.log(res.data);



setServices(
    res.data.data || res.data
);



}catch(error){

console.log(error);

}


};



useEffect(()=>{

loadServices();

},[]);





return (

<div className="dashboard">


<h1 className="heading">

Services Management

</h1>




<div className="grid">


{

services.length === 0 ?

<h2>
No Services Available
</h2>


:


services.map(service=>(


<motion.div

className="card"

key={service.id}

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}


whileHover={{
scale:1.05
}}

>


<h2>

{service.title}

</h2>



<p>

{service.description}

</p>



<p>

Duration:
{service.duration} min

</p>



<p>

Price:
Rs {service.price}

</p>



<span>

{
service.isActive
?
"Active"
:
"Inactive"
}

</span>



</motion.div>


))


}



</div>



</div>


);


}