import UserCreatorsSlug from '@/app/ui/user-creators-slug';

const UserCreatorsSlugPage = ({ params: { slug } }: { params: { slug: string } }) => (
  <UserCreatorsSlug slug={slug} />
);

export default UserCreatorsSlugPage;
