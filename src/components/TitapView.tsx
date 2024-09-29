"use client"

import React, { useCallback, useEffect } from 'react';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Youtube from '@tiptap/extension-youtube';
import { Button, Card } from 'flowbite-react'; // Import Flowbite React components

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapView: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Youtube,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable: false
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <div>
      <div className="tiptap">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapView;
