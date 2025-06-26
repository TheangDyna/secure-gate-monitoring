"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BikeIcon,
  CarIcon,
  TruckIcon,
  UserCheck,
  UserCog,
  UserIcon,
  UsersIcon
} from "lucide-react";
import { useEffect, useState } from "react";

export function TotalMetricsCards() {
  const [metrics, setMetrics] = useState({
    totalPeople: 0,
    staff: 0,
    guests: 0,
    unregistered: 0,
    oilTrucks: 0
  });

  useEffect(() => {
    const fetchData = () => {
      setMetrics({
        totalPeople: 137,
        staff: 83,
        guests: 42,
        unregistered: 12,
        oilTrucks: 8
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-3 xl:grid-cols-4">
      <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500 shadow-xl shadow-blue-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-bold text-white text-lg">
            Total People
          </CardTitle>
          <UsersIcon className="h-6 w-6 text-blue-200" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            {metrics.totalPeople}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-blue-200 flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1 text-green-400" />
              +12% from yesterday
            </p>
            <Badge variant="outline">Peak: 8:30 AM</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 border-indigo-500 shadow-xl shadow-indigo-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-bold text-white text-lg">Staff</CardTitle>
          <UserCheck className="h-6 w-6 text-indigo-200" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            {metrics.staff}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-indigo-200 flex items-center">
              <ArrowDownIcon className="h-4 w-4 mr-1 text-red-400" />
              -3% from yesterday
            </p>
            <Badge variant="outline">Expected: 85</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-purple-500 shadow-xl shadow-purple-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-bold text-white text-lg">
            Contractors
          </CardTitle>
          <UserCog className="h-6 w-6 text-purple-200" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            {metrics.oilTrucks}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-purple-200 flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1 text-green-400" />
              +18% from yesterday
            </p>
            <Badge variant="outline">Capacity: 10</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-pink-600 to-pink-800 border-pink-500 shadow-xl shadow-pink-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-bold text-white text-lg">Guests</CardTitle>
          <UserIcon className="h-6 w-6 text-pink-200" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            {metrics.guests + metrics.unregistered}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-pink-200 flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1 text-green-400" />
              +18% from yesterday
            </p>
            <Badge variant="outline">Registered: {metrics.guests}</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-red-600 to-red-800 border-red-500 shadow-xl shadow-red-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-bold text-white text-lg">
            Oil Trucks
          </CardTitle>
          <TruckIcon className="h-6 w-6 text-red-200" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            {metrics.oilTrucks}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-red-200 flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1 text-green-400" />
              +18% from yesterday
            </p>
            <Badge variant="outline">Capacity: 10</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-orange-600 to-orange-800 border-orange-500 shadow-xl shadow-orange-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-bold text-white text-lg">Cars</CardTitle>
          <CarIcon className="h-6 w-6 text-orange-200" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            {metrics.oilTrucks}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-orange-200 flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1 text-green-400" />
              +18% from yesterday
            </p>
            <Badge variant="outline">Capacity: 10</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-amber-600 to-amber-800 border-amber-500 shadow-xl shadow-amber-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-bold text-white text-lg">Bikes</CardTitle>
          <BikeIcon className="h-6 w-6 text-amber-200" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            {metrics.oilTrucks}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-amber-200 flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1 text-green-400" />
              +18% from yesterday
            </p>
            <Badge variant="outline">Capacity: 10</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
