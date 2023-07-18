import CreatorsAbout from '../../../../components/creators/about';

const CreatorsAboutPage = ({ params: { name } }: { params: { name: string } }) => (
  <CreatorsAbout name={name} />
);

export default CreatorsAboutPage;
