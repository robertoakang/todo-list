/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import Task from '../Task';
import './index.css';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField } from '@mui/material';

export default function BoxProjects({ onTaskCreate, project }) {
	const [descriptionTask, setDescriptionTask] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [dataModal, setDataModal] = useState({});

	const handleStoreTaskAndAssociateProject = async (id) => {
		console.log(id)
	};

	const handleDeleteProject = async (id) => {
		console.log(id)
	};

	const handleEditProject = async (id) => {
		console.log(id)
	};

	return (
		<div className="container">
			<div className="container-title">
				<div className="title">
					<span>{project.name}</span>
					<div className="actions">
						<button type="button" onClick={() => handleEditProject(project.id)}>
							<EditIcon />
						</button>
						<button
							type="button"
							onClick={() => handleDeleteProject(project.id)}
						>
							<DeleteIcon />
						</button>
					</div>
				</div>
			</div>

      <div className="addNewTask">
				<TextField
					className="addNewTaskInput"
					margin="none"
					id="taskName"
					label="Nome da tarefa"
					name="taskName"
					autoComplete="taskName"
					// onChange={handleChangeInput}
					type="text"
				/>
				<Button onClick={() => handleStoreTaskAndAssociateProject(project.id)}>Adicionar</Button>
      </div>
		</div>
	);
}
