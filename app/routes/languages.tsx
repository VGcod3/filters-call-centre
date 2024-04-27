import type { MetaFunction } from "@remix-run/node";
import { useReducer } from "react";
import { PureSidebar, sidebarReducer } from "~/components/PureSidebar";
import { useDirection } from "~/utils/useDirection";

export const meta: MetaFunction = () => {
  return [
    { title: "Languages | i18N | Sidebar" },
    { name: "description", content: "i18n Page" },
  ];
};

export default function Languages() {
  const [state, dispatch] = useReducer(sidebarReducer, {
    isOpen: false,
    isTransition: false,
    isFull: false,
    isHovered: false,
  });

  const isRTL = useDirection();

  return (
    <div onMouseMove={(event) => {
      const x = event.clientX;
      const windowWidth = window.innerWidth;
      const edgeThreshold = 10;

      if(!isRTL && x <= edgeThreshold){
        dispatch({type: "OPEN_SIDEBAR"});
      }

      if(isRTL && x >= windowWidth - edgeThreshold){
        dispatch({type: "OPEN_SIDEBAR"});
      }

    }} className="bg-gray-200 flex flex-col gap-5 h-screen w-full justify-start items-start p-5">
        <PureSidebar state={state} dispatch={dispatch} />
    </div>
  );
}