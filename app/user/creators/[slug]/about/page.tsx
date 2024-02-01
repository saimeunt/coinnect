import UserCreatorsSlugAbout from '@/app/ui/user-creators-slug/about';

const UserCreatorsSlugAboutPage = ({ params: { slug } }: { params: { slug: string } }) => (
  <UserCreatorsSlugAbout slug={slug} />
);

export default UserCreatorsSlugAboutPage;
