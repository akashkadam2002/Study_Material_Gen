"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Phone } from "lucide-react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";

const Profile = () => {
  // Mock user data (Replace with real user data)
  const user = {
    name: "Akash Kadam",
    email: "akashkadam1817@gmail.com",
    mobile: "7620671124",
    role: "Software Developer",
    bio: "Passionate developer and tech enthusiast. I love creating intuitive user experiences and exploring new technologies.",
    joined: "June 2024",
    avatar: "/profile.avif", // Replace with user's avatar
    resume: "/Akash_Kadam_Resume.pdf", // Path to your resume file
    social: {
      instagram: "https://www.instagram.com/akash_kadam_0709?igsh=YjQ1NHlnZXVoNDFn",
      linkedin: "https://www.linkedin.com/in/akash-kadam-051965288/",
      github: "https://github.com/akashkadam2002",
    },
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6 text-gray-900">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        {/* Avatar */}
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600 font-bold">{user.role}</p>
          <p className="text-gray-600">{user.bio}</p>
        </div>
      </div>

      {/* User Details */}
      <div className="mt-6 space-y-4">
        {/* Email (Clickable) */}
        <div className="flex items-center space-x-3">
          <Mail className="text-gray-500" />
          <a
            href={`mailto:${user.email}`}
            className="text-blue-600 hover:underline"
          >
            {user.email}
          </a>
        </div>

        {/* Mobile (Clickable) */}
        <div className="flex items-center space-x-3">
          <Phone className="text-gray-500" />
          <a
            href={`tel:${user.mobile}`}
            className="text-gray-700 hover:underline"
          >
            {user.mobile}
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Calendar className="text-gray-500" />
          <p className="text-gray-700">Joined: {user.joined}</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-6 flex space-x-6">
        <a
          href={user.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-600 text-2xl transition-all"
        >
          <FaInstagram />
        </a>
        <a
          href={user.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 text-2xl transition-all"
        >
          <FaLinkedin />
        </a>
        <a
          href={user.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-900 text-2xl transition-all"
        >
          <FaGithub />
        </a>
      </div>

      {/* Download Resume Button */}
      <div className="mt-6">
        <a
          href="https://drive.google.com/uc?export=download&id=1psNSe6izMktuAzIIJ1Ohkz69_j1NoLc1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white">
            <span>Download Resume</span>
          </Button>
        </a>
      </div>

    </div>
  );
};

export default Profile;
