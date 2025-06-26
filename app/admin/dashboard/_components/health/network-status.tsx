import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function NetworkStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Status</CardTitle>
        <CardDescription>Network connectivity and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Main Gate Connection</span>
            <span className="text-green-600 font-semibold">Online</span>
          </div>
          <div className="flex justify-between">
            <span>Office Gate Connection</span>
            <span className="text-green-600 font-semibold">Online</span>
          </div>
          <div className="flex justify-between">
            <span>Database Connection</span>
            <span className="text-green-600 font-semibold">Online</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Latency: 12ms</span>
            <span>Uptime: 99.9%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
