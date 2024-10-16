"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed User");
      } else {
        toast.error("FORBIDDEN  Route");
      }
    });
  };
  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔐 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Welcome to Admin Page" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-Only-API_Route Page</p>
        </div>
        <Button onClick={onApiRouteClick}>Click to test</Button>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-Only-server_Actions Page</p>
        </div>
        <Button>Click to test</Button>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
