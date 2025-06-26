import { ArrowRight, Monitor, Settings, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center mx-auto">
          <h1 className="text-xl font-bold">Secure Gate Monitoring</h1>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Secure Gate Monitoring</h2>
            <p className="text-lg text-muted-foreground">
              Choose your interface
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center pb-4">
                <Monitor className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Fullscreen Display</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-lg font-semibold text-primary mb-2">
                  Monitor Display
                </div>
                <p className="text-sm text-muted-foreground">
                  Overall dashboard for wall displays and monitoring screens.
                  Shows key metrics and real-time activity.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/fullscreen" className="w-full">
                  <Button className="w-full" size="sm">
                    Open Display
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-orange-500">
              <CardHeader className="text-center pb-4">
                <Settings className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Control Center</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-lg font-semibold text-orange-500 mb-2">
                  Admin Dashboard
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete administrative interface with monitoring, staff
                  management, system controls, and analytics.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/admin/dashboard" className="w-full">
                  <Button className="w-full" size="sm" variant="outline">
                    Admin Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-green-500">
              <CardHeader className="text-center pb-4">
                <UserPlus className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Registration</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-lg font-semibold text-green-500 mb-2">
                  Guest Kiosk
                </div>
                <p className="text-sm text-muted-foreground">
                  Self-service registration interface for visitors and guests
                  with photo capture.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/kiosk" className="w-full">
                  <Button className="w-full" size="sm" variant="outline">
                    Open Kiosk
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
