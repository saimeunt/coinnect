import UserCreatorsSlugMembership from '@/app/ui/user-creators-slug/membership';

const UserCreatorsSlugMembershipPage = ({ params: { slug } }: { params: { slug: string } }) => (
  <UserCreatorsSlugMembership slug={slug} />
);

export default UserCreatorsSlugMembershipPage;
