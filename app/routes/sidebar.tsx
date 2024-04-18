import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import PureSidebar from "~/components/PureSidebar";
import useDirection from "~/utils/useDirection";

export const meta: MetaFunction = () => {
  return [
    { title: "Navbar" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function NavbarPure() {
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = useDirection();
  return (
    <div onMouseMove={(event) => {
      const x = event.clientX;
      const windowWidth = window.innerWidth;
      const edgeThreshold = 10;

      !isRTL && x <= edgeThreshold && setIsOpen(true);
      isRTL && x >= windowWidth - edgeThreshold && setIsOpen(true);
      
    }} className="bg-gray-200 flex flex-col gap-5 h-screen w-full justify-start items-start p-5">
        <PureSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}