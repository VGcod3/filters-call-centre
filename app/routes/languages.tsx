import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Languages | i18N" },
    { name: "description", content: "i18n Page" },
  ];
};

export default function Languages() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <div className="bg-gray-200 flex">
      <div className="w-[100px] h-[100vh] bg-red-500">
        <p>{t("text")}</p>
        <p>{t("description")}</p>
      </div>
      <div className="flex items-center justify-center w-full">
      <Button asChild className="bg-red-500">
          <Link to={`?lng=${i18n.language === "en" ? "he" : "en"}`}>
            Switch
          </Link>
        </Button>
      </div>
    </div>
  );
}