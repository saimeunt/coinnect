import UserCreatorsName from '../../../../components/user-creators-name';

const UserCreatorsNamePage = ({ params: { name } }: { params: { name: string } }) => (
  <UserCreatorsName name={name} />
);

export default UserCreatorsNamePage;
