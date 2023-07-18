import UserCreatorsAbout from '../../../../../components/creators/about';

const UserCreatorsAboutPage = ({ params: { name } }: { params: { name: string } }) => (
  <UserCreatorsAbout name={name} />
);

export default UserCreatorsAboutPage;
