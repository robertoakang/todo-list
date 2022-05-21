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
		    tasks: [
				{
					description: "123",
					status: 1,
					id: "1"
				},
				{
					description: "121233",
					status: 1,
					id: "2"
				},
				{
					description: "1231231",
					status: 2,
					finished_at: "2022-05-21T02:31:10.650Z",
					id: "3"
				},
				{
					description: "123123123123",
					status: 2,
					finished_at: "2022-05-21T02:31:10.650Z",
					id: "4"
				}],
		    users: [{
		      id: '123',
		    }],
				id: 1
		  },
		  {
		    name: 'teste 2',
		    tasks: [
				{
					description: "121233",
					status: 1,
					id: "5"
				},],
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
