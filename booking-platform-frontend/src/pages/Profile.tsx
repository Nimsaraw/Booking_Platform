import { motion } from "framer-motion";
import { User, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Profile() {


    const navigate =
        useNavigate();


    const user = {

        name:
        localStorage.getItem("name")
        || "User",

        email:
        localStorage.getItem("email")
        || "user@example.com"

    };



    return (

        <div className="dashboard-home">



            <motion.div

                className="profile-card"


                initial={{
                    opacity:0,
                    y:40
                }}


                animate={{
                    opacity:1,
                    y:0
                }}


            >



                <div className="profile-avatar">

                    <User size={60}/>

                </div>





                <h1>

                    {user.name}

                </h1>



                <p className="profile-email">

                    <Mail size={18}/>

                    {user.email}

                </p>






                <div className="profile-info">


                    <div>

                        <Shield size={22}/>

                        <span>
                            Authenticated User
                        </span>


                    </div>


                    <div>

                        <span>
                            Booking Platform Member
                        </span>

                    </div>


                </div>







                <button

                    className="open-btn"

                    onClick={() =>
                        navigate("/home")
                    }

                >

                    Back Dashboard

                </button>




            </motion.div>




        </div>

    );

}