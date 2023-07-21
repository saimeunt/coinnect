import UserCreatorsNameMembership from '../../../../../components/user-creators-name/membership';

const UserCreatorsNameMembershipPage = ({ params: { name } }: { params: { name: string } }) => (
  <UserCreatorsNameMembership name={name} />
);

export default UserCreatorsNameMembershipPage;
