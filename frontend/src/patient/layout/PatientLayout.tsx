import { useContext } from 'react';
import PatientHeader from '../components/PatientHeader';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import PatientFooter from '../components/PatientFooter';

export default function PatientLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { isDark } = useContext(ThemeContext);
    return (
        <div
            className={
                `flex min-h-screen flex-col select-none w-full overflow-x-hidden ` +
                (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black')
            }
        >
            <PatientHeader />
            <main className='flex-1 container'> 
                {children}
            </main>
            <PatientFooter />
        </div>
    );
}
