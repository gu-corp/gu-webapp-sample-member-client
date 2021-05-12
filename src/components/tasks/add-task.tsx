import React, { useState, useCallback } from "react";
import { useListTasksQuery } from "~/graphql/generated/graphql";

import { useAddTaskMutation } from "~/graphql/generated/graphql";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const AddTask = (props) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [addTask] = useAddTaskMutation();
  const {refetch} = useListTasksQuery();
  const classes = useStyles();

  const handleAddTask = async() => {
    try {
      setLoading(true);
      await addTask({ variables: { name: text } });
      await refetch();
      setLoading(false)
    } catch ( error ) {
      props.enqueueSnackbar(error.message, { 
        variant: 'error',
        preventDuplicate: true,
      });
      setLoading(false);      
    }
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        onChange={e=>setText(e.target.value)}
        onKeyPress={e => {
          if (e.key == 'Enter') {
            e.preventDefault()
            handleAddTask()
          }
        }}
        placeholder="Add task"
        inputProps={{ 'aria-label': 'Add task' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={handleAddTask}>
        { !loading ? <AddCircle /> : <CircularProgress/> }
      </IconButton>
    </Paper>
  );
};