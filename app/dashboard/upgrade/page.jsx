'use client'
import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { db } from '@/config/db';
import { USER_TABLE } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

const Upgrade = () => {
    const { user } = useUser();
    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        user && GetUserDetail();
    }, [user]);

    const GetUserDetail = async () => {
        const result = await db.select().from(USER_TABLE)
            .where(eq(USER_TABLE?.email, user?.primaryEmailAddress?.emailAddress));

        setUserDetail(result[0]);
    }



    const OnCheckoutClick = async () => {
        const result = await axios.post('/api/payment/checkout', {
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY
        });
        window.open(result.data?.url)

    }


    const onPaymentManager = async () => {
        const result = await axios.post('/api/payment/manage-payment', {
            customerId: userDetail?.customerId
        });
        window.open(result.data?.url)

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <h2 className="text-3xl font-bold mb-8">Choose Your Plan</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                {/* Free Plan */}
                <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-300 text-center hover:shadow-xl transition">
                    <h3 className="text-2xl font-semibold">Free Plan</h3>
                    <h2 className="text-gray-600 mt-2 font-semibold text-xl">0.00 Rs <span className="text-sm text-gray-500">/month</span></h2>

                    <div className="mt-5 space-y-3 text-left">
                        {[
                            "5 Course Generated",
                            "Limited Support",
                            "Email Support",
                            "Help Center Access"
                        ].map((item, index) => (
                            <p key={index} className="flex items-center gap-3 text-gray-700">
                                <CheckCircle className="text-green-500" size={18} />
                                <span>{item}</span>
                            </p>
                        ))}
                    </div>

                    <button className="w-full mt-6 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg cursor-not-allowed">
                        Current Plan
                    </button>
                </div>

                {/* Monthly Plan */}
                <div className="bg-white p-6 shadow-lg rounded-xl border border-blue-500 text-center hover:shadow-xl transition">
                    <h3 className="text-2xl font-semibold">Pro Plan</h3>
                    <h2 className="text-gray-600 mt-2 font-semibold text-xl">50.00 Rs <span className="text-sm text-gray-500">/month</span></h2>

                    <div className="mt-5 space-y-3 text-left">
                        {[
                            "Unlimited Course Generated",
                            "Unlimited Flashcard, Quiz",
                            "Help Center Access",
                            "Email Support"
                        ].map((item, index) => (
                            <p key={index} className="flex items-center gap-3 text-gray-700">
                                <CheckCircle className="text-green-500" size={18} />
                                <span>{item}</span>
                            </p>
                        ))}
                    </div>

                    {userDetail?.member == false ?
                        <Button onClick={OnCheckoutClick} className="w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            Upgrade for 50.00 Rs/month
                        </Button> :
                        <Button onClick={onPaymentManager} className="w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            Manage Payment
                        </Button>
                    }
                </div>

            </div>
        </div>
    );
}

export default Upgrade;
