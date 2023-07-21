import CreatorsNameAbout from '../../../../components/creators-name/about';

const CreatorsNameAboutPage = ({ params: { name } }: { params: { name: string } }) => (
  <CreatorsNameAbout name={name} />
);

export default CreatorsNameAboutPage;
