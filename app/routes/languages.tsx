import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { FramerSidebar } from "~/components/FramerSidebar";
import { useDirection } from "~/utils/useDirection";

export const meta: MetaFunction = () => {
  return [
    { title: "Languages | i18N | Framer" },
    { name: "description", content: "i18n Page" },
  ];
};

export default function Languages() {
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
        <FramerSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}