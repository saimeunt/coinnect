import { currentUser } from '@clerk/nextjs';

// import { Membership } from '../../lib/types';

const CreatorInsights = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  // const draftMembership = user.publicMetadata.membership as Membership;
  // return <CreatorPage membership={draftMembership} />;
  return <div>CREATOR INSIGHTS</div>;
};

export default CreatorInsights;
