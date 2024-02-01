'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation';

import { createUserAccount } from '@/app/lib/actions';
import { interests } from '@/app/lib/constants';
import SubmitButton from '@/app/ui/lib/submit-button';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox';
import { Text } from '@/components/text';
import { type CreatorAccount } from '@/app/lib/models/creator-account';
import ImageField from '@/app/ui/lib/image-field';

const NewUserAccountForm = ({ creatorAccount }: { creatorAccount: CreatorAccount | null }) => {
  const [avatarUrl, setAvatarUrl] = useState(
    new URL('/img/users/avatar10.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
  );
  const searchParams = useSearchParams();
  const [state, formAction] = useFormState(
    createUserAccount.bind(null, searchParams.get('creator')),
    {
      message: '',
      errors: {},
    },
  );
  return (
    <form className="py-6" action={formAction}>
      <Fieldset>
        <Legend>Create your account</Legend>
        <Text>Pick a username and choose at least one interest.</Text>
        <FieldGroup>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              defaultValue={creatorAccount ? creatorAccount.slug : ''}
              required
            />
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
                defaultChecked={
                  creatorAccount ? creatorAccount.interests.includes(interest.id) : false
                }
              />
              <Label>{interest.name}</Label>
            </CheckboxField>
          ))}
        </CheckboxGroup>
      </Fieldset>
      {state.message && <p className="mt-2 text-sm text-red-600">{state.message}</p>}
      <div className="flex items-center justify-end">
        <SubmitButton text="Continue" pendingText="Continuing…" />
      </div>
    </form>
  );
};

export default NewUserAccountForm;
