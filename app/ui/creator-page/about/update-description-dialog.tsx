'use client';
import { useFormState } from 'react-dom';
import { useUpdateEffect } from 'usehooks-ts';

import useContext from '@/app/ui/lib/context/hook';
import { updateDescription } from '@/app/lib/actions';
import { Button } from '@/components/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/dialog';
import { Field, Label } from '@/components/fieldset';
import SubmitButton from '@/app/ui/lib/submit-button';
import { Textarea } from '@/components/textarea';

const UpdateDescriptionDialog = ({ description }: { description: string }) => {
  const {
    state: { updateDescriptionModalOpen },
    closeUpdateDescriptionModal,
  } = useContext();
  const [state, formAction] = useFormState(updateDescription, { message: '', errors: {} });
  useUpdateEffect(() => {
    if (state.message === 'Updated description.') {
      closeUpdateDescriptionModal();
    }
  }, [state.message]);
  return (
    <Dialog open={updateDescriptionModalOpen} onClose={closeUpdateDescriptionModal}>
      <DialogTitle>About your page</DialogTitle>
      <DialogDescription>Help people coming to your page get to know you.</DialogDescription>
      <form action={formAction}>
        <DialogBody>
          <Field>
            <Label>Description</Label>
            <Textarea name="description" required defaultValue={description} />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={closeUpdateDescriptionModal}>
            Cancel
          </Button>
          <SubmitButton text="Save" pendingText="Saving…" />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateDescriptionDialog;
