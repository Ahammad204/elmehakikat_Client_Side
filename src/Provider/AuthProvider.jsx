/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
export const AuthContext = createContext(null);



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
   // Fetch user data on load
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        console.error("Failed to load user");
      }
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  useEffect(() => {
    fetchUser(); // <-- Fetch user when provider mounts
  }, []);

 const createUser = async (email, password, name,photo,role) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name,photo,role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || toast.error("Registration failed"));

      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      setUser(decoded);
      toast.success("Create Account Successfully || Now Login");
      return decoded;
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  };
 

 const signIn = async (email, password) => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || toast.error("Login failed"));

    localStorage.setItem("token", data.token);
    const decoded = jwtDecode(data.token);

    setUser(decoded);
    toast.success("Login Successfully");
    console.log("Logged in user:", decoded); // 
    return decoded;
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


     // Log out user
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        localStorage.removeItem("token");
        setUser(null);
      } else {
        setUser(decoded);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  }
  setLoading(false);
}, []);

  const authInfo = {
    user,
    loading,
   setUser,
    createUser,
    signIn,
    logOut,
    
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;