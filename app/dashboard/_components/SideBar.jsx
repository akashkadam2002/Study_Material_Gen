"use client"
import Image from 'next/image';
import React, { useContext } from 'react';
import { LayoutDashboard, Mic, Shield, UserCircle } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { CourseCountContext } from '@/app/_context/CourseCountContext';

const SideBar = () => {
  const MenuList = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      name: 'Interview',
      icon: Mic,
      path: 'https://ai-mock-interview-jet.vercel.app',
      external: true // Add a flag for external links
    },    
    {
      name: 'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade'
    },
    {
      name: 'Contact',
      icon: UserCircle,
      path: '/dashboard/profile'
    },
  ]

  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);

  const path = usePathname();
  return (
    <div className='h-screen shadow-lg p-5 flex flex-col'>
    <div className='flex gap-5 items-center '>
      <Image src={'/logo.webp'} alt='logo' width={120} height={50} />
      <h2 className='font-bold text-2xl'>Easy Study</h2>
    </div>
  
    <div className='mt-10 flex-grow'>
      <Link href={'/create'}>
        <Button className='w-full'>+ Create New</Button>
      </Link>
  
      <div className='mt-7'>
        {MenuList.map((menu, index) => (
          <Link key={index} href={menu.path} className='block'>
            <div className={`flex items-center gap-5 p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-4 ${path === menu.path && 'bg-slate-300'}`}>
              <menu.icon />
              <h2>{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  
    {/* Credits Section (Fixed at the Bottom) */}
    <div className='border p-3 bg-slate-300 rounded-lg'>
      <h2 className='text-lg mb-2'>Available Credits: {(5 - totalCourse)}</h2>
      <Progress value={(totalCourse / 5) * 100} />
      <h2 className='text-sm'>{totalCourse} Out of 5 Credits Used</h2>
      <Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-4'>Upgrade to Create More</Link>
    </div>
  </div>
  
  );
}

export default SideBar;
