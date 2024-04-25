import * as React from "react";
import { cn } from "~/lib/utils";
import { useDirection } from "~/utils/useDirection";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@remix-run/react";


const LanguageSwitcher = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  (props, ref) => {
    const isRTL = useDirection();
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();

    const [checked, setChecked] = React.useState(isRTL);

    const handleLanguageChange = () => {
      const newLanguage = i18n.language === "en" ? "he" : "en";
      setChecked(!checked);
      navigate(`?lng=${newLanguage}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === " " || event.key === "Enter") {
        handleLanguageChange();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex h-[24px] w-[56px] shrink-0 bg-gray-100 border border-gray-300 cursor-pointer items-center rounded-full shadow-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        dir="ltr"
        onClick={handleLanguageChange}
        onKeyDown={handleKeyDown}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        {...props}
      >
        <div
          className={cn(
            "pointer-events-none flex items-center justify-center text-xs h-5 w-[26px] rounded-full bg-blue-600 text-white shadow-lg ring-0 transition-transform",
            checked ? "translate-x-[27px]" : "translate-x-0.5"
          )}
        >
          {checked ? t("sidebar.language.he") : t("sidebar.language.en")}
        </div>
        <span className={cn("text-xs absolute text-gray-800", checked ? "left-[6px]" : "right-[6px]")} >{checked ? "EN" : "HE"}</span>
      </div>
    );
  }
);

LanguageSwitcher.displayName = "LanguageSwitcher";
export { LanguageSwitcher };