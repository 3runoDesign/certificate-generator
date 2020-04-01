import React from 'react';
import ReactDOM from 'react-dom';

/*Componentes*/
import FormRegister from '../../components/form-register/index';
import GoogleAccount from '../../components/login-register-google/index';
import Footer from '../../components/footer/index';

/*Estilos*/
import './styles.css';
import '../../style/App.css';


function SignUp(props) {

	return (
		<>

		{/* Login com o Google: */}
		<GoogleAccount />
		{/* Login formal: */}
		<FormRegister />
		{/* Rodapé: */}
		<Footer />
		</>
	);
}

export default SignUp;