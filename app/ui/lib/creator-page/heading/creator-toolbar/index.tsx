import CreatePostButton from '@/app/ui/lib/creator-page/heading/creator-toolbar/create-post-button';
import SharePageButton from '@/app/ui/lib/creator-page/heading/creator-toolbar/share-page-button';

const CreatorToolbar = ({ unpublished }: { unpublished: boolean }) => (
  <>
    <CreatePostButton />
    <SharePageButton disabled={unpublished} />
  </>
);

export default CreatorToolbar;
