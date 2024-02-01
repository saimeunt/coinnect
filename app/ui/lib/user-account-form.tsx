'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { usePathname } from 'next/navigation';

import { updateUserAccount } from '@/app/lib/actions';
import { interests } from '@/app/lib/constants';
import SubmitButton from '@/app/ui/lib/submit-button';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox';
import { Text } from '@/components/text';
import { type UserAccount } from '@/app/lib/models/user-account';
import ImageField from '@/app/ui/lib/image-field';

const UserAccountForm = ({ userAccount }: { userAccount: UserAccount }) => {
  const [avatarUrl, setAvatarUrl] = useState(userAccount.avatarUrl);
  const pathname = usePathname();
  const [state, formAction] = useFormState(
    updateUserAccount.bind(null, pathname === '/creator/profile' ? 'creator' : 'user'),
    {
      message: '',
      errors: {},
    },
  );
  return (
    <form className="py-6" action={formAction}>
      <Fieldset>
        <Legend>Update your profile</Legend>
        <Text>You can change your account preferences.</Text>
        <FieldGroup>
          <Field>
            <Label>Username</Label>
            <Input name="username" defaultValue={userAccount.username} required />
          </Field>
          <ImageField
            label="Avatar"
            name="avatar"
            imageUrl={avatarUrl}
            setImageUrl={setAvatarUrl}
          />
        </FieldGroup>
        <Legend className="mt-8">Interests</Legend>
        <Text>You must pick at least one of your interests.</Text>
        <CheckboxGroup>
          {interests.map((interest) => (
            <CheckboxField key={interest.id}>
              <Checkbox
                color="indigo"
                name="interests"
                value={interest.id.toString()}
                defaultChecked={userAccount.interests.includes(interest.id)}
              />
              <Label>{interest.name}</Label>
            </CheckboxField>
          ))}
        </CheckboxGroup>
      </Fieldset>
      {state.message && <p className="mt-2 text-sm text-red-600">{state.message}</p>}
      <div className="flex items-center justify-end">
        <SubmitButton text="Save" pendingText="Saving…" />
      </div>
    </form>
  );
};

export default UserAccountForm;
