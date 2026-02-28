import React from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import { useForm } from "react-hook-form";
import { Button } from "../../atoms/StyledButton/StyledButton";
import { Header } from "../../atoms/HeaderText/HeaderText";

const SectionContainer = styled.section`
  width: 100%;
  height: 100%;
  margin: 80px auto 0;
  position: absolute;
`;

const FormWrapper = styled.div`
  background-color: #3f3f3f14;
  border-radius: 20px;
  box-sizing: border-box;
  /* height: 100vh; */
  padding: 0 20px;
  width: 100%;
  margin: 40px auto;

  @media (min-width: 360px) {
    width: 320px;
  }

  @media (min-width: 768px) {
    width: 480px;
  }

  @media (min-width: 1200px) {
    /* height: 30vh; */
    /* background-color: teal; */
  }

  form {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    @media (min-width: 1200px) {
      /* height: 70vh; */
      /* background-color: teal; */
    }
  }
`;

const Input = styled.input`
  background-color: #ffffff15;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;

  &::placeholder {
    color: #ffffff15;
    font-family: sans-serif;
    left: 20px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: transform 200ms, color 200ms;
    top: 20px;
  }

  &:focus ~ label {
    transform: translateY(-30px) translateX(10px) scale(0.75);
    color: #b700ff;
  }

  &:not(:placeholder-shown) ~ label {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  &:focus ~ div {
    transform: translateY(8px);
  }
  &:not(:placeholder-shown) ~ div {
    transform: translateY(8px);
  }

  /* &:placeholder {
      color: #65657b;
      font-family: sans-serif;
      left: 20px;
      line-height: 14px;
      pointer-events: none;
      position: absolute;
      transform-origin: 0 50%;
      transition: transform 200ms, color 200ms;
      top: 20px;
    } */
`;
const InputContainer = styled.div`
  height: 50px;
  position: relative;
  width: 100%;
  margin: 15px 0;

  label {
    color: #65657b;
    font-family: sans-serif;
    left: 20px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: transform 200ms, color 200ms;
    top: 20px;
  }

  textarea {
    background-color: #ffffff15;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    font-size: 18px;
    height: 90px;
    min-width: 100%;
    outline: 0;
    padding: 20px;
    max-width: 100%;
    overflow-y: hidden;

    &::placeholder {
      color: #ffffff15;
      font-family: sans-serif;
      left: 20px;
      line-height: 14px;
      pointer-events: none;
      position: absolute;
      transform-origin: 0 50%;
      transition: transform 200ms, color 200ms;
      top: 20px;
    }

    &:focus ~ label {
      transform: translateY(-30px) translateX(10px) scale(0.75);
      color: #b700ff;
    }

    &:focus ~ div {
      transform: translateY(8px);
    }
  }
`;

const Placeholder = styled.label`
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 120px;
  margin: 30px auto 0;
  display: flex;
  justify-items: center;
  align-items: center;
`;

const Cut = styled.div`
  /* background-color: #050505; */
  background-color: #010102;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 105px;
`;

const ErrorContainer = styled.div`
  margin: 20px 0;
`;

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const sendEmail = (formData) => {
    console.log(formData);
    emailjs
      .send(
        "service_pujr1m5",
        "template_dql7x43",
        formData,
        "MzaeL-pV-eLoX1irr"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    reset();
  };
  return (
    <SectionContainer>
      <Header>KONTAKT</Header>
      <FormWrapper>
        <form className="contact-form" onSubmit={handleSubmit(sendEmail)}>
          <InputContainer>
            {/* <Cut /> */}
            <Input name="name" {...register("name")} placeholder=" " />
            <Cut />
            <label for="name">Imię</label>
          </InputContainer>
          <InputContainer>
            {/* <Cut /> */}
            <Input
              type="email"
              name="email"
              {...register("email")}
              placeholder=" "
            />
            <Cut />
            <label for="email">Email</label>
          </InputContainer>
          <InputContainer>
            <textarea
              id="message"
              rows="3"
              placeholder=" "
              name="message"
              {...register("message", { required: true })}
            ></textarea>
            <Cut />
            <label for="message">Wiadomość</label>
          </InputContainer>
          <div>
            <ButtonContainer>
              <Button type="submit" value="SEND MESSAGE">
                Wyślij
              </Button>
            </ButtonContainer>
          </div>
          {errors.message && (
            <ErrorContainer style={{ color: "red" }}>
              Uzupełnij wszystkie pola
            </ErrorContainer>
          )}
        </form>
      </FormWrapper>
    </SectionContainer>
  );
};

export default Contact;
