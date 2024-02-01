import CreatorExclusivity from '@/app/ui/creator-exclusivity';

const CreatorExclusivityPage = ({ params: { id } }: { params: { id: string } }) => (
  <CreatorExclusivity exclusivityId={id} />
);

export default CreatorExclusivityPage;
