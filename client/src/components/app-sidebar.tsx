import * as React from "react"
import {
  Home,
  Users,
  Settings,
  FileText,
  Cog,
  ChevronsLeft,
  Folder,
  Smartphone,
  LogOut,
  ChevronsRight,
  House,
 ChartNoAxesGantt,
 MonitorCog ,
 BookOpenText,
 BookImage ,
 BookUser ,
 Rocket ,
 TabletSmartphone
} from "lucide-react"
import { Link } from "react-router-dom"
// import { SidebarTrigger } from "../components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter

} from "@/components/ui/sidebar"

const data = {
  navMain: [
    { title: "Our Leadership", url: "/our-leadership", icon: Users },
    {title:"Organogram",url:"/oraganogram",icon:ChartNoAxesGantt},
    { title: "Applications", url: "/application-policies", icon:MonitorCog },
    { title: "Policies", url: "/policies", icon:BookOpenText  },
    { title: "Magazine", url: "/magazine", icon:BookImage  },
    { title: "DFCCIL Directory", url: "/dfccil-directory", icon: BookUser  },
    { title: "Manage Applications", url: "/manage-applications", icon: Settings },
  ],
}

interface AppSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export function AppSidebar({ isCollapsed, toggleSidebar, ...props }: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  return (
    <div
      className={`flex flex-col bg-white shadow-md transition-all duration-300 border-r-2 h-full
        ${isCollapsed ? "w-20" : "w-80"}
      `}
    >
      {/* Header */}
      {/* <SidebarHeader className=" p-2 pt-3 border-b flex items-center justify-between">
        <span className={`text-lg text-gray-400 ${isCollapsed ? 'hidden' : ''}`}>EMS</span>
        <div className="flex items-center gap-2">
          <button onClick={() => {}} className="text-white">
            {isCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
          </button>
        </div>
      </SidebarHeader> */}

      {/* Navigation Links */}
      <SidebarContent className="flex-1">
        <SidebarGroup className="">
          <SidebarMenu className="space-y-0">
            <SidebarMenuItem key="home">
              <SidebarMenuButton asChild size="lg" className="bg-blue-600 hover:bg-blue-700 hover:text-white">
                <Link
                  to="/"
                  onClick={toggleSidebar}
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md transition-all group"
                >
                  <Home size={50} className="group-hover:text-white text-white" />
                  {!isCollapsed && <span className="text-lg font-semibold text-white">Home</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key="our-leadership">
              <SidebarMenuButton asChild className="hover:bg-blue-600 hover:text-white">
                  <Link
                    to="/our-leadership"
                    onClick={toggleSidebar}
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md transition-all group"
                  >
                  <Users size={40} className="text-gray-700  group-hover:text-white" />
                  {!isCollapsed && <span>Our Leadership</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key="organogram">
              <SidebarMenuButton asChild className="hover:bg-blue-600 hover:text-white">
                  <Link
                    to="/oraganogram"
                    onClick={toggleSidebar}
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md transition-all group"
                  >
                  <ChartNoAxesGantt size={40} className="text-gray-700 group-hover:text-white" />
                  {!isCollapsed && <span>Organogram</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {data.navMain.slice(2).map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="hover:bg-blue-600 hover:text-white">
                  <Link
                    to={item.url}
                    onClick={toggleSidebar}
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md transition-all group"
                  >
                    <item.icon size={40} className="text-gray-700 group-hover:text-white" />
                   {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t">
        <SidebarFooter className="border-t-2 border-red-600">
          <SidebarMenu className="space-y-0">
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="hover:!bg-blue-700 hover:!text-white">
                <Link
                  to="/mobile-app"
                  onClick={toggleSidebar}
                  className="flex items-center gap-2 px-3 py-1 text-gray-700 rounded-md transition-all group"
                >
                  <TabletSmartphone className="size-7 text-gray-700 group-hover:text-white" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">Mobile App</span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild className="hover:!bg-blue-700 hover:!text-white">
                <Link
                  to="/signout"
                  onClick={toggleSidebar}
                  className="flex items-center gap-2 px-3 py-1 text-gray-700 rounded-md transition-all group"
                >
                  <LogOut className="size-7 text-gray-700 group-hover:text-white" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">Sign Out</span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
         </SidebarFooter>
        </div>
    </div>
  )
}






