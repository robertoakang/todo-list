import React, { useEffect, useState } from 'react';
import BoxProjects from '../BoxProjects';
import ProjectForm from '../ProjectForm';
import './index.css';

export default function MainBox() {
	const [projects, setProjects] = useState([]);

	const getProjects = async () => {
		setProjects([
		  {
		    name: 'teste 1',
		    tasks: [],
		    users: [{
		      id: '123',
		    }],
				id: 1
		  },
		  {
		    name: 'teste 2',
		    tasks: [],
		    users: [{
		      id: '123',
		    }],
				id: 2
		  },
		]);
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
						key={project.id}
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
