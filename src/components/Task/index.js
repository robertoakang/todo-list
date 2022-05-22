/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format, parse, parseISO } from "date-fns";
import React, { useState } from "react";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './index.css';
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import api from "../../service/api";

function Task({tasks, onTaskUpdate}) {
    const [taskFinish, setTaskFinish] = useState(false);

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
      setTaskFinish(true);
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

    const formattedDate = (date) => format(parseISO(date), 'dd/MM/yyyy HH:mm');
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
                  <>
                    <FormControlLabel disabled control={<Checkbox checked={!!task.finished_at} />} label={ task.name } />
                    <small className="finished-label">{task.finished_at !== undefined ? `Finished at: ${formattedDate(task.finished_at)}` : '' }</small>
                  </>
                    ))}
                </FormGroup>
            </ul>
            
        </div>

    );   
}

export default Task;