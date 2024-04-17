import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Languages() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 flex">
      <div className="w-[100px] h-[100vh] bg-red-500">
        <p>{t("text")}</p>
        <p>{t("description")}</p>
      </div>
      <div className="flex items-center justify-center w-full">
        <Button className="bg-red-500" onClick={() => navigate(`?lng=${i18n.language === 'en' ? 'he' : 'en'}`)}>Switch</Button>
      </div>
    </div>
  );
}