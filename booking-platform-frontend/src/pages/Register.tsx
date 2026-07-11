import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Register() {


    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const navigate =
        useNavigate();



    const register = async () => {


        try {


            setLoading(true);


            await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );



            alert(
                "Account Created Successfully"
            );


            navigate("/login");



        } catch (error: any) {


            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );


        } finally {


            setLoading(false);


        }


    };





    return (


        <div className="auth-container">



            {/* Animated Background */}


            <motion.div

                className="background-circle circle-one"

                animate={{
                    y: [0, 30, 0],
                    rotate: [0, 180, 360]
                }}

                transition={{
                    duration: 8,
                    repeat: Infinity
                }}

            />




            <motion.div

                className="background-circle circle-two"

                animate={{
                    y: [0, -40, 0],
                    rotate: [360, 180, 0]
                }}

                transition={{
                    duration: 10,
                    repeat: Infinity
                }}

            />







            <motion.div


                className="auth-card"


                initial={{
                    opacity: 0,
                    scale: .8
                }}


                animate={{
                    opacity: 1,
                    scale: 1
                }}


                transition={{
                    duration: .6
                }}


            >




                <motion.div


                    className="login-icon"


                    animate={{
                        rotate: [0, 10, -10, 0]
                    }}


                    transition={{
                        repeat: Infinity,
                        duration: 3
                    }}


                >


                    <UserPlus size={40} />


                </motion.div>







                <h1 className="title">

                    Create Account

                </h1>




                <p className="subtitle">

                    Join our booking platform

                </p>







                <div className="input-box">


                    <User size={20} />


                    <input


                        className="input"


                        placeholder="Full Name"


                        value={name}


                        onChange={
                            e =>
                                setName(
                                    e.target.value
                                )
                        }


                    />


                </div>








                <div className="input-box">


                    <Mail size={20} />


                    <input


                        className="input"


                        placeholder="Email Address"


                        value={email}


                        onChange={
                            e =>
                                setEmail(
                                    e.target.value
                                )
                        }


                    />


                </div>








                <div className="input-box">


                    <Lock size={20} />



                    <input


                        className="input"


                        type="password"


                        placeholder="Password"


                        value={password}


                        onChange={
                            e =>
                                setPassword(
                                    e.target.value
                                )
                        }


                    />


                </div>








                <motion.button


                    whileHover={{
                        scale:1.05
                    }}


                    whileTap={{
                        scale:.95
                    }}


                    className="btn"


                    onClick={register}



                >


                    {
                        loading
                        ?
                        "Creating..."
                        :
                        "Register"
                    }


                </motion.button>









                <p className="switch-text">


                    Already have an account?



                    <button


                        className="switch-btn"


                        onClick={() =>
                            navigate("/login")
                        }


                    >

                        Login


                    </button>



                </p>





            </motion.div>




        </div>


    );


}