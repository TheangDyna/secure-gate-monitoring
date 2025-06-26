"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { CheckCircle, Edit, Search, Trash2, XCircle } from "lucide-react";
import { useState } from "react";

interface StaffMember {
  id: string;
  name: string;
  department: string;
  position: string;
  status: "active" | "inactive";
  enrollmentDate: string;
  lastAccess: string;
  avatarUrl?: string;
}

const mockStaffData: StaffMember[] = [
  {
    id: "STF001",
    name: "John Smith",
    department: "Engineering",
    position: "Senior Engineer",
    status: "active",
    enrollmentDate: "2023-01-15",
    lastAccess: "2023-06-12 08:45",
    avatarUrl: "/avatars/1.png"
  },
  {
    id: "STF002",
    name: "Jane Doe",
    department: "Human Resources",
    position: "HR Manager",
    status: "active",
    enrollmentDate: "2023-02-20",
    lastAccess: "2023-06-12 09:30",
    avatarUrl: "/avatars/2.png"
  },
  {
    id: "STF003",
    name: "Robert Johnson",
    department: "Finance",
    position: "Financial Analyst",
    status: "active",
    enrollmentDate: "2023-03-10",
    lastAccess: "2023-06-11 17:15",
    avatarUrl: "/avatars/3.png"
  },
  {
    id: "STF004",
    name: "Emily Davis",
    department: "Marketing",
    position: "Marketing Specialist",
    status: "inactive",
    enrollmentDate: "2023-01-05",
    lastAccess: "2023-05-30 14:20",
    avatarUrl: "/avatars/4.png"
  },
  {
    id: "STF005",
    name: "Michael Wilson",
    department: "Operations",
    position: "Operations Manager",
    status: "active",
    enrollmentDate: "2023-04-18",
    lastAccess: "2023-06-12 10:05",
    avatarUrl: "/avatars/5.png"
  },
  {
    id: "STF006",
    name: "Sarah Brown",
    department: "Security",
    position: "Security Officer",
    status: "active",
    enrollmentDate: "2023-02-28",
    lastAccess: "2023-06-12 07:30",
    avatarUrl: "/avatars/6.png"
  },
  {
    id: "STF007",
    name: "David Lee",
    department: "Engineering",
    position: "Software Developer",
    status: "active",
    enrollmentDate: "2023-05-02",
    lastAccess: "2023-06-12 09:15",
    avatarUrl: "/avatars/7.png"
  },
  {
    id: "STF008",
    name: "Lisa Chen",
    department: "Finance",
    position: "Accountant",
    status: "inactive",
    enrollmentDate: "2023-03-15",
    lastAccess: "2023-05-25 11:45",
    avatarUrl: "/avatars/8.png"
  }
];

export function StaffDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [staff, setStaff] = useState<StaffMember[]>(mockStaffData);

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setStaff(staff.filter((member) => member.id !== id));
  };

  const getAvatarFallback = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Database</CardTitle>
        <CardDescription>Manage enrolled staff members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search staff..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button size="sm">Add Staff</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Access</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={member.avatarUrl || "/placeholder.svg"}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {getAvatarFallback(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          {member.name}
                        </div>
                      </TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.position}</TableCell>
                      <TableCell>
                        {member.status === "active" ? (
                          <Badge className="bg-green-500">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-red-500 border-red-500"
                          >
                            <XCircle className="mr-1 h-3 w-3" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{member.lastAccess}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No staff members found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
