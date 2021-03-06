import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../service/api';
import BoxProjects from '../BoxProjects';
import ProjectForm from '../ProjectForm';
import FullPageLoader from "../LoadingSpinner";
import './index.css';

const useFullPageLoader = () => {
    const [loading, setLoading] = useState(false);

    return [
        loading ? <FullPageLoader /> : null,
        () => setLoading(true),
        () => setLoading(false) 
    ];
};

export default function MainBox() {
	const [projects, setProjects] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

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
		showLoader()
		setTimeout(() => {
			getProjects().then(() => {
				hideLoader()
			});
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
						There are no projects associated with this user. <b>Create now!</b>
					</p>
				</div>
			)}
			<ProjectForm onCreateProject={() => getProjects()} />
      {loader}
		</div>
	);
}
