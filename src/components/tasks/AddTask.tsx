import React, { useState, useCallback } from "react";
import { useListTasksQuery } from "~/graphql/generated/graphql";

import { Button, TextField } from '@material-ui/core';
import { useAddTaskMutation } from "~/graphql/generated/graphql";

export const AddTask = (props) => {
  const [text, setText] = useState('');
  const [addTask] = useAddTaskMutation();
  const { refetch } = useListTasksQuery();

  const handleAddTask = async() => {
    await addTask({ variables: { name: text } });
    await refetch();
  };

  return (
    <>
      <div>
        <TextField 
          id="outlined-basic" label="Outlined" variant="outlined" value={text} 
          onChange={e=>setText(e.target.value)}
          onKeyPress={e => {
            if (e.key == 'Enter') {
              console.log('hoge');
              e.preventDefault()
              handleAddTask()
            }
          }}
        />
      </div>
      <div>
        <Button 
          variant="contained"
          onClick={handleAddTask}
          >Add</Button>
      </div>
    </>
  );
};