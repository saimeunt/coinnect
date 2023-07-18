import UserCreators from '../../../../components/user-creators';

const UserCreatorsPage = ({ params: { name } }: { params: { name: string } }) => (
  <UserCreators name={name} />
);

export default UserCreatorsPage;
