import { ConfigProvider } from 'antd';
import React, { useEffect, useState } from 'react';

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });

    useEffect(() => {
        const html = document.querySelector('html');
        if (isDark) {
            html?.classList.add('dark');
        } else {
            html?.classList.remove('dark');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    function toggleTheme() {
        setIsDark((prev) => !prev);
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 14,
                        lineHeight: 1.5714285714285714,
                        fontWeightStrong: 600,
                        borderRadius: 0,
                        colorText: isDark ? '#F3F4F6' : '#1A1A1A',
                        colorIcon: isDark ? '#F3F4F6' : '#1A1A1A',
                        colorTextHeading: isDark ? '#D1D5DB' : '#1A1A1A',
                        colorTextDisabled: isDark ? '#D1D5DB' : '#1A1A1A',
                        colorPrimary: isDark ? '#3B82F6' : '#1677FF',
                        colorBorder: isDark ? '#3B82F6' : '#0D6EFD',
                        controlItemBgActive: isDark ? '#1F2937' : '#E6F4FF',
                        controlItemBgHover: isDark
                            ? '#374151'
                            : 'rgba(0,0,0,0.04)',
                        padding: 16,
                        paddingSM: 12,
                        paddingXS: 8,
                        screenXS: 480
                    },
                    components: {
                        Layout: {
                            headerBg: isDark ? '#111827' : '#FFFFFF',
                            siderBg: isDark ? '#111827' : '#FFFFFF',
                            bodyBg: isDark ? '#1F2937' : '#F8F9FA'
                        },
                        Menu: {
                            colorBgContainer: isDark ? '#111827' : '#FFFFFF',
                            itemBg: isDark ? '#111827' : '#FFFFFF',
                            itemColor: isDark ? '#F3F4F6' : '#1A1A1A',
                            itemHoverColor: isDark ? '#F3F4F6' : '#000000'
                        },
                        Dropdown: {
                            colorBgElevated: isDark ? '#1F2937' : '#F8F9FA',
                            colorText: isDark ? '#F3F4F6' : '#1A1A1A',
                            controlItemBgHover: isDark ? '#374151' : '#F5F5F5'
                        },
                        Avatar: {
                            colorText: isDark ? '#F3F4F6' : '#1A1A1A'
                        },
                        Button: {
                            colorBgContainer: isDark ? '#374151' : '#1677FF',
                            colorText: isDark ? '#F3F4F6' : '#FFFFFF',
                            colorBorder: isDark ? '#3B82F6' : '#0D6EFD'
                        },
                        Input: {
                            colorBgContainer: isDark ? '#374151' : '#FFFFFF',
                            colorText: isDark ? '#F3F4F6' : '#1A1A1A',
                            colorBorder: isDark ? '#3B82F6' : '#E1E1E1',
                            colorBgElevated: isDark ? '#1F2937' : '#FFFFFF'
                        },
                        Select: {
                            colorBgContainer: isDark ? '#374151' : '#FFFFFF',
                            colorText: isDark ? '#F3F4F6' : '#1A1A1A',
                            colorBorder: isDark ? '#3B82F6' : '#E1E1E1',
                            colorBgElevated: isDark ? '#1F2937' : '#FFFFFF',
                            optionSelectedBg: isDark ? '#374151' : '#F3F4F6'
                        },
                        Table: {
                            colorBgContainer: isDark ? '#374151' : '#FFFFFF',
                            colorText: isDark ? '#F3F4F6' : '#1A1A1A',
                            colorTextHeading: isDark ? '#F3F4F6' : '#000000',
                            borderColor: isDark ? '#3B82F6' : '#0D6EFD'
                        },
                        Pagination: {
                            colorBgContainer: isDark ? '#1F2937' : '#FFFFFF'
                        },
                        Modal: {
                            colorBgElevated: isDark ? '#1F2937' : '#FFFFFF',
                            colorTextHeading: isDark ? '#F3F4F6' : '#000000',
                            colorBorder: isDark ? '#3B82F6' : '#0D6EFD'
                        },
                        DatePicker: {
                            colorBgContainer: isDark ? '#374151' : '#FFFFFF',
                            colorBgElevated: isDark ? '#1F2937' : '#FFFFFF',
                            colorBorder: isDark ? '#3B82F6' : '#E1E1E1',
                            colorText: isDark ? '#F3F4F6' : '#1A1A1A',
                            colorTextHeading: isDark ? '#D1D5DB' : '#1A1A1A',
                            controlItemBgHover: isDark ? '#374151' : '#F5F5F5',
                            cellRangeBorderColor: isDark ? '#3B82F6' : '#0D6EFD'
                        },
                        Calendar: {
                            fullBg: isDark ? '#1F2937' : '#FFFFFF',
                            fullPanelBg: isDark ? '#374151' : '#F8F9FA',
                            itemActiveBg: isDark ? '#1F2937' : '#E6F4FF'
                        },
                        Checkbox: {
                            colorBorder: isDark ? '#3B82F6' : '#0D6EFD',
                            colorBgContainer: isDark ? '#1F2937' : '#FFFFFF',
                            colorText: isDark ? '#F3F4F6' : '#1A1A1A'
                        }
                    }
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
}
