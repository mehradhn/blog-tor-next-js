import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Me } from "../pages/api/blogAPIs";
import Cookies from "universal-cookie";
import DashboardLayout from "./DashboardLayout";
import Weblayout from "./Weblayout";
import RegisterLayout from "./RegisterLayout";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

function Layout({ children }) {
  const [isUser,setIsUser] = useState(false)
  const router = useRouter();
  const cookies = new Cookies()
  const token = cookies.get('token')





  if (router.asPath.includes("dashboard"))
    return (
      <DashboardLayout>
        <main>{children}</main>
      </DashboardLayout>
    );
  return (
    <Weblayout>
      <main>{children}</main>
    </Weblayout>
  );
}

export default Layout;
