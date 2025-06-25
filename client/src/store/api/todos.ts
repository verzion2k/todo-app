import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todo, TodoResponse } from "../../types";
import {
  ApiKeys,
  HttpMethods,
  Tags,
  type BaseTodoPayload,
  type CreateTodoPayload,
  type UpdateTodoPayload,
} from "./types";
import { nanoid } from "@reduxjs/toolkit";

export const todosApi = createApi({
  reducerPath: "todosApi",
  tagTypes: [Tags.TODO_LIST],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => ApiKeys.TODOS,
      transformResponse: (todos: TodoResponse[]) =>
        todos.map(({ _id, text, completed }) => ({
          id: _id,
          text,
          completed,
        })),
      providesTags: [Tags.TODO_LIST],
    }),
    createTodo: builder.mutation<TodoResponse, CreateTodoPayload>({
      query: (payload) => ({
        url: ApiKeys.TODOS,
        method: HttpMethods.POST,
        body: payload,
      }),
      async onQueryStarted({ text }, { dispatch, queryFulfilled }) {
        const tempId = nanoid();
        const patchResult = dispatch(
          todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
            draft.unshift({ id: tempId, text: text!, completed: false });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      /* invalidatesTags: [Tags.TODO_LIST], */
    }),
    updateTodo: builder.mutation<TodoResponse, UpdateTodoPayload>({
      query: ({ id, data }) => ({
        url: `${ApiKeys.TODOS}/${id}`,
        method: HttpMethods.PUT,
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
            const todo = draft.find((todo) => todo.id === id);
            if (todo) Object.assign(todo, data);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      /* invalidatesTags: [Tags.TODO_LIST], */
    }),
    deleteTodo: builder.mutation<TodoResponse["_id"], BaseTodoPayload>({
      query: ({ id }) => ({
        url: `${ApiKeys.TODOS}/${id}`,
        method: HttpMethods.DELETE,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
            return draft.filter((todo) => todo.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      /* invalidatesTags: [Tags.TODO_LIST], */
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
