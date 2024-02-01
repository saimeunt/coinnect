import CreatorsSlug from '@/app/ui/creators-slug';

const CreatorsSlugPage = ({ params: { slug } }: { params: { slug: string } }) => (
  <CreatorsSlug slug={slug} />
);

export default CreatorsSlugPage;
