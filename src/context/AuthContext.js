"use client"
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '@/util/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        
        axios.get(`/api/getUser?uid=${currentUser.uid}`)
          .then((response) => {
            if (response.data.userData) {
              setUserData(response.data.userData);
              console.log(response.data.userData);
              console.log(currentUser);
            } else {
              console.error('Error fetching user data:', response.data.error);
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userData,setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};