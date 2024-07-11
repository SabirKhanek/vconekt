import { UploadFileResponse } from 'uploadthing/client';
import FileUpload from './file-upload';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';
import { ReactNode, useState } from 'react';

export function UploadFileDialog({
  open: _open = false,
  setOpen: _setOpen,
  onConfirm,
  title,
  children
}: {
  open?: boolean;
  setOpen?: (val: boolean) => void;
  onConfirm: (val: UploadFileResponse) => void;
  title?: string;
  children?: ReactNode;
}) {
  const [open, setOpenState] = useState(_open);
  function setOpen(val: boolean) {
    if (_setOpen) {
      _setOpen(val);
    }
    setOpenState(val);
  }
  const [value, setValue] = useState<UploadFileResponse[]>([]);

  function handleChange(val: UploadFileResponse[]) {
    setValue(() => [...val]);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a file</DialogTitle>
          <DialogDescription>
            You can upload files from this here!
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <FileUpload
            value={value}
            onChange={handleChange}
            onRemove={handleChange}
          ></FileUpload>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            disabled={value.length === 0}
            type="button"
            variant={'outline'}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              if (value.length <= 0) {
                return;
              }
              if (onConfirm) onConfirm(value.at(0)!);
              setOpen(false);
            }}
            disabled={value.length === 0}
            type="submit"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
