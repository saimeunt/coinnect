'use client';
import { useFormState } from 'react-dom';
// import { LinkIcon } from '@heroicons/react/20/solid';
import { useUpdateEffect } from 'usehooks-ts';

import useContext from '@/app/ui/lib/context/hook';
import { createPost } from '@/app/lib/actions';
import { postTierNames, postTiers } from '@/app/lib/models/post';
import SubmitButton from '@/app/ui/lib/submit-button';
import { Button } from '@/components/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/dialog';
import { Field, Fieldset, FieldGroup, Label, Legend } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Radio, RadioField, RadioGroup } from '@/components/radio';
import { Text } from '@/components/text';

const CreatePostDialog = () => {
  const {
    state: { createPostModalOpen },
    closeCreatePostModal,
  } = useContext();
  const [state, formAction] = useFormState(createPost, { message: '', errors: {} });
  useUpdateEffect(() => {
    if (state.message === 'Created post.') {
      closeCreatePostModal();
    }
  }, [state.message]);
  console.log(state);
  return (
    <Dialog open={createPostModalOpen} onClose={closeCreatePostModal}>
      <DialogTitle>Create a new post</DialogTitle>
      <DialogDescription>This will create a new video post.</DialogDescription>
      <form action={formAction}>
        <DialogBody>
          <Fieldset aria-label="Post details">
            <FieldGroup>
              <Field>
                <Label>Video URL</Label>
                <Input
                  name="video-url"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v="
                  required
                />
              </Field>
              <Field>
                <Label>Title</Label>
                <Input name="title" placeholder="Title" required />
              </Field>
              <Field>
                <Label>Description</Label>
                <Textarea name="description" required />
              </Field>
            </FieldGroup>
            <Legend className="mt-8">Visibility</Legend>
            <Text>Who can see this post?</Text>
            <RadioGroup name="tier" defaultValue="standard" aria-label="Visibility">
              {postTierNames.map((tier) => (
                <RadioField key={tier}>
                  <Radio color="indigo" value={tier} />
                  <Label>{postTiers[tier]}</Label>
                </RadioField>
              ))}
            </RadioGroup>
          </Fieldset>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={closeCreatePostModal}>
            Cancel
          </Button>
          <SubmitButton text="Create" pendingText="Creating…" />
        </DialogActions>
      </form>
    </Dialog>
  );
  /*
    <div>
                      <label
                        htmlFor="video-url"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Video URL
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="video-url"
                          name="video-url"
                          type="url"
                          // pattern="^https:\/\/www\.youtube\.com\/watch\?v=[\w]{11}$"
                          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          // placeholder="Type or paste video URL"
                          placeholder="https://www.youtube.com/watch?v="
                          required
                        />
                      </div>
                    </div>
  */
};

export default CreatePostDialog;
