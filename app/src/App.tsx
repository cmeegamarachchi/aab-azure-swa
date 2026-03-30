import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./features/home";
import { ErrorPage, Site404Page } from "./features/core";
import { ContactsPage } from "./features/contacts";
import { SettingsPage } from "./features/settings";
import { TooltipProvider } from "./components/ui/tooltip";
import { SidebarProvider } from "./components/ui/sidebar";
import { ConfigurationProvider } from "./providers/ConfigurationProvider";
import { Toaster } from "@/components/ui/sonner"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contacts",
    element: <ContactsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contacts/all",
    element: <ContactsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <Site404Page />,
  },
]);

function App() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <ConfigurationProvider>
          <RouterProvider router={router}></RouterProvider>
        </ConfigurationProvider>
      </SidebarProvider>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
