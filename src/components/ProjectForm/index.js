import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './index.css';

export default function ProjectForm() {
	const [project, setProject] = useState('');

	function handleChangeInput(event) {
		setProject(event.target.value);
	}

	async function handleCreateProject(event) {
		event.preventDefault();
		console.log(project);
	}

	return (
		<div className="box-form">
			<h3>CRIAR NOVO PROJETO</h3>
			<TextField
				margin="none"
				id="projectName"
				label="Nome do projeto"
				name="projectName"
				autoComplete="projectName"
				onChange={handleChangeInput}
				value={project}
				type="text"
				className="input-field"
			/>
			<Button onClick={handleCreateProject}>Criar</Button>
		</div>
	);
}
