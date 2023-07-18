// import Image from 'next/image';
import { format } from 'date-fns';
import { orderBy } from 'lodash';

import { CreatorAccount, Post } from '../../../lib/types';

const Post = ({
  post,
  author,
}: {
  post: Post;
  author: { username: string; avatarUrl: string; fullName: string };
}) => (
  <article className="overflow-hidden rounded-lg bg-white shadow">
    <div className="flex max-w-xl flex-col items-start justify-between px-4 py-5 sm:p-6">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={new Date(post.date).toISOString()} className="text-gray-500">
          {format(new Date(post.date), 'MMM d, yyyy')}
        </time>
        <a
          href={post.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 rounded-full bg-red-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-red-100"
        >
          Youtube
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <span>{post.title}</span>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
      </div>
      <iframe
        className="aspect-video mt-8 w-full rounded-lg"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${new URL(post.videoUrl).searchParams.get('v')}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <div className="relative mt-8 flex items-center gap-x-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.avatarUrl}
          alt={`${author.username} avatar`}
          className="h-10 w-10 rounded-full bg-gray-50"
        />
        {/* <Image
          src={author.avatarUrl}
          alt={`${author.username} avatar`}
          className="h-10 w-10 rounded-full bg-gray-50"
          width={40}
          height={40}
        /> */}
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <span>{author.username}</span>
          </p>
          <p className="text-gray-600">{author.fullName}</p>
        </div>
      </div>
    </div>
  </article>
);

const PostsList = ({
  creatorAccount,
  posts,
  user,
}: {
  creatorAccount: CreatorAccount;
  posts: Post[];
  user: { fullName: string };
}) =>
  posts.length === 0 ? (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <p className="text-lg leading-8 text-gray-600">There&apos;s no posts yet.</p>
      </div>
    </div>
  ) : (
    <div className="space-y-8">
      {orderBy(posts, 'date', 'desc').map((post) => (
        <Post
          key={post.videoUrl}
          post={post}
          author={{
            username: creatorAccount.title,
            avatarUrl: creatorAccount.avatarUrl,
            fullName: user.fullName,
          }}
        />
      ))}
    </div>
  );

export default PostsList;
