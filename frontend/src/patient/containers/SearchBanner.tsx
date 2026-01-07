import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { searchPublic, selectSearch } from '@/shared/stores/searchSlice';
import { useContext, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SearchBanner() {
    const { t } = useTranslation();
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { publicResults, loading } = useAppSelector(selectSearch);
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('d');
    const [showResults, setShowResults] = useState(false);
    const debouncedKeyword = useDebounce(keyword, 500);
    const searchRef = useRef<HTMLDivElement>(null);

    const slugify = (text: string) =>
        text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

    const handleNavigateToDetail = (id: string, type: string) => {
        let path = '';
        if (type === t('homePage.dt')) {
            path = `/bac-si/${slugify(keyword)}/${id}`;
        } else if (type === t('homePage.sp')) {
            path = `/chuyen-khoa/${slugify(keyword)}/${id}`;
        } else if (type === t('homePage.sv')) {
            path = `/dich-vu/${slugify(keyword)}/${id}`;
        }
        navigate(path);
    };

    useEffect(() => {
        if (!debouncedKeyword.trim()) {
            setShowResults(false);
            return;
        }

        const fetchApi = async () => {
            await dispatch(
                searchPublic({
                    q: debouncedKeyword,
                    page: 1,
                    limit: 5
                })
            );
            setShowResults(true);
        };

        fetchApi();
    }, [debouncedKeyword, dispatch]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowResults(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderResultItem = (title: string, items: any[]) => {
        if (!items || items.length === 0) return null;
        return (
            <div className='mb-2'>
                <h4
                    className={`px-4 py-1 text-xs font-bold uppercase ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                >
                    {title}
                </h4>
                <ul>
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className={`px-4 py-2 cursor-pointer flex items-center gap-5 ${
                                isDark
                                    ? 'hover:bg-gray-700'
                                    : 'hover:bg-gray-100'
                            }`}
                            onClick={() =>
                                handleNavigateToDetail(item.id, title)
                            }
                        >
                            <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xs'>
                                <img
                                    src={
                                        item.image
                                            ? item.image.startsWith('http')
                                                ? item.image
                                                : BACKEND_URL + item.image
                                            : ''
                                    }
                                    alt={item.user?.name}
                                    className='w-full object-cover sm:rounded-none mx-auto border border-gray-100'
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            'https://via.placeholder.com/150';
                                    }}
                                />
                            </div>
                            <div>
                                <p
                                    className={`text-sm font-medium ${
                                        isDark ? 'text-white' : 'text-gray-800'
                                    }`}
                                >
                                    {item.name || item.user?.name}
                                </p>
                                {item.specialty && (
                                    <p className='text-xs text-blue-500 text-left'>
                                        {item.specialty.name}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div
            className={`flex justify-between px-20 w-screen py-5 ${
                isDark ? 'bg-gray-900 text-white' : 'bg-blue-100 text-black'
            }`}
        >
            <div className='flex flex-col items-center justify-center text-center gap-4 w-full'>
                <p
                    className={`text-5xl font-bold ${
                        isDark ? 'text-blue-300' : 'text-blue-500'
                    }`}
                >
                    {t('homePage.sd')}
                </p>
                <p
                    className={`text-4xl font-bold ${
                        isDark ? 'text-white' : 'text-black'
                    }`}
                >
                    {t('homePage.map')}
                </p>
                <p
                    className={`text-xl ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                    {t('homePage.subSB')}
                </p>

                <div
                    className='relative w-full max-w-xl flex z-50'
                    ref={searchRef}
                >
                    <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger
                            className={`w-50 rounded-none border-none focus:outline-none shadow-none focus-visible:ring-0 h-10 md:h-15 transition-colors focus:ring-0 px-5 cursor-pointer ${
                                isDark
                                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                                    : 'bg-white hover:bg-gray-100'
                            }`}
                        >
                            <SelectValue placeholder={t('homePage.sb')} />
                        </SelectTrigger>
                        <SelectContent
                            className={`border-none rounded-none ${
                                isDark ? 'bg-gray-800 text-white' : 'bg-white'
                            }`}
                        >
                            <SelectGroup>
                                <SelectItem
                                    value='d'
                                    className={`cursor-pointer transition-colors rounded-none ${
                                        isDark
                                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                                            : 'bg-white hover:bg-gray-100'
                                    }`}
                                >
                                    {t('homePage.dt')}
                                </SelectItem>
                                <SelectItem
                                    value='s'
                                    className={`cursor-pointer transition-colors rounded-none ${
                                        isDark
                                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                                            : 'bg-white hover:bg-gray-100'
                                    }`}
                                >
                                    {t('homePage.sv')}
                                </SelectItem>
                                <SelectItem
                                    value='sp'
                                    className={`cursor-pointer transition-colors rounded-none ${
                                        isDark
                                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                                            : 'bg-white hover:bg-gray-100'
                                    }`}
                                >
                                    {t('homePage.sp')}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Input
                        type='search'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={() => {
                            if (keyword) setShowResults(true);
                        }}
                        className={`h-10 md:h-15 rounded-none border-none focus:outline-none focus-visible:ring-0 ${
                            isDark
                                ? 'bg-gray-800 text-white placeholder-gray-400'
                                : 'bg-white'
                        }`}
                    />

                    {showResults && (
                        <div
                            className={`absolute top-full left-0 right-0 mt-2 shadow-xl overflow-hidden max-h-96 overflow-y-auto ${
                                isDark
                                    ? 'bg-gray-800 border border-gray-700'
                                    : 'bg-white border border-gray-200'
                            }`}
                        >
                            {loading ? (
                                <div className='p-4 text-center text-gray-500'>
                                    Searching...
                                </div>
                            ) : (
                                <>
                                    {publicResults.doctorCount === 0 &&
                                        publicResults.specialtyCount === 0 &&
                                        publicResults.serviceCount === 0 && (
                                            <div className='p-4 text-center text-gray-500'>
                                                No results found.
                                            </div>
                                        )}

                                    {(searchType === 'd' ||
                                        searchType === 'all') &&
                                        renderResultItem(
                                            t('homePage.dt'),
                                            publicResults.doctors
                                        )}
                                    {(searchType === 'sp' ||
                                        searchType === 'all') &&
                                        renderResultItem(
                                            t('homePage.sp'),
                                            publicResults.specialties
                                        )}
                                    {(searchType === 's' ||
                                        searchType === 'all') &&
                                        renderResultItem(
                                            t('homePage.sv'),
                                            publicResults.services
                                        )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className='p-10 hidden md:block'>
                <img
                    src='https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600nw-2481032615.jpg'
                    className='rounded-full'
                    alt='Doctor'
                />
            </div>
        </div>
    );
}
