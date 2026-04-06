import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useForm } from "react-hook-form";
import { useScrollRevealProps } from "../../atoms/ScrollReveal/ScrollReveal";

const ACCENT = "rgba(183, 0, 255, 0.95)";
const ACCENT_SOFT = "rgba(183, 0, 255, 0.12)";

const SectionContainer = styled(motion.section)`
  width: 100%;
  max-width: min(100%, 72rem);
  margin: 0 auto;
  padding: 3rem max(1.25rem, env(safe-area-inset-left, 0px)) 4.5rem
    max(1.25rem, env(safe-area-inset-right, 0px));
  box-sizing: border-box;
  min-width: 0;
  scroll-margin-top: max(5.5rem, calc(72px + 1rem));

  @media (min-width: 810px) {
    scroll-margin-top: max(5.5rem, calc(80px + 1rem));
    padding-top: 3.5rem;
    padding-bottom: 5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: start;
  min-width: 0;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: 3rem;
  }
`;

const Intro = styled.div`
  text-align: center;
  min-width: 0;

  @media (min-width: 900px) {
    text-align: left;
    position: sticky;
    top: calc(80px + 2rem);
  }
`;

const Kicker = styled.span`
  display: block;
  font-family: var(--font-family-body);
  font-size: var(--font-size-kicker);
  font-weight: 600;
  letter-spacing: var(--font-letter-kicker);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 0.75rem;
`;

const Title = styled.h2`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-size: var(--font-size-heading-section);
  line-height: var(--line-heading-section);
  font-weight: var(--weight-heading-section);
  letter-spacing: 0.02em;
  color: #fff;
  margin: 0 0 1rem;
  text-wrap: balance;
`;

const Lead = styled.p`
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
  line-height: var(--line-body);
  color: rgba(255, 255, 255, 0.68);
  margin: 0 0 1.75rem;
  max-width: 32ch;
  margin-inline: auto;

  @media (min-width: 900px) {
    margin-inline: 0;
  }
`;

const MetaLine = styled.p`
  font-family: var(--font-family-nav);
  font-size: clamp(0.78rem, 1.8vw, 0.88rem);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;

  a {
    color: rgba(255, 255, 255, 0.82);
    text-decoration: none;
    border-bottom: 1px solid ${ACCENT_SOFT};
    padding-bottom: 2px;
    transition:
      color 0.2s ease,
      border-color 0.2s ease;

    &:hover,
    &:focus-visible {
      color: ${ACCENT};
      border-color: rgba(183, 0, 255, 0.45);
    }
  }
`;

const FormPanel = styled.div`
  position: relative;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  background:
    radial-gradient(
      ellipse 90% 70% at 100% 0%,
      rgba(183, 0, 255, 0.09) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 60% 50% at 0% 100%,
      rgba(255, 255, 255, 0.04) 0%,
      transparent 50%
    ),
    linear-gradient(
      168deg,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.025) 45%,
      rgba(0, 0, 0, 0.18) 100%
    );
  backdrop-filter: blur(22px) saturate(155%);
  -webkit-backdrop-filter: blur(22px) saturate(155%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 24px 56px rgba(0, 0, 0, 0.32),
    0 0 0 1px rgba(0, 0, 0, 0.2);
  padding: clamp(1.5rem, 4vw, 2.15rem);
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
  overflow-x: clip;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 1.25rem;
    right: 1.25rem;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(183, 0, 255, 0.65) 40%,
      rgba(255, 255, 255, 0.35) 100%
    );
    opacity: 0.9;
    pointer-events: none;
  }
`;

const FormPanelHeader = styled.div`
  margin-bottom: 1.35rem;
  padding-top: 0.35rem;
`;

const FormPanelKicker = styled.span`
  display: block;
  font-family: var(--font-family-nav);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(183, 0, 255, 0.75);
  margin-bottom: 0.4rem;
`;

const FormPanelTitle = styled.h3`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-size: clamp(1.05rem, 2.8vw, 1.25rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #fff;
  margin: 0 0 0.35rem;
  line-height: 1.2;
`;

const FormPanelSubtitle = styled.p`
  font-family: var(--font-family-body);
  font-size: 0.8125rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.48);
  margin: 0;
  max-width: 36ch;
`;

const FieldsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FieldRoot = styled.div`
  position: relative;
  margin-bottom: 1.05rem;
  max-width: 100%;

  &:last-of-type {
    margin-bottom: 0.35rem;
  }

  &:focus-within > label,
  &:has(input:not(:placeholder-shown)) > label {
    top: 0.5rem;
    transform: none;
    font-size: 0.625rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(183, 0, 255, 0.9);
  }
`;

const FieldInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  min-height: 58px;
  padding: 1.4rem 1.1rem 0.6rem;
  border-radius: 16px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.32);
  color: #fff;
  font-family: var(--font-family-body);
  font-size: 1rem;
  outline: none;
  transition:
    border-color 0.22s ease,
    background 0.22s ease,
    box-shadow 0.22s ease;

  &::placeholder {
    color: transparent;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.16);
    background: rgba(0, 0, 0, 0.36);
  }

  &:focus {
    border-color: rgba(183, 0, 255, 0.55);
    background: rgba(0, 0, 0, 0.42);
    box-shadow:
      0 0 0 4px ${ACCENT_SOFT},
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  &:focus-visible {
    outline: none;
  }
`;

const FieldTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: 152px;
  padding: 1.55rem 1.1rem 1rem;
  border-radius: 16px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.32);
  color: #fff;
  font-family: var(--font-family-body);
  font-size: 1rem;
  line-height: 1.55;
  resize: vertical;
  outline: none;
  transition:
    border-color 0.22s ease,
    background 0.22s ease,
    box-shadow 0.22s ease;

  &::placeholder {
    color: transparent;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.16);
    background: rgba(0, 0, 0, 0.36);
  }

  &:focus {
    border-color: rgba(183, 0, 255, 0.55);
    background: rgba(0, 0, 0, 0.42);
    box-shadow:
      0 0 0 4px ${ACCENT_SOFT},
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
`;

const FieldLabel = styled.label`
  position: absolute;
  left: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-family-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.42);
  pointer-events: none;
  transition:
    top 0.2s ease,
    transform 0.2s ease,
    font-size 0.2s ease,
    color 0.2s ease;
  transform-origin: left center;
`;

const TextareaLabel = styled(FieldLabel)`
  top: 1.1rem;
  transform: none;
`;

const TextareaRoot = styled(FieldRoot)`
  margin-top: 0.15rem;

  &:focus-within ${TextareaLabel},
  &:has(textarea:not(:placeholder-shown)) ${TextareaLabel} {
    top: 0.5rem;
    font-size: 0.625rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(183, 0, 255, 0.9);
  }
`;

const FieldDivider = styled.div`
  height: 1px;
  margin: 0.35rem 0 1.1rem;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1) 15%,
    rgba(255, 255, 255, 0.1) 85%,
    transparent
  );
`;

const FieldError = styled.span`
  display: block;
  margin-top: 0.35rem;
  margin-left: 0.25rem;
  font-family: var(--font-family-body);
  font-size: 0.75rem;
  color: rgba(255, 120, 120, 0.95);
`;

const SubmitRow = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
  flex-wrap: wrap;
  min-width: 0;

  @media (min-width: 520px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
  }
`;

const SubmitButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  padding: 0 2.15rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-family: var(--font-family-nav);
  font-size: clamp(0.82rem, 2vw, 0.92rem);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(
    145deg,
    rgba(200, 60, 255, 0.45) 0%,
    rgba(120, 0, 200, 0.38) 48%,
    rgba(60, 0, 100, 0.5) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    0 14px 36px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease,
    filter 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12) 0%,
      transparent 45%
    );
    pointer-events: none;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.05);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.16),
      0 20px 44px rgba(0, 0, 0, 0.42);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${ACCENT};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    filter: none;
  }
`;

const FormHint = styled.p`
  margin: 0;
  font-family: var(--font-family-body);
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.5;
  max-width: min(18rem, 100%);
  flex: 1 1 12rem;
  min-width: 0;
  padding: 0.5rem 0.65rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.2);
`;

const StatusMessage = styled.div`
  margin-top: 1.35rem;
  padding: 0.95rem 1.1rem;
  border-radius: 14px;
  font-family: var(--font-family-body);
  font-size: 0.875rem;
  line-height: 1.45;
  border: 1px solid transparent;

  ${({ $variant }) =>
    $variant === "success"
      ? `
    background: rgba(80, 200, 120, 0.12);
    border-color: rgba(80, 200, 120, 0.25);
    color: rgba(180, 240, 200, 0.95);
  `
      : `
    background: rgba(255, 100, 100, 0.1);
    border-color: rgba(255, 120, 120, 0.25);
    color: rgba(255, 190, 190, 0.95);
  `}
`;

const Contact = ({ sectionId = "kontakt", sectionKey }) => {
  const reveal = useScrollRevealProps({ y: 28, amount: 0.12 });
  const [submitStatus, setSubmitStatus] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (formData) => {
    setSubmitStatus(null);
    try {
      await emailjs.send(
        "service_pujr1m5",
        "template_dql7x43",
        formData,
        "MzaeL-pV-eLoX1irr"
      );
      reset();
      setSubmitStatus("success");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    }
  };

  return (
    <SectionContainer
      id={sectionId}
      data-section-key={sectionKey}
      aria-labelledby="kontakt-heading"
      {...reveal}
    >
      <Grid>
        <Intro>
          <Kicker>Kontakt</Kicker>
          <Title id="kontakt-heading">Napisz do nas</Title>
          <Lead>
            Masz pytanie o termin, usługę albo po prostu chcesz się przywitać?
            Odezwiemy się tak szybko, jak to możliwe.
          </Lead>
          <MetaLine>
            Szybsza rezerwacja:{" "}
            <a
              href="https://booksy.com/pl-pl/138044_sznyt-barbershop_barber-shop_3_warszawa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Booksy
            </a>
          </MetaLine>
        </Intro>

        <FormPanel>
          <FormPanelHeader>
            <FormPanelKicker>Formularz</FormPanelKicker>
            <FormPanelTitle>Wiadomość do salonu</FormPanelTitle>
            <FormPanelSubtitle>
              Odpowiadamy zwykle w ciągu jednego dnia roboczego.
            </FormPanelSubtitle>
          </FormPanelHeader>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldsStack>
            <FieldRoot>
              <FieldInput
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder=" "
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "err-name" : undefined}
                {...register("name", { required: "Podaj imię" })}
              />
              <FieldLabel htmlFor="contact-name">Imię</FieldLabel>
              {errors.name && (
                <FieldError id="err-name" role="alert">
                  {errors.name.message}
                </FieldError>
              )}
            </FieldRoot>

            <FieldRoot>
              <FieldInput
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder=" "
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "err-email" : undefined}
                {...register("email", {
                  required: "Podaj adres e-mail",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Nieprawidłowy adres e-mail",
                  },
                })}
              />
              <FieldLabel htmlFor="contact-email">E-mail</FieldLabel>
              {errors.email && (
                <FieldError id="err-email" role="alert">
                  {errors.email.message}
                </FieldError>
              )}
            </FieldRoot>

            <FieldDivider aria-hidden />

            <TextareaRoot>
              <FieldTextarea
                id="contact-message"
                rows={5}
                placeholder=" "
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "err-msg" : undefined}
                {...register("message", {
                  required: "Wpisz treść wiadomości",
                  minLength: {
                    value: 8,
                    message: "Wiadomość jest za krótka",
                  },
                })}
              />
              <TextareaLabel htmlFor="contact-message">Wiadomość</TextareaLabel>
              {errors.message && (
                <FieldError id="err-msg" role="alert">
                  {errors.message.message}
                </FieldError>
              )}
            </TextareaRoot>
            </FieldsStack>

            <SubmitRow>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Wysyłanie…" : "Wyślij wiadomość"}
              </SubmitButton>
              <FormHint>
                Wysyłając formularz akceptujesz kontakt zwrotny na podany adres
                e-mail.
              </FormHint>
            </SubmitRow>

            {submitStatus === "success" && (
              <StatusMessage $variant="success" role="status">
                Dziękujemy — wiadomość została wysłana. Odezwiemy się wkrótce.
              </StatusMessage>
            )}
            {submitStatus === "error" && (
              <StatusMessage $variant="error" role="alert">
                Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę lub
                napisz bezpośrednio na Instagram.
              </StatusMessage>
            )}
          </Form>
        </FormPanel>
      </Grid>
    </SectionContainer>
  );
};

export default Contact;
