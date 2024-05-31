import { ClipboardList, PieChartIcon, Settings, UsersRound } from "lucide-react"
import { useTranslation } from "react-i18next";
import { cn } from "~/lib/utils";
import { NavLink } from "@remix-run/react";
import { useDirection } from "~/utils/useDirection";
import { Button, buttonVariants } from "./ui/button";
import { useMemo, useState } from "react";

interface ISubLinks {
    to: string;
    title: string;
    id: number;
}

interface INavigation {
    id: number;
    title: string;
    icon: React.ElementType; 
    to: string;
}

export const NavigationMenu = () => {
  const { t } = useTranslation();
  const isRTL = useDirection();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const navigationArr = useMemo<INavigation[]>(
    () => [
      {
        id: 1,
        title: t("sidebar.navigation.dashboards"),
        icon: PieChartIcon,
        to: "/dashboards"
      },
      {
        id: 2,
        title: t("sidebar.navigation.users"),
        icon: UsersRound,
        to: "/users"
      },
      {
        id: 3,
        title: t("sidebar.navigation.settings"),
        icon: Settings,
        to: "/reports"
      }
    ],
    [t]
  );

  const subLinksArr = useMemo<ISubLinks[]>(
    () => [
      {
        to: "/performance-report",
        title: t("sidebar.navigation.reports.subLinks.agentPerformanceReport"),
        id: 1
      },
      {
        to: "/queue-performance",
        title: t("sidebar.navigation.reports.subLinks.queuePerformanceReport"),
        id: 2
      },
      {
        to: "/agent-call",
        title: t("sidebar.navigation.reports.subLinks.agentCallReport"),
        id: 3
      },
      {
        to: "/abandoned-calls",
        title: t("sidebar.navigation.reports.subLinks.abandonedCallsReport"),
        id: 4
      }
    ],
    [t]
  );

  return (
    <div className="space-y-[6px]" >
      {navigationArr.map((item: INavigation) => (
        <div key={item.id}>
           <NavLink
              to={item.to}
              key={item.id}
              className={({ isActive }) =>
                cn(buttonVariants({variant: "ghost"}),
                  "w-full justify-start gap-2",
                  isActive ? "font-semibold text-gray-900" : "text-gray-600"
                )
              }
            >
              <item.icon />
              {item.title}
          </NavLink>
        </div>
      ))}
      <Button variant="ghost" className={cn("justify-start w-full text-gray-600 gap-2", isOpen && "text-gray-900 font-semibold")} onClick={toggleOpen} >
        <ClipboardList />
        {t("sidebar.navigation.reports.title")}
      </Button>
      <div className={cn("text-gray-500 font-semibold pt-4 grid transition-all duration-200 ease-in-out",
          isOpen ? "animate-slide-in-down grid-rows-[1fr] opacity-100"  : "animate-slide-in-up grid-rows-[0fr] opacity-0",
          isRTL ? "pr-6" : "pl-6"
      )} >
        {
          subLinksArr.map((link: ISubLinks) => (
              <NavLink
                key={link.id}
                to={link.to}
                className={({ isActive }) =>
                  cn("flex w-full font-semibold text-xs pb-3 pt-3",
                      !isRTL
                        ? isActive 
                          ? "border-l-2 border-blue-600 text-blue-600"
                          :  "border-l border-gray-400"
                        : isActive
                          ? "border-r-2 border-blue-600 text-blue-600"
                          : "border-r border-gray-400",
                       isRTL ? "pr-[23px]" : "pl-[23px]"     
                    )
                  }   
                >
                  {link.title}
                </NavLink>
          ))}
      </div>
    </div>
  )
}