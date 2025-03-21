'use client'
import SideBar from './_components/SideBar';
import DashboardHeader from './_components/DashboardHeader';
import React, { useState } from 'react';
import { CourseCountContext } from '../_context/CourseCountContext';
import { Menu } from 'lucide-react';

const DashboardLayout = ({ children }) => {
    const [totalCourse, setTotalCourse] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

    return (
        <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
            <div className="flex">
                {/* Sidebar for Large Screens */}
                <div className="md:w-64 hidden md:block fixed">
                    <SideBar />
                </div>

                {/* Sidebar for Small Screens (Mobile) */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                        <div className="w-64 bg-white h-full shadow-lg p-4">
                            <button className="mb-4" onClick={() => setIsSidebarOpen(false)}>✖</button>
                            <SideBar />
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 md:ml-64">
                    {/* Mobile Header with Menu Icon */}
                    <div className="md:hidden flex items-center justify-between p-5 bg-gray-100 shadow-lg">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu className="h-6 w-6" />
                        </button>
                        <DashboardHeader /> {/* No changes in DashboardHeader */}
                    </div>

                    {/* Normal Header for Large Screens */}
                    <div className="hidden md:block">
                        <DashboardHeader />
                    </div>

                    <div className="p-10">{children}</div>
                </div>
            </div>
        </CourseCountContext.Provider>
    );
};

export default DashboardLayout;
