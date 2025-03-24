import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import MobileBottomNav from "./MobileBottomNav";
import FloatingActionButton from "./FloatingActionButton";
import NavigationMenu from "./NavigationMenu";
import ScrollToTopButton from "./ScrollToTopButton";

export default function BankLayout() {
  return (
    <div
      className="flex h-screen bg-blue-50 text-right overflow-x-hidden max-w-full"
      dir="rtl"
    >
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden w-full max-w-full">
        <Header />
        <MobileNav />
        <main className="flex-1 p-4 pb-20 md:pb-4 bg-blue-50 overflow-x-hidden section max-w-full">
          <Outlet />
        </main>
        <FloatingActionButton />
        <NavigationMenu />
        <ScrollToTopButton />
      </div>
    </div>
  );
}
