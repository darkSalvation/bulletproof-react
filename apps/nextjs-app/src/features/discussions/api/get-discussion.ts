import { useQuery } from '@tanstack/vue-query';

import { api } from '~/lib/api-client';
import type { QueryConfig } from '~/lib/react-query';
import { Discussion } from '~/types/api';

export const getDiscussion = ({
  discussionId,
}: {
  discussionId: string;
}): Promise<{ data: Discussion }> => {
  return api.get(`/discussions/${discussionId}`);
};

export const getDiscussionQueryOptions = (discussionId: string) => {
  return {
    queryKey: ['discussions', discussionId],
    queryFn: () => getDiscussion({ discussionId }),
  };
};

type UseDiscussionOptions = {
  discussionId: string;
  queryConfig?: QueryConfig<typeof getDiscussionQueryOptions>;
};

export const useDiscussion = ({
  discussionId,
  queryConfig,
}: UseDiscussionOptions) => {
  return useQuery({
    ...getDiscussionQueryOptions(discussionId),
    ...queryConfig,
  });
};
