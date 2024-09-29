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

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
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
  });

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
      <BubbleMenu editor={editor}>
        <Button.Group>
          <Button 
            size="xs"
            gradientDuoTone="purpleToBlue"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            outline={!editor?.isActive('bold') || false}
          >
            Bold
          </Button>
          <Button 
            size="xs"
            gradientDuoTone="purpleToBlue"
            onClick={() => editor?.chain().focus().toggleItalic().run()} 
            outline={!editor?.isActive('italic') || false}
          >
            Italic
          </Button>
        </Button.Group>
      </BubbleMenu>
      <div className="editor-menu flex space-x-2 mb-4">
        <Button
          size="xs"
          gradientDuoTone="purpleToBlue"
          outline={!editor?.isActive('heading', { level: 1 }) || false}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          Heading 1
        </Button>
        <Button
          size="xs"
          gradientDuoTone="purpleToBlue"
          outline={!editor?.isActive('heading', { level: 2 }) || false}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          Heading 2
        </Button>
        <Button
          size="xs"
          gradientDuoTone="purpleToBlue"
          outline={!editor?.isActive('heading', { level: 3 }) || false}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          Heading 3
        </Button>
        {/* <Button size="xs" onClick={addYoutubeVideo}>
          Add YouTube Video
        </Button> */}
      </div>
      <div className="tiptap">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
