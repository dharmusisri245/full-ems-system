

//=================================================================================


"use client";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ChevronsLeft,
  ChevronsRight,
  Settings,
  Info,
  Headphones,
  Menu,
} from "lucide-react";

// ✅ Hide scrollbar utility
const hideScrollbar = `
  .hide-scrollbar {
    scrollbar-width: none;        /* Firefox */
    -ms-overflow-style: none;     /* IE, Edge */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;                /* Chrome, Safari */
  }
`;
if (typeof document !== "undefined" && !document.getElementById("hide-scrollbar-style")) {
  const style = document.createElement("style");
  style.id = "hide-scrollbar-style";
  style.innerHTML = hideScrollbar;
  document.head.appendChild(style);
}

// 🔹 Menu Data
const menuData: Record<string, { title: string; href: string; description: string }[]> = {
  Home: [
    { title: "Overview", href: "/home/overview", description: "Quick insights into all services and updates." },
    { title: "Features", href: "/home/features", description: "Explore the latest features and add-ons." },
  ],
  "Marriage Lawn": [
    { title: "VVIP Lawn", href: "/marriage-lawn/vvip", description: "Luxurious outdoor venue with premium facilities." },
    { title: "VIP Lawn", href: "/marriage-lawn/vip", description: "Spacious area ideal for grand celebrations." },
    { title: "Medium Lawn", href: "/marriage-lawn/medium", description: "Perfect for small gatherings and events." },
  ],
  "Your Hotel": [
    { title: "Hotel Taj", href: "/hotels/taj", description: "5-star luxury hotel with exceptional service." },
    { title: "Lemon Tree", href: "/hotels/lemon-tree", description: "Comfortable stay at affordable prices." },
    { title: "Hyatt", href: "/hotels/hyatt", description: "Premium business-class accommodations." },
  ],
  "Tent System": [
    { title: "Wedding Tents", href: "/tents/wedding", description: "Decorative tents for weddings and receptions." },
    { title: "Corporate Tents", href: "/tents/corporate", description: "Professional setups for official events." },
  ],
  "Sound & DJ System": [
    { title: "DJ Max Pro", href: "/sound/djmax", description: "High-quality DJ and speaker setup." },
    { title: "Concert Setup", href: "/sound/concert", description: "Powerful systems for live events." },
  ],
  "Catering Services": [
    { title: "Veg Menu", href: "/catering/veg", description: "Delicious vegetarian cuisines." },
    { title: "Non-Veg Menu", href: "/catering/nonveg", description: "Variety of non-vegetarian dishes." },
    { title: "Desserts", href: "/catering/desserts", description: "Sweet treats to complete your feast." },
  ],
  "Light System": [
    { title: "Stage Lighting", href: "/lights/stage", description: "Professional lights for stage and decor." },
    { title: "Ambient Lighting", href: "/lights/ambient", description: "Create the perfect mood lighting." },
  ],
  Vehicle: [
    { title: "Scorpio", href: "/vehicles/scorpio", description: "Spacious and stylish ride for any occasion." },
    { title: "Fortuner", href: "/vehicles/fortuner", description: "Powerful SUV ideal for travel and luxury." },
    { title: "BMW", href: "/vehicles/bmw", description: "Luxury and comfort on wheels." },
    { title: "Audi", href: "/vehicles/audi", description: "Premium sedan with elegant style." },
  ],
};

// 🔹 Props
interface ContentCompoProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}

// 🔹 Component
export const ContentCompo: React.FC<ContentCompoProps> = ({
  toggleSidebar,
  isCollapsed,
}) => {
  // ✅ Scroll lock only when sidebar open
  React.useEffect(() => {
    if (!isCollapsed) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
  }, [isCollapsed]);

  return (
    <header className="w-full border-b shadow-sm bg-[#0a010acf] px-2 py-1 relative z-50">
      {/* ✅ Bounded flex with hidden scrollbars */}
      <div className="flex justify-evenly items-center gap-2 overflow-x-auto overflow-y-auto hide-scrollbar w-full">

        {/* 🔹 Sidebar Toggle Section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-white font-semibold">All</span>
          <button
            onClick={toggleSidebar}
            className="text-white bg-white/20 hover:bg-white/30 p-1 rounded transition"
          >
            {/* {isCollapsed ? (
              <ChevronsRight className="h-5 w-5" />
            ) : (
              <ChevronsLeft className="h-5 w-5" />
            )} */}
            {
              isCollapsed ?(
                <Menu className="h-5 w-5" />
              ):(
                <Menu className="h-5 w-5"/>
              )
            }
          </button>
        </div>

        {/* 🔹 Navigation Menu */}
        <NavigationMenu className="flex-shrink-0">
          <NavigationMenuList className="flex gap-4 justify-center">
            {Object.keys(menuData).map((label) => (
              <NavigationMenuItem key={label} className="relative">
                <NavigationMenuTrigger className="px-3 py-1 text-white bg-transparent hover:bg-transparent focus:bg-transparent rounded-md text-sm transition">
                  {label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-100 p-2 rounded-md shadow-md z-50">
                  <ul className="grid gap-2 sm:grid-cols-2 md:w-[400px]">
                    {menuData[label].map((item) => (
                      <ListItem key={item.title} to={item.href} title={item.title}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* 🔹 Right Links */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/about"
            className="text-white hover:border-2 px-3 py-1 rounded-md text-sm transition flex items-center gap-1"
          >
            <Info className="h-4 w-4" />
            About
          </Link>
          <Link
            to="/support"
            className="text-white hover:border-2 px-3 py-1 rounded-md text-sm transition flex items-center gap-1"
          >
            <Headphones className="h-4 w-4" />
            Support
          </Link>
          <Link
            to="/setting"
            className="text-white hover:border-2 px-3 py-1 rounded-md text-sm transition flex items-center gap-1"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>

   </header>

  );
};

// 🔹 Reusable ListItem
interface ListItemProps {
  title: string;
  to: string;
  children: React.ReactNode;
}

function ListItem({ title, children, to }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink
          to={to}
          className="block rounded-md p-2 text-sm leading-tight transition hover:bg-blue-100"
        >
          <div className="font-medium">{title}</div>
          <p className="text-xs text-gray-600">{children}</p>
        </NavLink>
      </NavigationMenuLink>
    </li>
  );
}

