"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Truck,
  UserCheck,
  UserX
} from "lucide-react";
import { useEffect, useState } from "react";

type ActivityType =
  | "staff_entry"
  | "staff_exit"
  | "guest_entry"
  | "guest_exit"
  | "unregistered_entry"
  | "unregistered_exit"
  | "oil_truck_entry"
  | "oil_truck_exit";

type Activity = {
  id: string;
  type: ActivityType;
  timestamp: string;
  details: string;
};

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // In a real app, this would be an API call
        // For demo, we'll generate sample data
        const activityTypes: ActivityType[] = [
          "staff_entry",
          "staff_exit",
          "guest_entry",
          "guest_exit",
          "unregistered_entry",
          "unregistered_exit",
          "oil_truck_entry",
          "oil_truck_exit"
        ];

        const names = [
          "John Smith",
          "Maria Garcia",
          "Ahmed Ali",
          "Li Wei",
          "Sarah Johnson",
          "Carlos Rodriguez",
          "Emma Wilson"
        ];

        const truckIds = ["T-1234", "T-5678", "T-9012", "T-3456", "T-7890"];

        const generateActivity = (index: number): Activity => {
          const type =
            activityTypes[Math.floor(Math.random() * activityTypes.length)];
          const now = new Date();
          now.setMinutes(now.getMinutes() - index * 2);

          let details = "";
          if (type.includes("staff") || type.includes("guest")) {
            details = names[Math.floor(Math.random() * names.length)];
          } else if (type.includes("unregistered")) {
            details = "Unknown Person";
          } else if (type.includes("oil_truck")) {
            details = truckIds[Math.floor(Math.random() * truckIds.length)];
          }

          return {
            id: `act-${index}`,
            type,
            timestamp: now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }),
            details
          };
        };

        const sampleActivities = Array.from({ length: 15 }, (_, i) =>
          generateActivity(i)
        );
        setActivities(sampleActivities);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        setLoading(false);
      }
    };

    fetchActivities();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: ActivityType) => {
    if (type.includes("staff")) {
      return (
        <UserCheck
          className={`h-5 w-5 ${
            type.includes("entry") ? "text-green-500" : "text-red-500"
          }`}
        />
      );
    } else if (type.includes("guest")) {
      return (
        <UserCheck
          className={`h-5 w-5 ${
            type.includes("entry") ? "text-green-500" : "text-red-500"
          }`}
        />
      );
    } else if (type.includes("unregistered")) {
      return (
        <UserX
          className={`h-5 w-5 ${
            type.includes("entry") ? "text-yellow-500" : "text-red-500"
          }`}
        />
      );
    } else if (type.includes("oil_truck")) {
      return (
        <Truck
          className={`h-5 w-5 ${
            type.includes("entry") ? "text-blue-500" : "text-red-500"
          }`}
        />
      );
    }
    return null;
  };

  const getActivityText = (activity: Activity) => {
    if (activity.type.includes("staff")) {
      return `Staff ${activity.type.includes("entry") ? "entered" : "exited"}`;
    } else if (activity.type.includes("guest")) {
      return `Guest ${activity.type.includes("entry") ? "entered" : "exited"}`;
    } else if (activity.type.includes("unregistered")) {
      return `Unregistered ${
        activity.type.includes("entry") ? "entered" : "exited"
      }`;
    } else if (activity.type.includes("oil_truck")) {
      return `Oil truck ${
        activity.type.includes("entry") ? "entered" : "exited"
      }`;
    }
    return "";
  };

  const getDirectionIcon = (type: ActivityType) => {
    if (type.includes("entry")) {
      return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
    } else {
      return <ArrowUpRight className="h-4 w-4 text-red-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center gap-3 p-2 border-b border-slate-700 last:border-0"
        >
          <div className="p-2 bg-slate-700/50 rounded-full">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{activity.details}</p>
            <div className="flex items-center gap-1">
              <p className="text-muted-foreground text-xs">
                {getActivityText(activity)}
              </p>
              {getDirectionIcon(activity.type)}
            </div>
          </div>
          <p className="text-slate-500 font-mono text-xs">
            {activity.timestamp}
          </p>
        </div>
      ))}
    </div>
  );
}
