import React, { useCallback } from "react";

import { InferGetServerSidePropsType } from "next";

import { client } from "../graphql/client";
import { ListTasksDocument, ListTasksQuery, ListTasksQueryVariables, useListTasksQuery  } from "~/graphql/generated/graphql";

export const getServerSideProps = async () => {
  const { data } = await client.query<ListTasksQuery, ListTasksQueryVariables>({
    query: ListTasksDocument,
  });
  return { props: { initialData: data } };
};

export const TaskList = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, refetch, loading, error  } = useListTasksQuery();
  if ( loading ) {
    return <div>Loading..</div>
  }
  const tasksData = data ? data.listTasks : props.initialData.listTasks;


  return (
    <>
      <div>Nest Next TODO Sample</div>
      <div>
        { tasksData.map(task => {
          return (
          <ul>
            <li>{task.id}:{task.name}</li>
          </ul>)
        })}
      </div>
    </>
  );
};