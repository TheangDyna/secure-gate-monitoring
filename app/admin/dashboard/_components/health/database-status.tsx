import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function DatabaseStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Status</CardTitle>
        <CardDescription>
          Database performance and storage metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Storage Used</span>
            <span className="font-mono">2.4 GB / 10 GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: "24%" }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Last Backup: 2 hours ago</span>
            <span>Status: Healthy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
