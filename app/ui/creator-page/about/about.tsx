import { type CreatorAccount } from '@/app/lib/models/creator-account';
import AboutEmptyState from '@/app/ui/creator-page/about/about-empty-state';
import AboutDescription from '@/app/ui/lib/creator-page/about-description';
import EditDescriptionButton from '@/app/ui/creator-page/about/edit-description-button';

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
