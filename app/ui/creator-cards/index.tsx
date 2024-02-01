import { currentUser } from '@/app/lib/models/user';
import CardTier from '@/app/ui/creator-cards/card-tier';

const CreatorCards = async () => {
  const user = await currentUser();
  if (!user || !user.userAccount || !user.creatorAccount) {
    return null;
  }
  return (
    <CardTier tier="free" userAccount={user.userAccount} creatorAccount={user.creatorAccount} />
  );
};

export default CreatorCards;
