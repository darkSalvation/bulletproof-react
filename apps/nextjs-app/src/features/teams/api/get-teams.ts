import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';

import { api } from '~/lib/api-client';
import type { QueryConfig } from '~/lib/react-query';
import { Team } from '~/types/api';

export const getTeams = (): Promise<{ data: Team[] }> => {
  return api.get('/teams');
};

export const getTeamsQueryOptions = () => {
  return {
    queryKey: ['teams'],
    queryFn: () => getTeams(),
  };
};

type UseTeamsOptions = {
  queryConfig?: {
    enabled?: boolean | Ref<boolean>;
  };
};

export const useTeams = ({ queryConfig = {} }: UseTeamsOptions = {}) => {
  return useQuery({
    ...getTeamsQueryOptions(),
    ...queryConfig,
  });
};
