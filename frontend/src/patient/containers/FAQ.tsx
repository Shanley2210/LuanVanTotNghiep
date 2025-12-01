import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
    const { isDark } = useContext(ThemeContext);
    const { t } = useTranslation();

    return (
        <div className='w-screen'>
            <div
                className={`
                    p-4 lg:p-20 flex flex-col items-center
                    ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
                `}
            >
                <h1
                    className={`
                        rounded-none px-3 py-1 uppercase tracking-wide
                        ${
                            isDark
                                ? 'bg-blue-400 text-black'
                                : 'bg-blue-500 text-white'
                        }
                    `}
                >
                    FAQ'S
                </h1>

                <h2 className='text-3xl font-bold p-5 text-center mb-6'>
                    {t('homePage.yqa')}
                </h2>

                <div className='w-full max-w-5xl'>
                    <Accordion type='single' collapsible className='w-full'>
                        <AccordionItem
                            value='item-1'
                            className={
                                isDark
                                    ? 'border-b border-gray-700'
                                    : 'border-b border-gray-200'
                            }
                        >
                            <AccordionTrigger
                                className={`
                                    cursor-pointer text-xl font-medium transition-colors hover:no-underline
                                    ${
                                        isDark
                                            ? 'hover:text-blue-300 data-[state=open]:text-blue-300'
                                            : 'hover:text-blue-600 data-[state=open]:text-blue-600'
                                    }
                                `}
                            >
                                {t('homePage.howd')}
                            </AccordionTrigger>
                            <AccordionContent
                                className={`
                                    text-lg leading-relaxed
                                    ${
                                        isDark
                                            ? 'text-gray-300'
                                            : 'text-gray-600'
                                    }
                                `}
                            >
                                {t('homePage.ahowd')}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value='item-2'
                            className={
                                isDark
                                    ? 'border-b border-gray-700'
                                    : 'border-b border-gray-200'
                            }
                        >
                            <AccordionTrigger
                                className={`
                                    cursor-pointer text-xl font-medium transition-colors hover:no-underline
                                    ${
                                        isDark
                                            ? 'hover:text-blue-300 data-[state=open]:text-blue-300'
                                            : 'hover:text-blue-600 data-[state=open]:text-blue-600'
                                    }
                                `}
                            >
                                {t('homePage.qci')}
                            </AccordionTrigger>
                            <AccordionContent
                                className={`
                                    text-lg leading-relaxed
                                    ${
                                        isDark
                                            ? 'text-gray-300'
                                            : 'text-gray-600'
                                    }
                                `}
                            >
                                {t('homePage.aci')}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value='item-3'
                            className={
                                isDark
                                    ? 'border-b border-gray-700'
                                    : 'border-b border-gray-200'
                            }
                        >
                            <AccordionTrigger
                                className={`
                                    cursor-pointer text-xl font-medium transition-colors hover:no-underline
                                    ${
                                        isDark
                                            ? 'hover:text-blue-300 data-[state=open]:text-blue-300'
                                            : 'hover:text-blue-600 data-[state=open]:text-blue-600'
                                    }
                                `}
                            >
                                {t('homePage.qsra')}
                            </AccordionTrigger>
                            <AccordionContent
                                className={`
                                    text-lg leading-relaxed
                                    ${
                                        isDark
                                            ? 'text-gray-300'
                                            : 'text-gray-600'
                                    }
                                `}
                            >
                                {t('homePage.asra')}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value='item-4'
                            className={
                                isDark
                                    ? 'border-b border-gray-700'
                                    : 'border-b border-gray-200'
                            }
                        >
                            <AccordionTrigger
                                className={`
                                    cursor-pointer text-xl font-medium transition-colors hover:no-underline
                                    ${
                                        isDark
                                            ? 'hover:text-blue-300 data-[state=open]:text-blue-300'
                                            : 'hover:text-blue-600 data-[state=open]:text-blue-600'
                                    }
                                `}
                            >
                                {t('homePage.qrl')}
                            </AccordionTrigger>
                            <AccordionContent
                                className={`
                                    text-lg leading-relaxed
                                    ${
                                        isDark
                                            ? 'text-gray-300'
                                            : 'text-gray-600'
                                    }
                                `}
                            >
                                {t('homePage.arl')}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value='item-5'
                            className={
                                isDark
                                    ? 'border-b border-gray-700'
                                    : 'border-b border-gray-200'
                            }
                        >
                            <AccordionTrigger
                                className={`
                                    cursor-pointer text-xl font-medium transition-colors hover:no-underline
                                    ${
                                        isDark
                                            ? 'hover:text-blue-300 data-[state=open]:text-blue-300'
                                            : 'hover:text-blue-600 data-[state=open]:text-blue-600'
                                    }
                                `}
                            >
                                {t('homePage.qcf')}
                            </AccordionTrigger>
                            <AccordionContent
                                className={`
                                    text-lg leading-relaxed
                                    ${
                                        isDark
                                            ? 'text-gray-300'
                                            : 'text-gray-600'
                                    }
                                `}
                            >
                                {t('homePage.acf')}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
