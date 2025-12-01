import { Button } from '@/components/ui/button';
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
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

export default function SearchBanner() {
    const { t } = useTranslation();
    const { isDark } = useContext(ThemeContext);

    return (
        <div
            className={`
        flex justify-between px-20 w-screen py-5
        ${isDark ? 'bg-gray-900 text-white' : 'bg-blue-100 text-black'}
    `}
        >
            <div className='flex flex-col items-center justify-center text-center gap-4'>
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

                <div className='relative w-full max-w-xl flex'>
                    <Select>
                        <SelectTrigger
                            className={`
                        w-50 rounded-l-4xl rounded-r-none h-10 md:h-15 border-none transition-colors focus:ring-0 px-5
                        ${
                            isDark
                                ? 'bg-gray-800 text-white hover:bg-gray-700'
                                : 'bg-white hover:bg-gray-100'
                        }
                    `}
                        >
                            <SelectValue placeholder={t('homePage.sb')} />
                        </SelectTrigger>

                        <SelectContent
                            className={`
                        border-none
                        ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}
                    `}
                        >
                            <SelectGroup>
                                <SelectItem value='d'>
                                    {t('homePage.dt')}
                                </SelectItem>
                                <SelectItem value='s'>
                                    {t('homePage.sv')}
                                </SelectItem>
                                <SelectItem value='sp'>
                                    {t('homePage.sp')}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Input
                        type='search'
                        className={`
                    h-10 md:h-15 rounded-none border-none focus:outline-none focus-visible:ring-0
                    ${
                        isDark
                            ? 'bg-gray-800 text-white placeholder-gray-400'
                            : 'bg-white'
                    }
                `}
                    />

                    <Button
                        className={`
                    rounded-l-none rounded-r-4xl h-10 md:h-15 border-none cursor-pointer transition-colors px-5
                    ${
                        isDark
                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                            : 'bg-white hover:bg-gray-100'
                    }
                `}
                    >
                        Search
                    </Button>
                </div>
            </div>

            <div className='p-10 hidden md:block'>
                <img
                    src='https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600nw-2481032615.jpg'
                    className='rounded-full'
                />
            </div>
        </div>
    );
}
