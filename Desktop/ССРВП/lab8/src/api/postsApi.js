import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * RTK Query API для работы с постами.
 * Базовый URL: http://localhost:3001 (json-server)
 */
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    /** GET /posts — получить список всех постов */
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),
    /** GET /posts/:id — получить пост по id */
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Posts', id }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
