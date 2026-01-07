import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}
export default function PatientPagination({
    currentPage,
    totalPages,
    onPageChange,
    className = ''
}: PaginationProps) {
    const { t } = useTranslation();

    if (totalPages <= 1) return null;

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    return (
        <div
            className={`flex justify-center items-center gap-2 mt-8 ${className}`}
        >
            <button
                className={`p-2 border transition-colors ${
                    currentPage === 1
                        ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                        : 'text-blue-500 border-blue-500 hover:bg-blue-50 cursor-pointer'
                }`}
                disabled={currentPage === 1}
                onClick={handlePrev}
            >
                <IoIosArrowBack />
            </button>

            <span className='mx-2 text-sm sm:text-base'>
                {t('allDoctorPage.page') || 'Trang'} {currentPage} /{' '}
                {totalPages}
            </span>

            <button
                className={`p-2 border transition-colors ${
                    currentPage === totalPages
                        ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                        : 'text-blue-500 border-blue-500 hover:bg-blue-50 cursor-pointer'
                }`}
                disabled={currentPage === totalPages}
                onClick={handleNext}
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
}
