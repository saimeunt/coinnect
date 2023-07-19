import UserCreatorsAbout from '../../../../../components/creators-name/about';

const UserCreatorsAboutPage = ({ params: { name } }: { params: { name: string } }) => (
  <UserCreatorsAbout name={name} />
);

export default UserCreatorsAboutPage;
