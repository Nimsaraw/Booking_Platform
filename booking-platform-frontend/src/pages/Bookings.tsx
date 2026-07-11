import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function Bookings() {

    const [bookings, setBookings] =
        useState<any[]>([]);

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    useEffect(() => {

        const loadBookings = async () => {

            try {

                const res =
                    await api.get("/bookings");

                const allBookings =
                    res.data.data || [];

                const myBookings =
                    allBookings.filter(
                        (booking: any) =>
                            booking.customerEmail === user.email
                    );

                setBookings(myBookings);

            } catch (error) {

                console.error(error);

            }

        };

        loadBookings();

    }, [user.email]);



    return (

        <div className="dashboard">

            <h1 className="heading">

                My Bookings

            </h1>

            <div className="grid">

                {
                    bookings.length === 0 ?

                        <motion.div

                            className="card"

                            initial={{
                                opacity: 0
                            }}

                            animate={{
                                opacity: 1
                            }}

                        >

                            <h2>

                                No Bookings Found

                            </h2>

                            <p>

                                You haven't created any bookings yet.

                            </p>

                        </motion.div>

                        :

                        bookings.map(
                            booking => (

                                <motion.div

                                    className="card"

                                    key={booking.id}

                                    initial={{
                                        y: 30,
                                        opacity: 0
                                    }}

                                    animate={{
                                        y: 0,
                                        opacity: 1
                                    }}

                                    whileHover={{
                                        scale: 1.03
                                    }}

                                >

                                    <h2>

                                        {booking.customerName}

                                    </h2>

                                    <p>

                                        <strong>Email:</strong>{" "}
                                        {booking.customerEmail}

                                    </p>

                                    <p>

                                        <strong>Status:</strong>{" "}
                                        {booking.status}

                                    </p>

                                    <p>

                                        <strong>Date:</strong>{" "}
                                        {booking.bookingDate}

                                    </p>

                                    <p>

                                        <strong>Time:</strong>{" "}
                                        {booking.bookingTime}

                                    </p>

                                </motion.div>

                            )
                        )

                }

            </div>

        </div>

    );

}