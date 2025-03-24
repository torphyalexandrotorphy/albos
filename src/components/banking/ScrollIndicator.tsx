import { useLocation } from "react-router-dom";

interface ScrollIndicatorProps {
  routes: string[];
  basePath: string;
}

export default function ScrollIndicator(
  { routes, basePath }: ScrollIndicatorProps = {
    routes: [],
    basePath: "/bank",
  },
) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Default routes if none provided
  const defaultBankRoutes = [
    "/bank",
    "/bank/accounts",
    "/bank/currencies",
    "/bank/transfers",
    "/bank/transactions",
    "/bank/savings",
    "/bank/visa",
    "/bank/settings",
  ];

  const defaultAdminRoutes = [
    "/admin",
    "/admin/customers",
    "/admin/accounts",
    "/admin/transactions",
    "/admin/currencies",
    "/admin/settings",
  ];

  // Use provided routes or default based on basePath
  const activeRoutes =
    routes.length > 0
      ? routes
      : basePath === "/admin"
        ? defaultAdminRoutes
        : defaultBankRoutes;

  const currentIndex = activeRoutes.indexOf(currentPath);

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
      {activeRoutes.map((route, index) => (
        <div
          key={route}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
          title={route.split("/").pop() || "home"}
        />
      ))}
    </div>
  );
}
