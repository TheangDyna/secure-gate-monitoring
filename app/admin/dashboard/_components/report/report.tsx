import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function Report() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>
            Create detailed reports for analysis and compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="w-full justify-start">
              Daily Activity Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Weekly Summary
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Monthly Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Staff Attendance
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
          <CardDescription>
            Export system data in various formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              Export to CSV
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Export to PDF
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Export to Excel
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Backup Database
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
