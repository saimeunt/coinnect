import { CreatorAccount } from '../../../lib/types';
import AboutEmptyState from './about-empty-state';
import AboutDescription from '../../lib/creator-page/about-description';
import EditDescriptionButton from './edit-description-button';

const About = ({ creatorAccount }: { creatorAccount: CreatorAccount }) => (
  <>
    <div className="mt-8">
      {creatorAccount.description === '' ? (
        <AboutEmptyState />
      ) : (
        <AboutDescription description={creatorAccount.description} />
      )}
    </div>
    {creatorAccount.description !== '' && (
      <div className="mt-4 text-center">
        <EditDescriptionButton />
      </div>
    )}
  </>
);

export default About;
