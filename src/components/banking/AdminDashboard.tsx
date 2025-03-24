import React from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Card className="border-none shadow-md bg-white">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <AlertCircle className="h-16 w-16 text-destructive/80" />
            <h2 className="text-2xl font-bold">هذه الصفحة غير متاحة حالياً</h2>
            <p className="text-muted-foreground max-w-md">
              لوحة التحكم الإدارية قيد الصيانة. يرجى التواصل مع مسؤول النظام
              للحصول على مزيد من المعلومات.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
