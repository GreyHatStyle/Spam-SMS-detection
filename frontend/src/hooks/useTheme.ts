import { useThemeStore } from "../store/useThemeStore";

type ThemeMode = "Light" | "Dark"

/** 
 * Hook to change the background theme.
 *  - Takes only these parameters
 *      1. `Light`: Changes background to **Morning** desk picture.
 *      2. `Dark`: Changes background to **Night** desk picture.  
*/
export function useTheme() {
    const theme: ThemeMode = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const setTheme = useThemeStore((state) => state.setTheme);
    
    return { theme, toggleTheme, setTheme };
}