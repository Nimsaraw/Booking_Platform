import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Login() {


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const navigate = useNavigate();



    const login = async () => {

        try {

            setLoading(true);


            const res =
                await api.post(
                    "/auth/login",
                    {
                        email,
                        password,
                    }
                );


            localStorage.setItem(
                "token",
                res.data.access_token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );


            alert(
                "Login Successful"
            );


            navigate("/home");


        } catch (error: any) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );


        } finally {

            setLoading(false);

        }

    };



    return (

        <div className="auth-container">


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

                    <LogIn size={40} />

                </motion.div>




                <h1 className="title">
                    Welcome Back
                </h1>



                <p className="subtitle">

                    Login to your booking dashboard

                </p>





                <div className="input-box">


                    <Mail size={20} />


                    <input

                        className="input"

                        placeholder="Email Address"

                        value={email}

                        onChange={
                            e => setEmail(
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
                            e => setPassword(
                                e.target.value
                            )
                        }

                    />


                </div>






                <motion.button


                    whileHover={{
                        scale: 1.05
                    }}


                    whileTap={{
                        scale: .95
                    }}


                    className="btn"


                    onClick={login}


                >

                    {
                        loading
                            ?
                            "Logging in..."
                            :
                            "Login"
                    }


                </motion.button>






                <p className="switch-text">


                    Don't have an account?


                    <button

                        className="switch-btn"

                        onClick={() =>
                            navigate("/register")
                        }

                    >

                        Register

                    </button>


                </p>




            </motion.div>



        </div>

    );

}