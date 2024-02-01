'use client';
import { useFormState } from 'react-dom';

import useContext from '@/app/ui/lib/context/hook';
import { createExclusivity } from '@/app/lib/actions';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/dialog';
import { Field, Label } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import SubmitButton from '@/app/ui/lib/submit-button';

const CreateExclusivityDialog = () => {
  const {
    state: { createExclusivityModalOpen },
    closeCreateExclusivityModal,
  } = useContext();
  const [, formAction] = useFormState(createExclusivity, { message: '', errors: {} });
  return (
    <Dialog open={createExclusivityModalOpen} onClose={closeCreateExclusivityModal}>
      <DialogTitle>Create a new exclusivity</DialogTitle>
      <DialogDescription>This will create a new exclusivity.</DialogDescription>
      <form action={formAction}>
        <DialogBody>
          <Field>
            <Label>Title</Label>
            <Input name="title" placeholder="Title" required />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={closeCreateExclusivityModal}>
            Cancel
          </Button>
          <SubmitButton text="Create" pendingText="Creating…" />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateExclusivityDialog;
