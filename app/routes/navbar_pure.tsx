import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import Sidebar from "~/components/NavBar/PureSidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "Navbar" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function NavbarPure() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div onMouseMove={(event) => {
        const x = event.clientX;
        const edgeThreshold = 10;
        x < edgeThreshold && setIsOpen(true); 
    }} className="bg-gray-200 flex flex-col gap-5 h-screen w-full justify-start items-start p-5">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
