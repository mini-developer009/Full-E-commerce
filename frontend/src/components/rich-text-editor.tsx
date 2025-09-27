"use client"

import * as React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"


import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  ImageIcon,
  Quote,
  Undo,
  Redo,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type RichTextEditorProps = {
  content?: string
  onUpdate?: (html: string) => void
}

export function RichTextEditor({ content = "", onUpdate }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing your blog post..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
    ],
    content,
    editorProps: {
      attributes: { class: "prose prose-lg dark:prose-invert focus:outline-none max-w-none" },
    },
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor.getHTML())
      }
    },
  })

  const addImage = () => {
    const url = window.prompt("Image URL")
    if (url && editor) editor.chain().focus().setImage({ src: url }).run()
  }

  const setLink = () => {
    if (!editor) return
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <>
      {/* Toolbar */}
      <div className="border rounded-lg rounded-b-none p-1 flex flex-wrap gap-1 bg-card border-b-0 overflow-x-auto">
        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive("bold") ? "bg-accent" : ""}>
          <Bold className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive("italic") ? "bg-accent" : ""}>
          <Italic className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleUnderline().run()} className={editor?.isActive("underline") ? "bg-accent" : ""}>
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleStrike().run()} className={editor?.isActive("strike") ? "bg-accent" : ""}>
          <Strikethrough className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={editor?.isActive("heading", { level: 1 }) ? "bg-accent" : ""}>
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={editor?.isActive("heading", { level: 2 }) ? "bg-accent" : ""}>
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={editor?.isActive("heading", { level: 3 }) ? "bg-accent" : ""}>
          <Heading3 className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={editor?.isActive("bulletList") ? "bg-accent" : ""}>
          <List className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={editor?.isActive("orderedList") ? "bg-accent" : ""}>
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={editor?.isActive("blockquote") ? "bg-accent" : ""}>
          <Quote className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().setTextAlign("left").run()} className={editor?.isActive({ textAlign: "left" }) ? "bg-accent" : ""}>
          <AlignLeft className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().setTextAlign("center").run()} className={editor?.isActive({ textAlign: "center" }) ? "bg-accent" : ""}>
          <AlignCenter className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().setTextAlign("right").run()} className={editor?.isActive({ textAlign: "right" }) ? "bg-accent" : ""}>
          <AlignRight className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={setLink} className={editor?.isActive("link") ? "bg-accent" : ""}>
          <LinkIcon className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={addImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className={editor?.isActive("codeBlock") ? "bg-accent" : ""}>
          <Code className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().undo()}>
          <Undo className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().redo()}>
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor content */}
      <div className="border rounded-br-lg rounded-bl-lg p-4 min-h-[300px] bg-card">
        <EditorContent editor={editor} className="h-full outline-none" />
      </div>
    </>
  )
}
