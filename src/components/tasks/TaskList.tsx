import React, { useCallback } from "react";

import { InferGetServerSidePropsType } from "next";

import { client } from "../../graphql/client";
import { ListTasksDocument, ListTasksQuery, ListTasksQueryVariables, useListTasksQuery  } from "~/graphql/generated/graphql";
import {
  useAuthUser,

} from 'next-firebase-auth'

// export const getServerSideProps = async () => {
//   const { data } = await client.query<ListTasksQuery, ListTasksQueryVariables>({
//     query: ListTasksDocument,
//   });
//   return { props: { initialData: data } };
// };

// export const TaskList = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
export const TaskList = (props) => {

  const AuthUser = useAuthUser();
  if ( !AuthUser.email ) {
    return <div>Loading.</div>
  }
  
  const { data, refetch, loading, error  } = useListTasksQuery();
  if ( !data || loading ) {
    return (<>
      <div>EMail: {AuthUser.email}</div>
      <div>Loading..</div>
      </>
    );
  }
  const tasksData = data ? data.listTasks : props.initialData.listTasks;


  return (
    <>
      <h2>Nest Next TODO Sample</h2>
      <p>EMail: {AuthUser.email}</p>
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