import React, {useLayoutEffect, useState} from 'react'

type Theme = 'light' | 'dark';

interface UseThemeReturn {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const useTheme = (): UseThemeReturn => {
    const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme: Theme = isDarkTheme ? 'dark' : 'light';

    const [theme, setTheme] = useState<Theme>(
        (localStorage.getItem('app-theme') as Theme) || defaultTheme
    );

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    return {theme, setTheme};
};
