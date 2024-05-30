import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "~/lib/utils";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams, useNavigation } from "@remix-run/react";
import { useDirection } from "~/utils/useDirection";

const LanguageSwitcher = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
  // eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => {
  const { t } = useTranslation();
  const isRTL = useDirection();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const isSubmitting =
    navigation.state !== "idle" &&
    navigation.location.search.includes("lng=" + (isRTL ? "en" : "he"));

  searchParams.set("lng", isRTL ? "en" : "he");
  const to = "?" + searchParams.toString();

  return (
    <SwitchPrimitives.Root
      {...props}
      className={cn(
        "peer relative inline-flex h-[24px] w-[56px] shrink-0 bg-gray-100 border border-gray-300 cursor-pointer items-center rounded-full shadow-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isSubmitting && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={isSubmitting}
      ref={ref}
      asChild
    >
      <Link to={to}>
        <SwitchPrimitives.Thumb asChild>
          <div
            className={cn(
              "pointer-events-none flex items-center justify-center text-xs h-5 w-[26px] rounded-full bg-blue-600 text-white shadow-lg ring-0 transition-transform",
              isRTL ? "translate-x-[-2px]" : "translate-x-0.5"
            )}
          >
            {isRTL ? t("sidebar.language.he") : t("sidebar.language.en")}
          </div>
        </SwitchPrimitives.Thumb>
        <span
          className={cn(
            "text-xs absolute text-gray-800",
            isRTL ? "left-1.5" : "right-1.5"
          )}
        >
          {isRTL ? "EN" : "HE"}
        </span>
      </Link>
    </SwitchPrimitives.Root>
  );
});
LanguageSwitcher.displayName = "LanguageSwitcher";

export { LanguageSwitcher };