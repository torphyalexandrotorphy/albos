import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Home,
  CreditCard,
  Send,
  Users,
  Wallet,
  Settings,
  Bell,
  DollarSign,
  BarChart3,
  PiggyBank,
  MessageCircle,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "الرئيسية", href: "/bank" },
  { icon: CreditCard, label: "البطاقة", href: "/bank/visa" },
  { icon: Send, label: "التحويلات", href: "/bank/transfers" },
  { icon: Settings, label: "الإعدادات", href: "/bank/settings" },
  { icon: MessageCircle, label: "المساعدة", href: "/bank/help" },
];

export default function NavigationMenu() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.slice(0, 6).map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex flex-col items-center justify-center w-16"
            onClick={() => setActiveItem(item.href)}
          >
            <div
              className={`p-2 rounded-full ${activeItem === item.href ? "bg-primary text-white" : "text-gray-500"}`}
            >
              <item.icon className="h-5 w-5" />
            </div>
            <span
              className={`text-xs mt-1 ${activeItem === item.href ? "text-primary font-medium" : "text-gray-500"}`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
