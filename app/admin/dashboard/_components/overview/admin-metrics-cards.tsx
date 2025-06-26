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

export function AdminMetricsCards() {
  const [metrics, setMetrics] = useState({
    totalPeople: 0,
    staff: 0,
    guests: 0,
    unregistered: 0,
    oilTrucks: 0
  });

  useEffect(() => {
    // Simulate fetching data
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Total People</CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalPeople}</div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1 text-green-500" />
              +12% from yesterday
            </p>
            <Badge variant="outline">Peak: 8:30 AM</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Staff</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.staff}</div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownIcon className="h-3 w-3 mr-1 text-red-500" />
              -3% from yesterday
            </p>
            <Badge variant="outline">Expected: 85</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Contractors</CardTitle>
          <UserCog className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.oilTrucks}</div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1 text-green-500" />
              +18% from yesterday
            </p>

            <Badge variant="outline">Capacity: 10</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Guests</CardTitle>
          <UserIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.guests + metrics.unregistered}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1 text-green-500" />
              +18% from yesterday
            </p>

            <Badge variant="outline">Registered: {metrics.guests}</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Oil Trucks</CardTitle>
          <TruckIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.oilTrucks}</div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1 text-green-500" />
              +18% from yesterday
            </p>

            <Badge variant="outline">Capacity: 10</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Cars</CardTitle>
          <CarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.oilTrucks}</div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1 text-green-500" />
              +18% from yesterday
            </p>

            <Badge variant="outline">Capacity: 10</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Bikes</CardTitle>
          <BikeIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.oilTrucks}</div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1 text-green-500" />
              +18% from yesterday
            </p>

            <Badge variant="outline">Capacity: 10</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
