import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";

/*Importando lista de participantes*/
import users from '../../services/users.json'

import { Redirect, withRouter } from 'react-router-dom'

const FormLogin = () => {

  /*Verifica se o acesso foi aprovado*/
  const [ acessAproved, setAproved ] = useState(false)

  /*JSON dos usuários*/
  const [ user, setUser ] = useState(users)

  //Coloquei onFinish pois no site do Antd está dizendo p/ usar onFinish ao invés de onSubmit
  // link de referência: https://ant.design/components/form/v3



  const onFinish = () => {

    /*Verificando campos*/

    if(!values.email || !values.password) {
        message.warning('Por favor, preencha todos os campos') 
    
    } else {      

      /*Verificando se já existe um usuário cadastrado*/
      let listEmails = []

      user.map(itemJson => {
        listEmails.push(itemJson.email)
      })

      /*Se o e-mail digitado pelo usuário pelo usuário ainda não está no JSON de usuários*/
      if(!listEmails.includes(values.email)) {
        message.warning('Sua conta ainda não existe, crie uma com o nosso formulário ou Google')

      } else {

        /*Verificando existencia da conta*/
        user.map(itemJson => {

          let emailExistent = (itemJson.email === values.email)
          let passwordExistent = (itemJson.password === values.password)

          if( emailExistent && passwordExistent) {
            setAproved(true)
            message.loading('Acesso aprovado! Voce será redirecionado para a lista de eventos')

            /*Atualizando o token do usuário para true, registrando que ee está logado na plataforma*/
            setUser(
              user.map(item => {

                /*Buscando usuário ativo*/
                if(item.email === itemJson.email){
                  item['token'] = true

                  return item
                } else {

                  return item
                }
              })
            )
            
          }
        })


        /*Se o acesso não for aprovado*/
        if(!acessAproved) {
          message.error('E-mail ou senha estão incorretos, tente novamente!')
        }

      }

      
    }


    console.log('Received values of form: ', values);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email inválido").required("Campo obrigatório"),
      password: Yup.string().min(4).required("Campo obrigatório")
    })
   
  });

  const { handleSubmit, values } = formik

  //O article está sendo utilizado do tachyons para colocar na formatação dos campos e a centralização na tela e a sombra
  return (
    <div className="article" style={{ 'width': "40%", 'marginRight':'auto', 'marginLeft': 'auto'}}>
      <Form className="login-form" onSubmit={handleSubmit}>

        <Form.Item>
          <Input
            name="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{color: "#f00"}}>{formik.errors.email}</div>
          ) : null}
        </Form.Item>

        <Form.Item>
          <Input
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
            {...formik.getFieldProps("password")}
          />
            {formik.touched.password && formik.errors.password ? (
              <div style={{color: "#f00"}}>{formik.errors.password}</div>
            ) : null}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            style={{
              background: "#C6255A",
              "borderColor": "#C6255A",
              "marginRight": "15%",
              "width": "100%"
            }}
            onClick={onFinish}
            htmlType="submit"
            className="login-form-button"
          >
            Entrar
          </Button>
          
        </Form.Item>
      </Form>


      { acessAproved && <Redirect to="/profile"></Redirect>}
    </div>
  );
};

export default FormLogin;
