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

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');

        return saved === 'dark' ? true : false;
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

    const handleToggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    return (
        <ThemeContext.Provider
            value={{ isDark, toggleTheme: handleToggleTheme }}
        >
            <ConfigProvider
                theme={{
                    components: {
                        Layout: {
                            headerBg: isDark ? '#001529' : '#fff',
                            siderBg: isDark ? '#001529' : '#fff',
                            bodyBg: isDark ? '#001529' : '#fff'
                        }
                    }
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};
