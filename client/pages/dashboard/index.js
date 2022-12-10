import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Me } from "../api/blogAPIs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import styles from './dashbord.module.css'
function Dashboard() {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const CheckMe = useMutation({
    mutationFn: Me,
    onSuccess: (res) => {
      setLoading(false);
    },
    onError: (res) => {
      console.log(res);
      router.push("/login");
      setLoading(false);
    },
  });

  useEffect(() => {
    if (token) {
      CheckMe.mutate();
    } else {
      router.push("/login");
    }
  }, []);

  if (loading) return <CircularIndeterminate />;
  return <div className={styles.dashboardContainer}>welcome to dashboard</div>;
}

export default Dashboard;
