"use client";

import { useState } from "react";
import { Search, Star, Clock, MapPin, Award, TrendingUp } from "lucide-react";
 
import { svgPaths } from "@/assets/svg/svg";
import Image from "next/image";
 
export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Handle search logic here
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
 
      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12 lg:py-20">
 
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full shadow-lg border ">
                <div className="relative w-5 h-5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 16 16">
                    <g clipPath="url(#clip0_1_118)">
                      <path
                        d={svgPaths.p2cf0b800}
                        stroke="#0066CC"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        d="M13.3252 1.99878V4.66383"
                        stroke="#0066CC"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        d="M14.6577 3.3313H11.9927"
                        stroke="#0066CC"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        d="M2.66504 11.3264V12.659"
                        stroke="#0066CC"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        d="M3.3313 11.9927H1.99878"
                        stroke="#0066CC"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_118">
                        <rect fill="white" height="15.9903" width="15.9903" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span className="text-gray-700 text-sm">AI-Powered Healthcare</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
<h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight">
  <span className="block">Find Your</span>
  <span className="block">
    Perfect{" "}
    <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
      Doctor
    </span>
  </span>
</h1>


                <p className="text-gray-600 max-w-lg text-lg leading-relaxed">
                  Get personalized doctor recommendations based on your symptoms,
                  location, and preferences. Healthcare made simple and accessible.
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="flex items-stretch">
                  <div className="flex items-center gap-3 flex-1 p-5">
                    <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Describe your symptoms or search for a specialist..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-[#0066cc] to-[#0052a3] hover:from-[#0052a3] hover:to-[#003d7a] transition-all text-white px-8 py-5 shadow-lg hover:shadow-xl"
                  >
                    <span className="block">Find</span>
                    <span className="block">Doctor</span>
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white shadow-md" />
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full border-2 border-white shadow-md" />
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full border-2 border-white shadow-md" />
                  </div>
                  <span className="text-gray-600 text-sm">Trusted by 10,000+ patients</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-gray-700 text-sm ml-1">4.9/5</span>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              {/* Main image card */}
              <div className="relative bg-white rounded-3xl overflow-hidden   border ">
                <Image
                  src="https://doctime.com.bd/images/Home/Become%20a%20Premium%20Member.webp"
                  alt="Professional doctor using smartphone for healthcare services"
                  className="w-full h-full object-cover"
                  height={200}
                  width={200}
                />
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
}
