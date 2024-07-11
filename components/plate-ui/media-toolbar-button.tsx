import React, { useState } from 'react';

import { withRef } from '@udecode/cn';
import {
  ELEMENT_IMAGE,
  type ELEMENT_MEDIA_EMBED,
  insertImage,
  useMediaToolbarButton
} from '@udecode/plate-media';

import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';
import { UploadFileResponse } from 'uploadthing/client';
import { UploadFileDialog } from '../image-upload';
import { useSlateStatic } from 'slate-react';
import { useEditorState } from '@udecode/plate-common';

export const MediaToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: typeof ELEMENT_IMAGE | typeof ELEMENT_MEDIA_EMBED;
  }
>(({ nodeType, ...rest }, ref) => {
  const editor = useEditorState();
  const [isModalOpen, setModalOpen] = useState(false);
  //   const { props } = useMediaToolbarButton({ nodeType });

  const handleConfirm = (val: UploadFileResponse) => {
    // Assuming val contains the URL of the uploaded image
    if (nodeType === ELEMENT_IMAGE && val.url) {
      insertImage(editor, val.url);
    }
    setModalOpen(false);
  };

  return (
    <>
      <UploadFileDialog
        open={isModalOpen}
        setOpen={setModalOpen}
        onConfirm={handleConfirm}
        title="Upload Image"
      >
        <ToolbarButton
          ref={ref}
          // {...props}
          {...rest}
          onClick={(event) => {
            //   event.preventDefault();
            console.log({ isModalOpen });
            setModalOpen(!isModalOpen);
          }}
        >
          <Icons.image />
        </ToolbarButton>
      </UploadFileDialog>
    </>
  );
});
