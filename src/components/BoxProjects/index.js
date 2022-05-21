/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import DialogModal from "../DialogModal";
import DialogEditModal from "../DialogEditModal";
import Task from '../Task';

import './index.css';
import api from '../../service/api';

function BoxProjects({ onTaskCreate, project }) {
	const [descriptionTask, setDescriptionTask] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
	const [dataModal, setDataModal] = useState({});

	const handleStoreTaskAndAssociateProject = async (id) => {
		console.log(id)
	};

	const handleDeleteProject = async (id) => {
		try {
			const response = await api.delete(`/projects/${id}`)
			if(response.data.message) toast.success(response.data.message);
			onTaskCreate();
		} catch (error) {
			if(error.response) {
				toast.error(error.response.data.message);
			}
		}
		setIsModalVisible(false);
	};

	const handleEditProject = async (id) => {
		const response = await api.get(`/projects/${id}`);
		setDataModal(response.data.project);
		setIsModalVisibleEdit(true);
	};

	const handleEditProjectConfirm = async (id) => {
		setIsModalVisibleEdit(false)
		console.log(id)
	};

	
	return (
		<div className="container">
			{ isModalVisibleEdit ? 
				<DialogEditModal 
					onClose={() => setIsModalVisibleEdit(false)} 
					onConfirm={() => handleEditProjectConfirm(project._id)}
					title="EDIT"
					description=""
				>
					<div>
						<h4>Usuários associados: </h4>

						{/* <div className="assoc-user">
								{ dataModal.users.length > 0 ? dataModal.users.map((item) => (
												<>
														<input type="checkbox" checked/>
														<label htmlFor='checkbox'>{item.name}</label>
												</>
										)) : <h1>Não há usuário associado a este projeto</h1>}
								
						</div> */}

						<FormGroup row>
							{ dataModal.users.map(item => (
										<div className="tasksToConfirm">
												<FormControlLabel control={<Checkbox checked />} label={ item.name } />
										</div>
											
									))}
							</FormGroup>
					</div>
					<TextField
            autoFocus
            margin="dense"
            id="projectName"
            label="Project Name"
            type="text"
						value={dataModal.name}
            fullWidth
            variant="standard"
          />
				</DialogEditModal>
			: null}

			{ isModalVisible ? 
				<DialogModal 
					onClose={() => setIsModalVisible(false)} 
					onConfirm={() => handleDeleteProject(project._id)}
					title="DELETE"
					description="Do you really want to delete the task?"
				/>
			: null}
				<div className="container-title">
					<div className="title">
						<span>{project.name}</span>
						<div className="actions">
							<button type="button" onClick={() => handleEditProject(project._id)}>
								<EditIcon />
							</button>
							<button
								type="button"
								onClick={() => setIsModalVisible(true)}
							>
								<DeleteIcon />
							</button>
						</div>
					</div>
				</div>

				<Task tasks={project.tasks} key={Math.random()} onTaskUpdate={onTaskCreate} />
				<div className="addNewTask">
					<TextField
						className="addNewTaskInput"
						margin="none"
						id="taskName"
						label="Task"
						name="taskName"
						autoComplete="taskName"
						// onChange={handleChangeInput}
						type="text"
					/>
					<Button onClick={() => handleStoreTaskAndAssociateProject(project._id)}>Add</Button>
				</div>
			</div>
	);
}

BoxProjects.propTypes = {
	onTaskCreate: PropTypes.func.isRequired, 
	project: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			tasks: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					description: PropTypes.string,
					status: PropTypes.number,
					finished_at: PropTypes.string
				})
			),
			users: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
			})
			),
			id: PropTypes.string
		})
	).isRequired
};

export default BoxProjects;
