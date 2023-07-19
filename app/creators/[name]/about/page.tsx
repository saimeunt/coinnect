import CreatorsAbout from '../../../../components/creators-name/about';

const CreatorsAboutPage = ({ params: { name } }: { params: { name: string } }) => (
  <CreatorsAbout name={name} />
);

export default CreatorsAboutPage;
