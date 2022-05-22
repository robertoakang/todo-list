import { format, parseISO } from "date-fns";
import React from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, FormGroup, Tooltip } from "@mui/material";
import api from "../../service/api";
import './index.css';

function Task({tasks, onTaskUpdate}) {
    const filterTasksTodo = tasks.filter(task => task.status === 1);

    const filterTasksDone = tasks.filter(task => task.status === 2);

    const handleCheckFinish = async (id) =>  {
			try {
				const response = await api.put(`/tasks/${id}`, {
          finished_at: new Date(),
          status: 2,
				})
				if(response.data.message) toast.success(response.data.message);
			} catch (error) {
				if(error.response) {
					toast.error(error.response.data.message);
				}
			}
      onTaskUpdate();
    }

    const handleRemoveTask = async (id) =>  {
      try {
        const response = await api.delete(`/tasks/${id}`)
        if(response.data.message) toast.success(response.data.message);
        onTaskUpdate();
      } catch (error) {
        if(error.response) {
          toast.error(error.response.data.message);
        }
      }
      onTaskUpdate()
    }

    const formatDate = (date) => format(parseISO(date), 'dd/MM/yyyy HH:mm');
    return (
        <div className="list">
            <ul className="task-status-list">
                <li>
                    <p>To Do</p>
                </li>
                <FormGroup row>
                { filterTasksTodo.map(task => (
                      <div className="tasksToConfirm">
                          <FormControlLabel control={<Checkbox onChange={() => handleCheckFinish(task._id)} />} label={ task.name } />
                          <FormControlLabel control={<DeleteIcon className="tasksToConfirmIcon" onClick={() => handleRemoveTask(task._id)} />} />
                      </div>
                        
                    ))}
                </FormGroup>
                <li>
                    <p>Done</p>
                </li>
                <FormGroup>
                { filterTasksDone.map(task => (
                  <Tooltip title={`Finished at: ${formatDate(task.finished_at)}`} arrow placement="bottom-start" followCursor>
                    <FormControlLabel disabled control={<Checkbox checked={!!task.finished_at} />} label={ task.name } />
                  </Tooltip>
                ))}
                </FormGroup>
            </ul>
            
        </div>

    );   
}



Task.propTypes = {
  tasks: PropTypes.node.isRequired,
  onTaskUpdate: PropTypes.func.isRequired
};

export default Task;