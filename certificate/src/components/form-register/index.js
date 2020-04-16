import React, { useState } from 'react'
import { useFormik, FormikProvider, Field, Form, ErrorMessage } from 'formik';
import { message, Button } from 'antd';
import GoogleLogin from 'react-google-login';
import * as Yup from 'yup';
import './styles.css';
import './style-google.css'

/*Importando lista de participantes*/
import users from '../../services/users.json'

import ListEvents from '../../components/list-events/index'

const FormRegister = (props) => {

	/*Verifica se o acesso foi aprovado*/
  	const [ acessAproved, setAproved ] = useState(false)

  	/*Organizador do evento*/
  	const [ organizador, setOrganizador ] = useState('')

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			remember: true,
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('Digite seu nome'),
			email: Yup.string().email('E-mail inválido').required('Digite seu e-mail'),
			password: Yup.string().min(4).required('Digite uma senha')
		})
	})

	const { handleSubmit, values } = formik

	/*JSON dos usuários*/
	const [ user, setUser ] = useState(users)

	const addNewUser = (name, email, password, avatar) => {

		setUser([
			...user, {
			name: name,
			email: email,
			password: password, 
			token: true,
			avatar: avatar
		}
		])

		setAproved(true)
		setOrganizador(name)
		message.success('Conta criada com sucesso')
	}

	/*Função acionada após criar a conta com o formulário*/
	const actionButton = () => {
			
		if(!values.name || !values.email || !values.password) {
			message.warning('Por favor, preencha todos os campos') 

		} else {

			/*Verificando se já existe um usuário cadastrado*/
			let listEmails = []

			user.map(itemJson => {
				listEmails.push(itemJson.email)
			})

			/*Se o e-mail digitado pelo usuário pelo usuário ainda não está no JSON de usuários*/
			if(!listEmails.includes(values.email)) {
				addNewUser(values.name, values.email, values.password, " ")

			} else {
				message.warning('Esta conta já existe')
			}
		}
	}

	/*Função acionada após o login com o Google*/
	const responseGoogle = response => {

		/*Verificando se já existe um usuário cadastrado*/
		let listEmails = []

		user.map(itemJson => {
			listEmails.push(itemJson.email)
		})

		/*Se o e-mail digitado pelo usuário pelo usuário ainda não está no JSON de usuários*/
		if(!listEmails.includes(response.profileObj.email)) {
			addNewUser(response.profileObj.name, response.profileObj.email, true, response.profileObj.imageUrl)

		} else {
			message.warning('Esta conta já existe')
		}
	}

	return (
		<>
			<div className="form" style={{ display: acessAproved ?  'none' : 'block' }}>	
				<div className="button-google" >
					<GoogleLogin 
						clientId="78039332386-46h93ebkr1bb708hqv47h410pdd89mj9.apps.googleusercontent.com"
						render={renderProps => (
						<button 	
							onClick={renderProps.onClick} disabled={renderProps.disabled} className="loginBtn loginBtn-google"> 
							Cadastrar com o Google </button>
						)}
						buttonText="Cadastrar com o Google"
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
					/>
				</div>

				<p className="ou">OU</p>

				<FormikProvider value={formik}>
					<Form onSubmit={handleSubmit}>
						<label htmlFor="name" className="form-label">Nome</label>
						<Field name="name" type="text" className="form-field"/>
						<ErrorMessage 
							render={msg => <p className="msg-error" >{msg}</p>}
							name="name" />
						
						<label htmlFor="email" className="form-label">E-mail</label>
						<Field name="email" type="text" className="form-field"/>
						<ErrorMessage 
							render={msg => <p className="msg-error" >{msg}</p>} 
							name="email" />
						
						<label htmlFor="password" className="form-label">Senha</label>
						<Field name="password" type="password" className="form-field"/>
						<ErrorMessage 
							render={msg => <p className="msg-error" >{msg}</p>} 
							name="password" />

						<Button type="submit" onClick={actionButton} className="button">Criar conta</Button>
					</Form>
				</FormikProvider>
			</div>
			{/*Renderizando a pagina de lista de eventos*/}
      		{ acessAproved && <ListEvents users={user} organizador={organizador}/>}
		</>
	);
}

export default FormRegister;