import CreatorsSlugAbout from '@/app/ui/creators-slug/about';

const CreatorsSlugAboutPage = ({ params: { slug } }: { params: { slug: string } }) => (
  <CreatorsSlugAbout slug={slug} />
);

export default CreatorsSlugAboutPage;
