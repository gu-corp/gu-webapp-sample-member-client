import React, { useEffect } from "react";
import { withSnackbar } from 'notistack';
import { ListTasksDocument, ListTasksQuery, ListTasksQueryVariables, useListTasksLazyQuery, useListTasksQuery  } from "~/graphql/generated/graphql";
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

const TaskList = (props) => {
  const user = useAuthUser();
  const [listTasks, { data, refetch, loading, error  }]= useListTasksLazyQuery();

  useEffect(() => {
    if ( user.email ) {
      listTasks();
    }
  }, [user.email]);

  if ( error ) {
    props.enqueueSnackbar(error.message, { 
      variant: 'error',
      preventDuplicate: true,
    });
    return <div>Failed to load</div>
  }

  if ( !user.email || !data || loading ) {
    return <div>Loading..</div>
  }
  const tasksData = data ? data.listTasks : props.initialData.listTasks;

  return (
    <>
      <h2>Tasks</h2>
      <div>
        { tasksData.map(task => {
          return (
          <ul key={task.id}>
            <li>{task.id}:{task.name}</li>
          </ul>)
        })}
      </div>
    </>
  );
};

export default withAuthUser()(withSnackbar(TaskList));