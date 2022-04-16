import { Formik } from "formik";
import { View, Text } from "react-native";
import * as Yup from "yup";
import qs from 'qs';

import { Box, LoginView, CadastrarView, ErrorText, FormInput, Title, SubmitBtn, TxtBtn, CadastrarBtn } from "./styles";
import api from "../../services/api";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login({ logado }) {
  const [cadastroForm, setCadastroForm] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);

  console.log('logado',logado)
  
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    password: Yup.string()
      .min(
        8,
        "Senha deve possuir pelo menos 8 caracteres uma letra maiúscula e um caracter especial"
      )
      .matches(/^(?=.*?[A-Z])(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, {
        message: "Senha inválida",
        excludeEmptyString: true,
      })
      .required("Senha é obrigatório"),
  });
  const CadastroSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Nome Completo")
      .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Nome inválido")
      .required("Nome é obrigatório"),
    phone: Yup.string()
      .min(11, "Numero inválido")
      .max(11, "Numero inválido")
      .matches(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
        "Numero inválido"
      )
      .required("Celular é obrigatório"),
    email: Yup.string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    password: Yup.string()
      .min(8, "Senha deve possuir pelo menos 8 caracteres")
      .matches(/^(?=.*?[A-Z])(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, {
        message:
          "Senha deve uma letra maiúscula, um número e um caracter especial",
        excludeEmptyString: true,
      })
      .required("Senha é obrigatório"),
  });

  const handleLogin = (values) => {
    console.log("valores", values);

    api.post("/login",
    qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then((response) => {
      console.log("response >", response);
      AsyncStorage.setItem('login', JSON.stringify(response))
      logado()
    })
    .catch((error) => {
      console.log("error", error);
      setModalError(true);
      setTimeout(() => {
        setModalError(false);
      }, 5000);
    });
  }

    const handleCadastro = (values) => {
      console.log("valores", values);
  
      api
        .put("/signup", qs.stringify(values), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          console.log("response >", response.status);
          
          setModalSuccess(true);
          setTimeout(() => {
            setModalSuccess(false);
            setCadastroForm(false)
          }, 5000);
        })
        .catch((error) => {
          console.log("error", error);
          setModalError(true);
          setTimeout(() => {
            setModalError(false);
          }, 5000);
        });
    };
 
  
  return (
    <>
    {!cadastroForm ? 
    <LoginView>
      <Box>
          <Title>Login</Title>

          {modalSuccess && (
          <Text>Sucesso entrando!</Text>
        )}
        {modalError && (
          <Text>ops, algo deu errado</Text>
        )}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => handleLogin(values)}
          validationSchema={LoginSchema}
        >
          {({
            values,
            handleChange,
            errors,
            isValid,
            handleSubmit,
            handleBlur,
            dirty,
            touched,
          }) => (
            <View>
              <FormInput
                name="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <ErrorText>{errors.email}</ErrorText>
              )}
              <FormInput
                name="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Senha"
                secureTextEntry
              />
              {errors.password && touched.password && (
                <ErrorText>{errors.password}</ErrorText>
              )}
              <SubmitBtn
                onPress={handleSubmit}
              >
              <TxtBtn>ENTRAR</TxtBtn>
      </SubmitBtn>
            </View>
          )}
        </Formik>
     
      <CadastrarBtn onPress={() => setCadastroForm(true)}>
          <TxtBtn>CADASTRAR</TxtBtn>
      </CadastrarBtn>
      </Box>
    </LoginView> :
    <CadastrarView>
    <Box>
      <Title>Cadastrar</Title>

      {modalSuccess && <Text>Usuário criado com sucesso!</Text>}
      {modalError && <Text>ops, algo deu errado</Text>}

      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => handleCadastro(values)}
        validationSchema={CadastroSchema}
      >
        {({
          values,
          handleChange,
          errors,
          isValid,
          handleSubmit,
          handleBlur,
          dirty,
          touched,
        }) => (
          <View>
            <FormInput
              name="name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="Nome"
            />
            {errors.name && touched.name && (
              <ErrorText>{errors.name}</ErrorText>
            )}
            <FormInput
              name="phone"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
              placeholder="Celular"
            />
            {errors.phone && touched.phone && (
              <ErrorText>{errors.phone}</ErrorText>
            )}
            <FormInput
              name="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email"
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <ErrorText>{errors.email}</ErrorText>
            )}
            <FormInput
              name="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Senha"
              secureTextEntry
            />
            {errors.password && touched.password && (
              <ErrorText>{errors.password}</ErrorText>
            )}
            <SubmitBtn onPress={handleSubmit}>
              <TxtBtn>SALVAR</TxtBtn>
            </SubmitBtn>
            <CadastrarBtn onPress={() => setCadastroForm(false)}>
                <TxtBtn>VOLTAR</TxtBtn>
            </CadastrarBtn>
          </View>
        )}
      </Formik>
    </Box>
  </CadastrarView>
    }
    </>
  );
}
