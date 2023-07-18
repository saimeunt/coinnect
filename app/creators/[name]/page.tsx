import Creators from '../../../components/creators';

const CreatorsPage = ({ params: { name } }: { params: { name: string } }) => (
  <Creators name={name} />
);

export default CreatorsPage;
