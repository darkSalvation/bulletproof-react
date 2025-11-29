import { useQuery } from '@tanstack/vue-query';

import { api } from '~/lib/api-client';
import type { QueryConfig } from '~/lib/react-query';
import { User } from '~/types/api';

export const getUsers = (): Promise<{ data: User[] }> => {
  return api.get(`/users`);
};

export const getUsersQueryOptions = () => {
  return {
    queryKey: ['users'],
    queryFn: getUsers,
  };
};

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({ queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  });
};
