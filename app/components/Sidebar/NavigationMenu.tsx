import { ClipboardList, PieChartIcon, Settings, UsersRound } from "lucide-react"
import { useTranslation } from "react-i18next";
import { cn } from "~/lib/utils";
import { NavLink } from "@remix-run/react";
import { useDirection } from "~/utils/useDirection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface SubLinksProps {
    to: string;
    title: string;
    id: number;
}

interface NavigationProps {
    id: number;
    title: string;
    icon: React.ElementType; 
    to: string;
    subLinks?: SubLinksProps[];
}

export const NavigationMenu = () => {
  const { t } = useTranslation();
  const isRTL = useDirection();
  const NavigationArr: NavigationProps[] = [
    { id: 1, title: t('sidebar.navigation.dashboards'), icon: PieChartIcon, to: '/dashboards' },
    { id: 2, title: t('sidebar.navigation.users'), icon: UsersRound, to: '/users' },
    { id: 3, title: t('sidebar.navigation.settings'), icon: Settings, to: '/reports' },
    {
      id: 4, title: t('sidebar.navigation.reports.title'), icon: ClipboardList, to: '/', subLinks: [
        { to: '/performance-report', title: t("sidebar.navigation.reports.subLinks.agentPerformanceReport"), id: 1 },
        { to: '/queue-performance', title: t("sidebar.navigation.reports.subLinks.queuePerformanceReport"), id: 2 },
        { to: '/agent-call', title: t("sidebar.navigation.reports.subLinks.agentCallReport"), id: 3 },
        { to: '/abandoned-calls', title: t("sidebar.navigation.reports.subLinks.abandonedCallsReport"), id: 4 },
      ]
    }
  ]

  return (
    <div>
      {NavigationArr.map((item) => (
        <div key={item.id}>
          {item.subLinks ? (
            <Accordion type="single" collapsible>
              <AccordionItem value={item.title}>
                <AccordionTrigger className="py-0 hover:no-underline text-md [&[data-state=open]>div]:font-semibold [&[data-state=open]>div]:text-gray-900">
                  <div className="flex text-gray-600 pb-2 font-normal">
                    <item.icon />
                    <p className={cn(isRTL ? "mr-2" : 'ml-2')}>{item.title}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-3 text-gray-500 font-semibold">
                  {item.subLinks?.map(subItem => (
                    <NavLink
                      key={subItem.id}
                      to={subItem.to}
                      className={({ isActive }) =>
                        cn("flex w-full pb-2 pt-2 pl-4 font-semibold",
                          isActive ? "border-l-2 border-blue-600 text-blue-600" : "border-l border-gray-400"
                        )
                      }
                    >
                      {subItem.title}
                    </NavLink>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <NavLink
              to={item.to}
              key={item.id}
              className={({ isActive }) =>
                cn("flex items-center text-gray-600 mb-[20px]",
                  isActive && "font-semibold text-gray-900"
                )
              }
            >
              <item.icon />
              <p className={cn(isRTL ? "mr-2" : 'ml-2')}>{item.title}</p>
            </NavLink>
          )}
        </div>
      ))}
    </div>
  )
}