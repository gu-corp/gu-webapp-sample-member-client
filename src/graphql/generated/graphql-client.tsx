import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};



export type Mutation = {
  __typename?: 'Mutation';
  upsertProfile: Profile;
  disableProfile: Scalars['Boolean'];
  addTask: Task;
};


export type MutationUpsertProfileArgs = {
  newProfileData: NewProfileInput;
};


export type MutationDisableProfileArgs = {
  uid: Scalars['String'];
};


export type MutationAddTaskArgs = {
  newTaskData: NewTaskInput;
};

export type NewProfileInput = {
  uid: Scalars['String'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  city: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
  birthDay: Scalars['DateTime'];
  ethereumAddress: Array<Scalars['String']>;
};

export type NewTaskInput = {
  name: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  uid: Scalars['String'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  city: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
  birthDay: Scalars['Date'];
  ethereumAddress: Array<Scalars['String']>;
  createdDate: Scalars['Date'];
};

export type Query = {
  __typename?: 'Query';
  getProfile: Profile;
  listProfiles: Array<Profile>;
  listTasks: Array<Task>;
};


export type QueryGetProfileArgs = {
  uid: Scalars['String'];
};


export type QueryListProfilesArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  profileAdded: Profile;
  taskAdded: Task;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type AddTaskMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddTaskMutation = (
  { __typename?: 'Mutation' }
  & { addTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'name'>
  ) }
);

export type GetProfileQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetProfileQuery = (
  { __typename?: 'Query' }
  & { getProfile: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'firstName'>
  ) }
);

export type ListTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type ListTasksQuery = (
  { __typename?: 'Query' }
  & { listTasks: Array<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name'>
  )> }
);


export const AddTaskDocument = gql`
    mutation AddTask($name: String!) {
  addTask(newTaskData: {name: $name}) {
    name
  }
}
    `;
export type AddTaskMutationFn = Apollo.MutationFunction<AddTaskMutation, AddTaskMutationVariables>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddTaskMutation, AddTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, options);
      }
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = Apollo.MutationResult<AddTaskMutation>;
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<AddTaskMutation, AddTaskMutationVariables>;
export const GetProfileDocument = gql`
    query getProfile($uid: String!) {
  getProfile(uid: $uid) {
    firstName
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const ListTasksDocument = gql`
    query listTasks {
  listTasks {
    id
    name
  }
}
    `;

/**
 * __useListTasksQuery__
 *
 * To run a query within a React component, call `useListTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useListTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useListTasksQuery(baseOptions?: Apollo.QueryHookOptions<ListTasksQuery, ListTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListTasksQuery, ListTasksQueryVariables>(ListTasksDocument, options);
      }
export function useListTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListTasksQuery, ListTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListTasksQuery, ListTasksQueryVariables>(ListTasksDocument, options);
        }
export type ListTasksQueryHookResult = ReturnType<typeof useListTasksQuery>;
export type ListTasksLazyQueryHookResult = ReturnType<typeof useListTasksLazyQuery>;
export type ListTasksQueryResult = Apollo.QueryResult<ListTasksQuery, ListTasksQueryVariables>;