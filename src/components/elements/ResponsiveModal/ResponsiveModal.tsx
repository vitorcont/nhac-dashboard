import { useTranslation } from "react-i18next";

import { ModalWrapper, ModalWrapperProps } from "../ModalWrapper/ModalWrapper";

interface ResponsiveModalProps extends ModalWrapperProps {
  title?: string;
  description?: string;
}

export const ResponsiveModal = ({
  title = "Nhac!",
  description,
  ...rest
}: ResponsiveModalProps) => {
  const { t } = useTranslation();
  return (
    <ModalWrapper {...rest}>
      <section className="responsive-modal">
        <div className="responsive-modal__logo">
          <h1 className="text-white bold text-5xl">{title}</h1>
          <p className="responsive-modal__logo__description">
            {description ?? t("UTILS.MODAL.DESCRIPTION")}
          </p>
        </div>
        <div className="responsive-modal__form">{rest.children}</div>
      </section>
    </ModalWrapper>
  );
};
