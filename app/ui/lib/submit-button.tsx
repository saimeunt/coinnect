import { type ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/button';

type Color =
  | 'indigo'
  | 'dark/zinc'
  | 'light'
  | 'dark/white'
  | 'dark'
  | 'white'
  | 'zinc'
  | 'cyan'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'sky'
  | 'blue'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

const SubmitButton = ({
  text,
  pendingText,
  color = 'indigo',
  disabled = false,
  form,
  icon,
}: {
  text: string;
  pendingText: string;
  color?: Color;
  disabled?: boolean;
  form?: string;
  icon?: ReactNode;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color={color} form={form} disabled={disabled || pending}>
      {icon}
      {pending ? pendingText : text}
    </Button>
  );
};

export default SubmitButton;
