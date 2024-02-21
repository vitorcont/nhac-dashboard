import { ModalWrapper, ModalWrapperProps } from "../ModalWrapper/ModalWrapper";

interface ResponsiveModalProps extends ModalWrapperProps {
  title?: string;
  description?: string;
}

export const ResponsiveModal = ({
  title = "Nhac!",
  description = "Explore as experiências gastronomicas próximas de você",
  ...rest
}: ResponsiveModalProps) => (
  <ModalWrapper {...rest}>
    <section className="responsive-modal">
      <div className="responsive-modal__logo">
        <h1 className="text-white bold text-5xl">{title}</h1>
        <p className="responsive-modal__logo__description">{description}</p>
      </div>
      <div className="responsive-modal__form">{rest.children}</div>
    </section>
  </ModalWrapper>
);
