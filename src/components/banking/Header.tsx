import {
  Bell,
  User,
  Shield,
  Menu,
  LogOut,
  Home,
  CreditCard,
  Send,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link } from "react-router-dom";

interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header({ isAdmin = false }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between shadow-sm">
      <div className="md:w-[200px] flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[85%] max-w-sm p-0 border-none"
            dir="rtl"
          >
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-12 w-12 border-2 border-white/30 shadow-lg">
                  <AvatarFallback className="bg-white/10 text-white font-medium">
                    {isAdmin ? <Shield className="h-4 w-4" /> : "أم"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">
                    {isAdmin ? "مدير النظام" : "أحمد محمد"}
                  </h2>
                  <p className="text-sm opacity-80">
                    {isAdmin ? "مدير" : "عميل مميز"}
                  </p>
                </div>
              </div>
            </div>
            <nav className="flex-1 bg-background py-4">
              <ul className="space-y-1 px-2">
                <li>
                  <Link
                    to="/bank"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-all duration-200 my-1"
                    onClick={() => setOpen(false)}
                  >
                    <span className="bg-primary/10 text-primary p-2 rounded-lg">
                      <Home className="h-5 w-5" />
                    </span>
                    <span className="font-medium">الرئيسية</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bank/accounts"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-all duration-200 my-1"
                    onClick={() => setOpen(false)}
                  >
                    <span className="bg-primary/10 text-primary p-2 rounded-lg">
                      <CreditCard className="h-5 w-5" />
                    </span>
                    <span className="font-medium">الحسابات</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bank/transfers"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-all duration-200 my-1"
                    onClick={() => setOpen(false)}
                  >
                    <span className="bg-primary/10 text-primary p-2 rounded-lg">
                      <Send className="h-5 w-5" />
                    </span>
                    <span className="font-medium">التحويلات</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bank/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-all duration-200 my-1"
                    onClick={() => setOpen(false)}
                  >
                    <span className="bg-primary/10 text-primary p-2 rounded-lg">
                      <Settings className="h-5 w-5" />
                    </span>
                    <span className="font-medium">الإعدادات</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-t bg-background">
              <button
                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-all duration-200"
                onClick={() => {
                  setOpen(false);
                  window.location.href = "/";
                }}
              >
                <span className="bg-destructive/10 p-2 rounded-lg">
                  <LogOut className="h-5 w-5" />
                </span>
                <span className="font-medium">تسجيل الخروج</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 flex justify-center">
        <h1 className="text-2xl font-bold text-primary">بنك الأمان</h1>
      </div>

      <div className="flex items-center md:w-[200px] justify-end">
        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
