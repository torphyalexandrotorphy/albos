import { CreditCard } from "lucide-react";

export default function BankAccounts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">حسابات البنك</h1>
            <p className="text-sm text-muted-foreground">
              هذه الصفحة غير متاحة حالياً
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground text-center">
          هذه الصفحة غير متاحة حالياً. يرجى التواصل مع مدير النظام للحصول على
          مزيد من المعلومات.
        </p>
      </div>
    </div>
  );
}
