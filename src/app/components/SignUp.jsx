"use client"
import React from 'react';
import { Button, Form, message, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '@/util/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const { Title } = Typography;

const SignUp = () => {
    const router=useRouter();
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.table(user);
          const userRef = doc(db, "users", user.uid);

          const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            await setDoc(userRef, {
                isAdmin: false,
                classes: []
            });
            console.log("User signed in and data stored in Firestore:", user.uid);
        } else {
            console.log("User data already exists in Firestore:", user.uid);
        }

        message.success("SignUp Successful")
      } catch (error) {
        console.error("Error signing in with Google:", error);
        message.error("SignUp Failed")
        }
      };

  return (
    <Button
    icon={<GoogleOutlined />}
    block
    onClick={handleGoogleSignIn}
  >
    Sign in with Google
  </Button>
  );
};

export default SignUp;
