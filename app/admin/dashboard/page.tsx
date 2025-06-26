"use client";

import { DatabaseStatus } from "@/app/admin/dashboard/_components/health/database-status";
import { NetworkStatus } from "@/app/admin/dashboard/_components/health/network-status";
import { CameraFeedPeople } from "@/app/admin/dashboard/_components/monitor/camera-feed-people";
import { CameraFeedVehicle } from "@/app/admin/dashboard/_components/monitor/camera-feed-vehicle";
import { RecentActivityPeople } from "@/app/admin/dashboard/_components/monitor/recent-activity-people";
import { RecentActivityVehicle } from "@/app/admin/dashboard/_components/monitor/recent-activity-vehicle";
import { AdminMetricsCards } from "@/app/admin/dashboard/_components/overview/admin-metrics-cards";
import { Report } from "@/app/admin/dashboard/_components/report/report";
import { StaffDatabase } from "@/app/admin/dashboard/_components/staff/staff-database";
import { OverviewChart } from "@/components/overview-chart";
import { RecentActivity } from "@/components/recent-activity";
import { StaffVsGuestChart } from "@/components/staff-vs-guest-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleCountChart } from "@/components/vehicle-count-chart";
import { Home, Monitor, UserPlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const TABS_KEY = "admin-dashboard-tab";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const savedTab =
      typeof window !== "undefined"
        ? localStorage.getItem(TABS_KEY)
        : "overview";
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(TABS_KEY, value);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Secure Gate Monitoring</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/fullscreen">
              <Button variant="outline" size="sm">
                <Monitor className="mr-2 h-4 w-4" />
                Fullscreen
              </Button>
            </Link>
            <Link href="/kiosk">
              <Button variant="outline" size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Kiosk
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <section className="container pt-4 mx-auto">
          <Tabs
            value={activeTab ?? undefined}
            onValueChange={handleTabChange}
            className="space-y-2"
          >
            <TabsList className="inline-flex min-w-full w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
              <TabsTrigger value="staff">Staff Management</TabsTrigger>
              <TabsTrigger value="system">System Health</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <AdminMetricsCards />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>People Count</CardTitle>
                      <CardDescription>
                        Staff, Guests, and Unregistered Visitors
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2 w-full h-[300px]">
                      <OverviewChart />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Occupancy Distribution</CardTitle>
                      <CardDescription>
                        Current facility breakdown
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2 w-full h-[300px]">
                      <StaffVsGuestChart />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Oil Truck Traffic</CardTitle>
                      <CardDescription>Entry and exit patterns</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2 w-full h-[300px]">
                      <VehicleCountChart />
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest entries and exits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <CameraFeedVehicle />
                <CameraFeedPeople />
                <RecentActivityVehicle />
                <RecentActivityPeople />
              </div>
            </TabsContent>

            <TabsContent value="staff" className="space-y-4">
              <StaffDatabase />
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <DatabaseStatus />
                <NetworkStatus />
              </div>
              {/* <SystemHealthPanel /> */}
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Report />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}
