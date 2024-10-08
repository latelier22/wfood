"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import ReservationForm from "@/components/ReservationForm";

const Reservation = () => {
  return (
    <main className="w-full max-w-[1440px] bg-body mx-auto overflow-hidden">
      <Header />
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="xl:my-32 xl:h-[1020px] xl:bg-reservation xl:bg-no-repeat xl:flex xl:flex-col xl:justify-end xl:items-end"
        id="reservation"
      >
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="bg-green w-full xl:max-w-[868px] min-h-[518px] p-8 md:p-14 xl:p-16"
        >
          <h2 className="text-white mb-9 capitalize">Réservez une table</h2>
          <ReservationForm />
        </motion.div>
      </motion.section>
      <Footer />
    </main>
  );
};

export default Reservation;
