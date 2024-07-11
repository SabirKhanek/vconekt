'use client';

import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';

import { TooltipProvider } from './plate-ui/tooltip';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Plate,
  useEditorRef,
  PlateEditor as PlateEditorType,
  deserializeHtml,
  Value
} from '@udecode/plate-common';
import { plugins } from './plate-plugins';
import React, { useEffect, useRef, useState } from 'react';
import { deserializeMd, serializeMd } from '@udecode/plate-serializer-md';

export const initialValue = [
  {
    id: '1',
    type: 'p',
    children: [{ text: '' }]
  }
];

export function PlateEditor({
  initialValue,
  editorValue,
  setEditorValue,
  onMarkdownChanged
}: {
  initialValue: Value;
  editorValue: Value;
  setEditorValue: (v: Value) => void;
  onMarkdownChanged: (v: string) => void;
}) {
  return (
    <React.Fragment>
      <div className="mt-5">
        <TooltipProvider>
          <DndProvider backend={HTML5Backend}>
            <Plate
              onChange={setEditorValue}
              plugins={plugins}
              value={editorValue}
              initialValue={initialValue}
            >
              <HandlePlateMarkdown
                onMarkdownUpdated={onMarkdownChanged}
                setVal={setEditorValue}
                val={editorValue}
              ></HandlePlateMarkdown>
              <FixedToolbar>
                <FixedToolbarButtons />
              </FixedToolbar>
              <Editor />
              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>
            </Plate>
          </DndProvider>
        </TooltipProvider>
      </div>
      {/* <pre> {JSON.stringify(editorValue, null, 3)} </pre> */}
    </React.Fragment>
  );
}

function HandlePlateMarkdown({
  val,
  onMarkdownUpdated
}: {
  val: any;
  setVal: any;
  onMarkdownUpdated: (v: string) => void;
}) {
  const editor = useEditorRef();
  useEffect(() => {
    const md = serializeMd(editor);
    onMarkdownUpdated(md);
    console.log({ md, obj: deserializeMd(editor, md) });
  }, [val]);

  return null;
}
