import { getApiInstance } from "@portal/utils/axios";

export const userApi = {
  getById: async (id: string) => {
    const intance = getApiInstance();
    const { data } = await intance.get(`/api/user/${id}`);

    return data;
  },
  getMe: async () => {
    const intance = getApiInstance(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI3MDU5NjZlLWY5MWItNGRjMS04YjRkLTQyYjI1OGVlYWIyNCIsImVtYWlsIjoiMTQ2YWRkYmIxY2I1MWUyNWQyMDk2NTgwOWI5MWZlMzQ5ZmJlODYyNGI2N2E0NTQ1ZDcwYjliZWY4MDUwMmQ2NSIsInBhc3N3b3JkIjoiJDJhJDEwJGJRZng5YjlLWmVieS9qVnpNODUuZXV4ZnRXWm1Zd3ZYR3FQSThqOG5YeDhORnhyRVRXZVZhIiwibmFtZSI6IlbDrXRvciBDb250aSIsImNyZWF0ZWRBdCI6IjIwMjQtMDItMjBUMDA6NDA6MDguNjkwWiIsInVwZGF0ZWRBdCI6bnVsbCwiZGVsZXRlZEF0IjpudWxsLCJpYXQiOjE3MDgzOTExODksImV4cCI6MTcwODQwNTU4OX0.o1nlY_V28LLAGYA9OhGGm-G6DtcgpLQ6of_UDO45yGE"
    );
    const { data } = await intance.get(`/api/user/me`);

    return data;
  },
};
