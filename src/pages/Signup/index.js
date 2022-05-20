import React from 'react';
import Form from '../../components/Form';

export default function Signup() {
  async function handleSignup(fields) {
    const {
      name, email, password, passwordConfirmation,
    } = fields;
    console.log({
      name, email, password, passwordConfirmation,
    });
  }

  return (
    <Form
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
          route: '/login',
          text: 'Já tem uma conta? Entre.',
        },
        handle: handleSignup,
      }}
    />
  );
}
