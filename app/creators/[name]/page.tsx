import CreatorsName from '../../../components/creators-name';

const CreatorsNamePage = ({ params: { name } }: { params: { name: string } }) => (
  <CreatorsName name={name} />
);

export default CreatorsNamePage;
