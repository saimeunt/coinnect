import { getMembershipByName } from '../../lib/contract';

const CreatorPublic = async ({ name }: { name: string }) => {
  const membership = await getMembershipByName(name);
  return <div>CREATOR PUBLIC {membership.name}</div>;
};

export default CreatorPublic;
