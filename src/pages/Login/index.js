import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import UserForm from '../../components/UserForm';

export default function Login() {
	const navigate = useNavigate();
	const { LoginHandler } = useAuth();

	async function handleLogin(fields) {
		const { email, password } = fields;
		const error = await LoginHandler({ email, password })
		if(!error) navigate('/todo');
	}

	return (
		<UserForm
			properties={{
				title: 'LOGIN',
				fields: [
					{
						name: 'Email',
						required: true,
						id: 'email',
						label: 'Email',
						autoComplete: 'email',
						autoFocus: true,
						type: 'input',
						inputType: 'TextField',
					},
					{
						name: 'Password',
						required: true,
						id: 'password',
						label: 'Senha',
						autoComplete: 'current-password',
						autoFocus: false,
						type: 'password',
						inputType: 'TextField',
					},
					{
						type: 'submit',
						inputType: 'Button',
						label: 'Entrar',
					},
				],
				link: {
					route: '/signup',
					text: 'Não tem uma conta? Cadastre-se.',
				},
				handle: handleLogin,
			}}
		/>
	);
}
