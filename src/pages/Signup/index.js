import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import UserForm from '../../components/UserForm';

export default function Signup() {
	const navigate = useNavigate();
	const { SignupHandler } = useAuth();

	async function handleSignup(fields) {
		const { name, email, password, passwordConfirmation } = fields;
		if (password !== passwordConfirmation) {
			toast.warning('As senhas não conferem!');
		} else {
			const error = await SignupHandler({
				name,
				email,
				password,
				passwordConfirmation,
			})
			
			if(!error) {
				toast.success('Usuário criado com sucesso!');
				navigate('/todo');
			}

		};
	}

	return (
		<UserForm
			properties={{
				title: 'CADASTRE-SE',
				fields: [
					{
						name: 'Nome',
						required: true,
						id: 'name',
						label: 'Nome',
						autoComplete: 'name',
						autoFocus: true,
						type: 'input',
						inputType: 'TextField',
					},
					{
						name: 'Email',
						required: true,
						id: 'email',
						label: 'Email',
						autoComplete: 'email',
						autoFocus: false,
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
						name: 'PasswordConfirmation',
						required: true,
						id: 'passwordConfirmation',
						label: 'Confirmação de senha',
						autoComplete: 'current-password-confirmation',
						autoFocus: false,
						type: 'password',
						inputType: 'TextField',
					},
					{
						type: 'submit',
						inputType: 'Button',
						label: 'Cadastrar',
					},
				],
				link: {
					route: '/todo',
					text: 'Já tem uma conta? Entre.',
				},
				handle: handleSignup,
			}}
		/>
	);
}
