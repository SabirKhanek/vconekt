'use client';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@uploadthing/react';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { UploadFileResponse as UploadFileResponseBase } from 'uploadthing/client';
import { IMG_MAX_LIMIT as IMG_DEFAULT_LIMIT } from './forms/product-form';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface UploadFileResponse extends UploadFileResponseBase {
  type: 'image' | 'video';
}

interface FileUploadProps {
  onChange?: (uploads: UploadFileResponse[]) => void;
  onRemove: (value: UploadFileResponse[]) => void;
  value: UploadFileResponse[];
  imageLimit?: number;
}

export default function FileUpload({
  onChange,
  onRemove,
  value,
  imageLimit
}: FileUploadProps) {
  const IMG_MAX_LIMIT = imageLimit || IMG_DEFAULT_LIMIT;
  const { toast } = useToast();

  const onDeleteFile = (key: string) => {
    const filteredFiles = value.filter((item) => item.key !== key);
    onRemove(filteredFiles);
  };

  const onUpdateFile = (newFiles: UploadFileResponse[]) => {
    onChange && onChange([...value, ...newFiles]);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {!!value.length &&
          value.map((item) => (
            <div
              key={item.key}
              className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
            >
              <div className="absolute right-2 top-2 z-10">
                <Button
                  type="button"
                  onClick={() => onDeleteFile(item.key)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div>
                {item.type === 'image' ? (
                  <Image
                    fill
                    className="object-cover"
                    alt="Image"
                    src={item.url || ''}
                  />
                ) : (
                  <video
                    controls
                    className="h-full w-full object-cover"
                    src={item.url || ''}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
      <div>
        {value.length < IMG_MAX_LIMIT && (
          <UploadDropzone<OurFileRouter>
            className="ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300 py-2 dark:bg-zinc-800"
            endpoint="imageOrVideo"
            config={{ mode: 'auto', appendOnPaste: true }}
            content={{
              allowedContent({ isUploading }) {
                if (isUploading)
                  return (
                    <>
                      <p className="mt-2 animate-pulse text-sm text-slate-400">
                        Uploading...
                      </p>
                    </>
                  );
              }
            }}
            onClientUploadComplete={(res) => {
              const data = res as UploadFileResponse[];
              if (data) {
                onUpdateFile(
                  data.map((d) => ({
                    ...d,
                    type: getFileTypeFromExtension(d.name)
                  }))
                );
              }
            }}
            onUploadError={(error: Error) => {
              toast({
                title: 'Error',
                variant: 'destructive',
                description: error.message
              });
            }}
            onUploadBegin={({}) => {
              // Do something once upload begins
            }}
          />
        )}
      </div>
    </div>
  );
}
const getFileTypeFromExtension = (filename: string): 'image' | 'video' => {
  const extension = filename.split('.').pop()?.toLowerCase();

  if (!extension) return 'image';

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];

  if (imageExtensions.includes(extension)) {
    return 'image';
  } else if (videoExtensions.includes(extension)) {
    return 'video';
  } else {
    return 'image';
  }
};
