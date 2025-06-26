import { RecentActivity } from "@/components/recent-activity";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function RecentActivityPeople() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Main Gate Camera - 2</CardTitle>
        <CardDescription>Real-time activity from main gate - 2</CardDescription>
      </CardHeader>
      <CardContent>
        <RecentActivity />
      </CardContent>
    </Card>
  );
}
