import CreatorPublic from '../../../components/creator-public';

const CreatorPublicPage = ({ params: { name } }: { params: { name: string } }) => (
  <CreatorPublic name={name} />
);

export default CreatorPublicPage;
