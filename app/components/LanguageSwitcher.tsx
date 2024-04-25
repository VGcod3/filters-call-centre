import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "~/lib/utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@remix-run/react";
import { useDirection } from "~/utils/useDirection";

const LanguageSwitcher = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
  // eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const isRTL = useDirection();

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer relative inline-flex h-[24px] w-[56px] shrink-0 bg-gray-100 border border-gray-300 cursor-pointer items-center rounded-full shadow-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      {...props}
      checked={isRTL}
      onCheckedChange={() => {
        const newLanguage = i18n.language === "en" ? "he" : "en";
        navigate(`?lng=${newLanguage}`);
      }}
      ref={ref}
      dir="ltr"
    >
      <SwitchPrimitives.Thumb asChild>
        <div
          className={cn(
            "pointer-events-none flex items-center justify-center text-xs h-5 w-[26px] rounded-full bg-blue-600 text-white shadow-lg ring-0 transition-transform",
            isRTL ? "translate-x-[27px]" : "translate-x-0.5"
          )}
        >
          {isRTL ? t("sidebar.language.he") : t("sidebar.language.en")}
        </div>
      </SwitchPrimitives.Thumb>
      <span className={cn("text-xs absolute text-gray-800", isRTL ? "left-[6px]" : "right-[6px]")} >{isRTL ? "EN" : "HE"}</span>
    </SwitchPrimitives.Root>
  );
});
LanguageSwitcher.displayName = SwitchPrimitives.Root.displayName;

export { LanguageSwitcher };