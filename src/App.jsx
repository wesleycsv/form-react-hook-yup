import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./form.module.css";

const schema = yup
  .object({
    nome: yup.string().required("Nome Obrigatório"),
    email: yup.string().required("E-mail Obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha Obrigatória")
      .min(6, "No mínino 6 caracteres"),
    password_confirm: yup
      .string()
      .oneOf([null, yup.ref("password")], "As senhas precisa ser iguais"),
  })
  .required();

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    console.log("Formulario submetido");
  };

  return (
    <>
      <div>
        <h1 className={styles.h1}>Formulário de contato</h1>
        <p className={styles.paragrafo}>Com validação React Hook Form + yup</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContato}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Insira seu nome"
            className={errors.nome ? `${styles.inputError}` : ``}
            {...register("nome")}
          />

          <span className={styles.labelError}>{errors.nome?.message}</span>
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            placeholder="insira seu e-mail"
            className={errors.nome ? `${styles.inputError}` : ``}
            {...register("email")}
          />
          <span className={styles.labelError}>{errors.email?.message}</span>
        </div>
        <div className={styles.formGroup}>
          <input
            type="passowrd"
            placeholder="Insira sua senha"
            className={errors.password ? `${styles.inputError}` : ``}
            {...register("password")}
          />
          <span className={styles.labelError}>{errors.password?.message}</span>
        </div>
        <div className={styles.formGroup}>
          <input
            type="passowrd"
            placeholder="Confirma sua senha"
            className={errors.password_confirm ? `${styles.inputError}` : ``}
            {...register("password_confirm")}
          />
          <span className={styles.labelError}>
            {errors.password_confirm?.message}
          </span>
        </div>
        <button type="submit">Enviar formulário</button>
      </form>
    </>
  );
}

export default App;
