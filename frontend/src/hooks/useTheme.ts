import { useState } from "react";

type ThemeMode = "Light" | "Dark"

/** 
 * Hook to change the background theme.
 *  - Takes only these parameters
 *      1. `Light`: Changes background to **Morning** desk picture.
 *      2. `Dark`: Changes background to **Night** desk picture.  
*/
export function useTheme(initialTheme:ThemeMode = "Light"){
    const [theme, setTheme] = useState<ThemeMode>(initialTheme);
    const toggleTheme = () => setTheme(theme === "Light" ? "Dark": "Light");
    return { theme, toggleTheme }
}