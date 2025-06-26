import { RecentActivity } from "@/components/recent-activity";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function RecentActivityVehicle() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Main Gate Camera - 1</CardTitle>
        <CardDescription>Real-time activity from main gate - 1</CardDescription>
      </CardHeader>
      <CardContent>
        <RecentActivity />
      </CardContent>
    </Card>
  );
}
