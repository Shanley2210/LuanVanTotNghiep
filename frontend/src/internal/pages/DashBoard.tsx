import { useState } from 'react';
import AdminEditor from '../components/AdminEditor';

export default function DashBoard() {
    const [content, setContent] = useState('<p>Nhập nội dung...</p>');

    const handleContentChange = (newHtml: string) => {
        setContent(newHtml);
        console.log(newHtml);
    };

    return (
        <div className='p-10 max-w-3xl mx-auto'>
            <h1 className='text-2xl font-bold mb-4'>Demo Editor</h1>
            <AdminEditor content={content} onChange={handleContentChange} />

            <div className='mt-8 p-4 bg-slate-100 rounded'>
                <h3 className='font-semibold'>HTML Output:</h3>
                <code className='break-all text-sm'>{content}</code>
            </div>
        </div>
    );
}
