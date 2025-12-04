import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

export default function AdminEditor({
    onChange,
    content
}: {
    onChange: (html: string) => void;
    content: string;
}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose max-w-none w-full prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none max-w-none [&_ol]:list-decimal [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:pl-5'
            }
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        }
    });

    if (!editor) {
        return null;
    }

    return (
        <div className='border border-input border-gray-300 bg-background'>
            <div className='flex items-center gap-1 p-2 border-b border-input border-gray-300 bg-transparent'>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                >
                    <Bold className='w-4 h-4' />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                >
                    <Italic className='w-4 h-4' />
                </ToolbarButton>
                <div className='w-px h-6 bg-border mx-1' /> {/* Divider */}
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    isActive={editor.isActive('bulletList')}
                >
                    <List className='w-4 h-4' />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    isActive={editor.isActive('orderedList')}
                >
                    <ListOrdered className='w-4 h-4' />
                </ToolbarButton>
            </div>

            {/* Editor Content Area */}
            <EditorContent editor={editor} className='min-h-[150px] p-2' />
        </div>
    );
}

// Button Component nhỏ gọn để tái sử dụng
const ToolbarButton = ({
    onClick,
    isActive,
    children
}: {
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}) => {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`p-2 rounded-md transition-colors ${
                isActive
                    ? 'bg-muted text-primary' // Active state (Shadcn style)
                    : 'text-muted-foreground hover:bg-muted hover:text-primary'
            }`}
        >
            {children}
        </button>
    );
};
