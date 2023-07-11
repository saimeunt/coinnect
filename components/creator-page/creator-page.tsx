import { Membership } from '../../lib/types';
import UnpublishedBanner from './unpublished-banner';
import Heading from './heading';

const CreatorPage = ({ membership }: { membership: Membership }) => {
  return (
    <>
      <UnpublishedBanner />
      <Heading
        membership={{
          name: 'tribe-diamond',
          title: 'Tribe Diamond',
          avatarUrl: '/img/avatar.jpg',
          description: '',
          bannerUrl: '/img/banner.jpg',
          interests: [],
        }}
      />
    </>
  );
};

export default CreatorPage;
