import { ChevronDownIcon, ClipboardList, PieChartIcon, Settings, UsersRound } from "lucide-react"
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "~/lib/utils";
import { Link, NavLink } from "@remix-run/react";
import { useDirection } from "~/utils/useDirection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface NavigationProps {
    id: number;
    title: string;
    icon: any;
    to: string;
}


export const NavigationMenu = () => {
    const {t} = useTranslation();
    const isRTL = useDirection();

    const NavigationArr: NavigationProps[] = [
        {id: 1, title: t('sidebar.navigation.dashboards'), icon: PieChartIcon, to: '/dashboards'},
        {id: 2, title: t('sidebar.navigation.users'), icon: UsersRound, to: '/users'},
        {id: 3, title: t('sidebar.navigation.settings'), icon: Settings, to: '/settings'},
        {id: 4, title: t('sidebar.navigation.reports'), icon: ClipboardList, to: '/reports'}
    ]
    return (
        <div>
            {
                NavigationArr.map((item, index) => {
                    if(NavigationArr.length - 1 !== index){
                        return <NavLink onClick={e => e.preventDefault()} to={item.to} key={item.id} className={({isActive}) => cn("flex items-center text-gray-600 mb-[20px]", isActive && "font-semibold text-gray-900")} >
                        <item.icon />
                        <p className={cn(isRTL ? "mr-2" : 'ml-2')} >{item.title}</p>
                    </NavLink>
                    } else{
                        return <div key={item.id} >
                             <Accordion type="single" collapsible>
                                <AccordionItem value={item.title}>
                                    <AccordionTrigger isNan={false} className="py-0 hover:no-underline">
                                        <Button  className="pl-0 bg-transparent font-normal text-md hover:bg-transparent" variant="ghost">
                                            <item.icon className="text-gray-600 hover:text-gray-600" />
                                            <p className={cn(isRTL ? "mr-2" : 'ml-2')} >{item.title}</p>
                                        </Button>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-7 text-gray-500" >
                                        <div className="w-full mt-5" >
                                            <NavLink to='/' className="w-full">
                                             Agent Performance Report
                                            </NavLink>
                                        </div>
                                        <div className="w-full mt-5" >
                                            <NavLink to='/'>
                                                Queue Performance Report
                                            </NavLink>
                                        </div>
                                        <div className="w-full mt-5" >
                                        <NavLink to='/'>
                                            Agent Call Report
                                        </NavLink>
                                        </div>
                                        <div className="w-full mt-5" >
                                        <NavLink to='/'>
                                            Abandoned Calls Report
                                        </NavLink>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    }
                })
            }
        </div>
    )
}