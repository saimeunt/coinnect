import { currentUser } from '@clerk/nextjs';

// import { Membership } from '../../lib/types';
import { membershipUrl } from '../../lib/utils';
import Tabs from './tabs';
import CardPreview from './card-preview';

const CreatorCards = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  // const draftMembership = user.publicMetadata.membership as Membership;
  // return <CreatorPage membership={draftMembership} />;
  // console.log(user);
  const { href } = membershipUrl('tribe-diamond');
  return (
    <div className="m-4">
      <h2 className="text-xl font-bold leading-7">Cards</h2>
      <Tabs />
      <CardPreview
        color="cyan"
        logoUrl="http://localhost:3000/img/avatar.jpg"
        tier="Free"
        tokenId="1"
        subscriptionStartTimestamp="0"
        subscriptionEndTimestamp="0"
        username={`${user.firstName} ${user.lastName}`}
        avatarUrl={user.profileImageUrl}
        oboleBalance="0"
        title="Tribe Diamond"
        description="The Tribe Diamond Pass is a collection of 200 generative NFTs that represents a community bonded by the belief in the future of web3 entertainment brands and interactive gaming."
        href={href}
      />
    </div>
  );
};

export default CreatorCards;
