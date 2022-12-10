import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { Me } from "./api/blogAPIs";
import { useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";



function Home() {
  return (
    <>
      <div className={styles.parentbody}>
        <Image
          src={"/images/home-page2.jpg"}
          alt="Picture of the author"
          fill
          priority={true}
        />
      </div>
    </>
  );
}

export default Home;
