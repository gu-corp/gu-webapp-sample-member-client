import React from "react";
import { useTranslation } from 'next-i18next'
import { withSnackbar } from 'notistack';

import { useListTasksQuery } from "~/graphql/generated/graphql";
import { useAddTaskMutation } from "~/graphql/generated/graphql";

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { validateObject } from '~/common/validator/class-validator-helper';
import { NewTaskInput } from './add-task.input';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 1
  },
  input: {
    margin: 5
  },
  button: {
    margin: 5
  }
}));

interface FormValues {
  taskName: string;
}

const initialValues: FormValues = {
  taskName: '',
}

const AddTaskForm = (props) => {
  const { t } = useTranslation('common')
  const [addTask] = useAddTaskMutation();
  const {refetch} = useListTasksQuery();
  const classes = useStyles();

  const handleSubmit = (values, { setSubmitting }) => {
    (async() => {
      try {
        await addTask({ variables: { name: values.taskName } });
        await refetch();
      } catch (error) {
        props.enqueueSnackbar(error.message, { 
          variant: 'error',
          preventDuplicate: true,
        });
      }
      setSubmitting(false)
    })();
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={async(values) => await validateObject(Object.assign(new NewTaskInput(), values))}
      onSubmit={handleSubmit}
    >
      {({ submitForm, isSubmitting, errors, isValid }) => (
        <Form className={classes.root}>
          <Field
            className={classes.input}
            component={TextField}
            name="taskName"
            label={t('task_name')}
          />    
          <br />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={isSubmitting || !isValid}
            onClick={submitForm}
          >
           {isSubmitting ? <CircularProgress /> : "Submit" }
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withSnackbar(AddTaskForm);