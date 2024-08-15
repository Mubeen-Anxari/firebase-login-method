"use client"
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth,db } from '../components/firebase/firebaseConfig';
import Link from 'next/link';
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const snapDoc = await getDoc(docRef);

          if (snapDoc.exists()) {
            setUserData(snapDoc.data() as UserData);
          } else {
            console.log("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false); 
        }
      } else {
        console.log("No user is logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserData(null); 
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : userData ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome, {userData.firstName}</h1>
          <div className="mb-4">
            <p className="text-sm text-gray-700">Email: {userData.email}</p>
            <p className="text-sm text-gray-700">First Name: {userData.firstName}</p>
            <p className="text-sm text-gray-700">Last Name: {userData.lastName}</p>
          </div>
        <Link href='/login'>
        <button
            onClick={handleLogout}
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button></Link>
        </div>
      ) : (
        <p className="text-gray-500">No user data available</p>
      )}
    </div>
  );
}
