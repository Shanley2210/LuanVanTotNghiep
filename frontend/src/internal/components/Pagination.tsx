import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
    total: number; // tổng số bản ghi
    pageSize: number; // số bản ghi mỗi trang
    current: number; // trang hiện tại
    onChange: (page: number) => void; // callback khi đổi trang
    isDark?: boolean; // tuỳ chọn dark mode
}

export default function Pagination({
    total,
    pageSize,
    current,
    onChange,
    isDark = false
}: PaginationProps) {
    const totalPages = Math.ceil(total / pageSize);

    const handlePrev = () => {
        if (current > 1) onChange(current - 1);
    };

    const handleNext = () => {
        if (current < totalPages) onChange(current + 1);
    };

    const renderPageNumbers = () => {
        const pages = [];
        const start = Math.max(current - 1, 1);
        const end = Math.min(current + 1, totalPages);

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onChange(i)}
                    className={`px-3 py-1 bg-transparent border-none mx-1 rounded ${
                        current === i
                            ? 'text-blue-500 text-lg'
                            : isDark
                            ? 'text-gray-100'
                            : 'text-neutral-900'
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className='flex justify-end'>
            <div
                className={`flex items-center w-fit mt-4 bg-transparent ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                <button
                    onClick={handlePrev}
                    disabled={current === 1}
                    className={`px-3 py-1 mx-1 cursor-pointer ${
                        isDark
                            ? 'bg-gray-700 border-gray-500 text-white'
                            : 'bg-white border-gray-300 text-black'
                    }`}
                >
                    <IoIosArrowBack />
                </button>
                {renderPageNumbers()}
                <button
                    onClick={handleNext}
                    disabled={current === totalPages}
                    className={`px-3 py-1 mx-1 cursor-pointer ${
                        isDark
                            ? 'bg-gray-700 border-gray-500 text-white'
                            : 'bg-white border-gray-300 text-black'
                    }`}
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
}
