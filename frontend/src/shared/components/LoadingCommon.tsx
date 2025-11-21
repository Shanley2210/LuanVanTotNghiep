import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function LoadingCommon() {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 pointer-events-none'>
            <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' />
            <AiOutlineLoading3Quarters className='animate-spin text-white text-5xl relative' />
        </div>
    );
}
