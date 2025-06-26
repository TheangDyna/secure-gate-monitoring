"use client";

import { TotalMetricsCards } from "@/app/dashboard/fullscreen/_components/total-metrics-cards";
import { OverviewChart } from "@/components/overview-chart";
import { RecentActivity } from "@/components/recent-activity";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

export default function FullscreenDashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set current time after mount to avoid hydration mismatch
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const refreshTimer = setInterval(
      () => window.location.reload(),
      5 * 60 * 1000
    );
    return () => {
      clearInterval(timer);
      clearInterval(refreshTimer);
    };
  }, []);

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex flex-row items-center justify-between px-4 pt-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            SECUREGATE
          </h1>
        </div>
        <div className="text-right">
          {currentTime && (
            <>
              <p className="font-mono font-bold text-white mb-2 tracking-wider text-5xl">
                {currentTime.toLocaleTimeString()}
              </p>
              <p className="text-2xl text-slate-300 font-light">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col flex-1 px-4 my-4 space-y-4 min-h-0">
        <TotalMetricsCards />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <Card className=" bg-slate-800/50 border-slate-700 backdrop-blur-sm flex flex-col min-h-0">
              <CardHeader>
                <h2 className="text-3xl font-bold text-white">Overview</h2>
                <p className="text-lg text-slate-300">
                  Staff, Guests, and Unregistered Visitors
                </p>
              </CardHeader>
              <CardContent className="pl-2 w-full">
                <OverviewChart />
              </CardContent>
            </Card>
          </div>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm flex flex-col min-h-0">
            <CardHeader>
              <h2 className="text-3xl font-bold text-white">Recent Activity</h2>
              <p className="text-lg text-slate-300">Latest entries and exits</p>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full max-h-[calc(100%-0px)]">
                <RecentActivity />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
