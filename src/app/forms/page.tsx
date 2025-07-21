"use client";

import { useEffect, useState } from "react";
import AdminLogin from "../pages/adminLogin";
import AllForms from "../pages/allForms";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const [state, setState] = useState<null | true>(null)

 useEffect(() => {
 const isLoggedIn = localStorage.getItem("LoggedIn") === 'true';
 if (isLoggedIn) setIsAdmin(true)

  setState(true);

 }, []) 
  if (state === null) {
    return null;
  }
  return isAdmin ? (
    <AllForms />
  ) : (
    <AdminLogin onLogin={() => setIsAdmin(true)} />
  );
}
