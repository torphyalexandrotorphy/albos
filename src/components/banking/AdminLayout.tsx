import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Header from "./Header";
import AdminMobileNav from "./AdminMobileNav";
import AdminMobileBottomNav from "./AdminMobileBottomNav";
import AdminFloatingActionButton from "./AdminFloatingActionButton";
import ScrollToTopButton from "./ScrollToTopButton";

export default function AdminLayout() {
  return (
    <div
      className="flex h-screen bg-gray-50 text-right overflow-x-hidden max-w-full"
      dir="rtl"
    >
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden w-full max-w-full">
        <Header isAdmin={true} />
        <AdminMobileNav />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-20 md:pb-4 bg-gray-50/80 section max-w-full">
          <Outlet />
        </main>
        <AdminFloatingActionButton />
        <AdminMobileBottomNav />
        <ScrollToTopButton />
      </div>
    </div>
  );
}
