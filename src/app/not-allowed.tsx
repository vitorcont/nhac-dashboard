import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button } from "@portal/components";

const NotAllowedPage = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full flex items-center flex-col">
      <div className="info-container bottom-pd">
        <h1 className="mb-16 text-xl text-center bold primary">{t("PAGES.NOT_FOUND.TITLE")}</h1>
        <img src="/ic_not-allowed.svg" className="mb-16" alt="logo" />
        <Link href="/">
          <Button label={t("PAGES.NOT_FOUND.BUTTON")} color="primary" />
        </Link>
      </div>
    </section>
  );
};

export default NotAllowedPage;
