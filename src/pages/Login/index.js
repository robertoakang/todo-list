import React from 'react';
import Form from '../../components/Form';

export default function Login() {
  async function handleLogin(fields) {
    const { email, password } = fields;
    console.log({ email, password });
  }

  return (
    <Form
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
