import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../service/api';
import BoxProjects from '../BoxProjects';
import ProjectForm from '../ProjectForm';
import './index.css';

export default function MainBox() {
	const [projects, setProjects] = useState([]);

	const getProjects = async () => {
		try {
			const response = await api.get('/projects')
			setProjects(response.data.projects);
		} catch (error) {
			if(error.response) {
				toast.error(error.response.data.message);
			}
		}
	};

	useEffect(() => {
		setTimeout(() => {
			getProjects();
		}, 200);
	}, []);

	return (
		<div className="box-container">
			{projects.length > 0 ? (
				projects.map((project) => (
					<BoxProjects
						project={project}
						key={project._id}
						onTaskCreate={() => getProjects()}
					/>
				))
			) : (
				<div className="container">
					<p className="noProjects">
						Não existem projetos associados a esse usuário.
					</p>
				</div>
			)}
			<ProjectForm onCreateProject={() => getProjects()} />
		</div>
	);
}
