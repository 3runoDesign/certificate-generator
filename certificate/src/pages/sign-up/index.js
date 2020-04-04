import React from 'react';
import GoogleLogin from 'react-google-login';
import Footer from '../../components/footer/index';
import FormRegister from '../../components/form-register/index';
import './styles.css';
import '../../style/App.css';


function SignUp(props) {
	const responseGoogle = (response) => {
		console.log(response);
	}

	return (
		<>
		{/* Login com o Google: */}
		<GoogleLogin
		// O clientId foi obitdo através do Google API Console. Existe um passo a passo a ser feito e obter o número.
			clientId="78039332386-46h93ebkr1bb708hqv47h410pdd89mj9.apps.googleusercontent.com"
			render={renderProps => (
				<button onClick={renderProps.onClick} disabled={renderProps.disabled} className="loginBtn loginBtn-google"> 
					Cadastrar com o Google </button>
			)}
			buttonText="Cadastrar com o Google"
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			/>
		
		<p className="ou">OU</p>
		
		{/* Formulário: */}
		<FormRegister />
		{/* Rodapé: */}
		<Footer />
		</>
	);
}

export default SignUp;