import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  UserCircle,
  LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";



export default function Home() {


    const navigate =
        useNavigate();



    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );



    const logout = () => {


        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "user"
        );


        navigate("/login");


    };





    const cards = [


        {
            title:"Services",

            description:
            "Manage your available services",

            icon:
            <BriefcaseBusiness size={45}/>,

            path:"/services"

        },


        {
            title:"Bookings",

            description:
            "Create and manage bookings",

            icon:
            <CalendarDays size={45}/>,

            path:"/bookings"

        },


        {
            title:"Profile",

            description:
            "Manage your account",

            icon:
            <UserCircle size={45}/>,

            path:"/profile"

        }


    ];





    return (


        <div className="dashboard-home">





            <motion.div

                className="dashboard-header"


                initial={{
                    opacity:0,
                    y:-30
                }}


                animate={{
                    opacity:1,
                    y:0
                }}


            >



                <div>


                    <h1>

                    Welcome Back, {user.name || "User"} 👋

                    </h1>



                    <p>

                    {user.email}

                    </p>



                    <p>

                    Booking Platform Dashboard

                    </p>



                </div>






                <button

                    className="logout-btn"

                    onClick={logout}

                >


                    <LogOut size={18}/>

                    Logout


                </button>



            </motion.div>







            <div className="dashboard-grid">


            {
                cards.map(
                    (card,index)=>(


                    <motion.div


                        key={card.title}


                        className="dashboard-card"



                        initial={{
                            opacity:0,
                            y:40
                        }}


                        animate={{
                            opacity:1,
                            y:0
                        }}


                        transition={{
                            delay:index * .15
                        }}



                        whileHover={{
                            scale:1.05,
                            y:-10
                        }}



                        onClick={()=>
                            navigate(card.path)
                        }


                    >



                        <div className="card-icon">

                            {card.icon}

                        </div>



                        <h2>

                            {card.title}

                        </h2>



                        <p>

                            {card.description}

                        </p>




                        <button className="open-btn">

                            Open

                        </button>



                    </motion.div>


                    )
                )
            }



            </div>



        </div>


    );

}