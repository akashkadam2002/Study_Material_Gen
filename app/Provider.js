"use client"
// import { db } from '@/config/db';
// import { USER_TABLE } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
// import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react';

const Provider = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    user && CheckIsNewUser();
  }, [user]);
  

  // const CheckIsNewUser = async () => {
  //   // if (!user) return;
  
  //   // const userEmail = user?.primaryEmailAddress?.emailAddress;
  //   // const userName = user?.fullName || "Unknown User"; // Provide a default name
  
  //   // const result = await db.select().from(USER_TABLE)
  //   //   .where(eq(USER_TABLE.email, userEmail));
  
  //   // console.log(result);
  
  //   // if (result?.length === 0) {
  //   //   try {
  //   //     const userRes = await db.insert(USER_TABLE).values({
  //   //       name: userName,
  //   //       email: userEmail
  //   //     }).returning({ id: USER_TABLE.id });
  
  //   //     console.log(userRes);
  //   //   } catch (error) {
  //   //     console.error("Database Insert Error:", error);
  //   //   }
  //   // }

  //   const res = await axios.post('/api/create-user',{user:user});
  //   console.log(res.data);
  // };

  const CheckIsNewUser = async () => {
    try {
        const res = await axios.post('/api/create-user', { user });
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
    }
};

  
  return (
    <div>
      {children}
    </div>
  );
}

export default Provider;
