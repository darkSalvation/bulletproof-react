import { useInfiniteQuery } from '@tanstack/vue-query';

import { api } from '~/lib/api-client';
import type { QueryConfig } from '~/lib/react-query';
import { Comment, Meta } from '~/types/api';

export const getComments = ({
  discussionId,
  page = 1,
}: {
  discussionId: string;
  page?: number;
}): Promise<{ data: Comment[]; meta: Meta }> => {
  return api.get(`/comments`, {
    params: {
      discussionId,
      page,
    },
  });
};

export const getInfiniteCommentsQueryOptions = (discussionId: string) => {
  return {
    queryKey: ['comments', discussionId],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => {
      return getComments({ discussionId, page: pageParam });
    },
    getNextPageParam: (lastPage: { meta: Meta }) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  };
};

type UseCommentsOptions = {
  discussionId: string;
  page?: number;
  queryConfig?: QueryConfig<typeof getComments>;
};

export const useInfiniteComments = ({ discussionId }: UseCommentsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteCommentsQueryOptions(discussionId),
  });
};
