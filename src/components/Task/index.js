/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format, parse, parseISO } from "date-fns";
import React, { useState } from "react";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './index.css';
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";

function Task({tasks, onTaskUpdate}) {
    const [taskFinish, setTaskFinish] = useState(false);

    const filterTasksTodo = tasks.filter(task => task.status === 1);

    const filterTasksDone = tasks.filter(task => task.status === 2);

    const handleCheckFinish = async (id) =>  {
      onTaskUpdate()
      console.log(id)
      setTaskFinish(true);
    }

    const handleRemoveTask = async (id) =>  {
      onTaskUpdate()
      console.log(id)
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
                          <FormControlLabel control={<Checkbox onChange={() => handleCheckFinish(task.id)} />} label={ task.description } />
                          <FormControlLabel control={<DeleteIcon className="tasksToConfirmIcon" onClick={() => handleRemoveTask(task.id)} />} />
                      </div>
                        
                    ))}
                  </FormGroup>
                <li>
                    <p>Done</p>
                </li>
                <FormGroup>
                { filterTasksDone.map(task => (
                  <>
                    <FormControlLabel disabled control={<Checkbox checked={!!task.finished_at} />} label={ task.description } />
                    <small className="finished-label">{task.finished_at !== undefined ? `Finalizado em: ${formattedDate(task.finished_at)}` : '' }</small>
                  </>
                    ))}
                </FormGroup>
            </ul>
            
        </div>

    );   
}

export default Task;