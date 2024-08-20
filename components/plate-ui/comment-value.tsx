/**
 * Renders a comment value input field with edit actions (cancel and save buttons).
 * The comment value input field is styled using the `inputVariants` function, and the buttons are styled using the `buttonVariants` function.
 * This component is typically used within a comment section or a comment thread.
 */
'use client';

import React from 'react';

import { cn } from '@udecode/cn';
import {
  CommentEditActions,
  CommentEditTextarea
} from '@udecode/plate-comments';

import { buttonVariants } from './button';
import { inputVariants } from './input';

export function CommentValue() {
  return (
    <div className="my-2 flex flex-col items-end gap-2">
      <CommentEditTextarea className={cn(inputVariants(), 'min-h-[60px]')} />

      <div className="flex space-x-2">
        <CommentEditActions.CancelButton
          className={buttonVariants({ size: 'xs', variant: 'outline' })}
        >
          Cancel
        </CommentEditActions.CancelButton>

        <CommentEditActions.SaveButton
          className={buttonVariants({ size: 'xs', variant: 'default' })}
        >
          Save
        </CommentEditActions.SaveButton>
      </div>
    </div>
  );
}
