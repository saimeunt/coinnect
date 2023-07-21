import UserCreatorsNameAbout from '../../../../../components/user-creators-name/about';

const UserCreatorsNameAboutPage = ({ params: { name } }: { params: { name: string } }) => (
  <UserCreatorsNameAbout name={name} />
);

export default UserCreatorsNameAboutPage;
