'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import slugify from 'slugify';

import { createCreatorAccount } from '@/app/lib/actions';
import { interests } from '@/app/lib/constants';
import SubmitButton from '@/app/ui/lib/submit-button';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox';
import { Text } from '@/components/text';

const NewCreatorAccountForm = () => {
  const [slug, setSlug] = useState('');
  const [state, formAction] = useFormState(createCreatorAccount, {
    message: '',
    errors: {},
  });
  return (
    <form className="py-6" action={formAction}>
      <Fieldset>
        <Legend>Create your membership</Legend>
        <Text>
          Your page title and page name is how people will know you and search for you.
          <br />
          You can always change it later.
        </Text>
        <FieldGroup>
          <Field>
            <Label>Title</Label>
            <Input
              name="title"
              required
              onChange={(event) => setSlug(slugify(event.target.value, { lower: true }))}
            />
          </Field>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
              Page name
            </label>
            <div className="mt-2 flex rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                {new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname}/creators/
              </span>
              <input
                id="slug"
                name="slug"
                pattern="^[\w\-]{4,31}$"
                required
                className="block flex-1 border-0 bg-transparent py-1.5 pl-0.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
              />
            </div>
          </div>
        </FieldGroup>
        <Legend className="mt-8">Interests</Legend>
        <Text>You must pick at least one of your interests.</Text>
        <CheckboxGroup>
          {interests.map((interest) => (
            <CheckboxField key={interest.id}>
              <Checkbox color="indigo" name="interests" value={interest.id.toString()} />
              <Label>{interest.name}</Label>
            </CheckboxField>
          ))}
        </CheckboxGroup>
        {state.message && <p className="mt-2 text-sm text-red-600">{state.message}</p>}
      </Fieldset>
      <div className="flex items-center justify-end">
        <SubmitButton text="Continue" pendingText="Continuing…" />
      </div>
    </form>
  );
};

export default NewCreatorAccountForm;
