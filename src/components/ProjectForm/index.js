import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import api from '../../service/api'
import './index.css';

function ProjectForm({ onCreateProject }) {
	const [project, setProject] = useState('');

	function handleChangeInput(event) {
		setProject(event.target.value);
	}

	async function handleCreateProject(event) {
		event.preventDefault();
		try {
			const response = await api.post('/projects', {
				name: project
			});
			toast.success(response.data.message)
			setProject('')
			onCreateProject();
		} catch (error) {
			if(error.response) {
				toast.error(error.response.data.message);
			}
		}
	}

	return (
		<div className="box-form">
			<h3>CREATE NEW PROJECT</h3>
			<TextField
				margin="none"
				id="projectName"
				label="Project Name"
				name="projectName"
				autoComplete="projectName"
				onChange={handleChangeInput}
				value={project}
				type="text"
				className="input-field"
			/>
			<Button onClick={handleCreateProject}>CREATE</Button>
		</div>
	);
}

ProjectForm.propTypes = {
	onCreateProject: PropTypes.func.isRequired,
};

export default ProjectForm