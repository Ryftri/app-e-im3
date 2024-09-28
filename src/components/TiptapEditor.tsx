"use client"

import React, { useCallback, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { Editor } from '@tiptap/core';
import { Button } from 'flowbite-react'; // Import Flowbite React components

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Image,
      Youtube,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addYoutubeVideo = useCallback(() => {
    const url = window.prompt('Enter YouTube URL');
    if (url) {
      editor?.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  }, [editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <div>
      <div className="editor-menu">
        <Button
          color="primary"
          outline={editor?.isActive('heading', { level: 1 }) || false}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          Heading 1
        </Button>
        <Button
          color="primary"
          outline={editor?.isActive('heading', { level: 2 }) || false}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          Heading 2
        </Button>
        <Button
          color="primary"
          outline={editor?.isActive('heading', { level: 3 }) || false}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          Heading 3
        </Button>
        {/* Add other buttons for headings and features */}
        <Button onClick={addImage}>Add Image</Button>
        <Button onClick={addYoutubeVideo}>Add YouTube Video</Button>
      </div>
      <div className="tiptap">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
