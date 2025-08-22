import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ThemeMode = "Light" | "Dark"

type ThemeState = {
    theme: ThemeMode
}

type ThemeActions = {
    toggleTheme: () => void
    setTheme: (theme: ThemeMode) => void
}

export const useThemeStore = create<ThemeState & ThemeActions>()(
    devtools(
        persist(
            (set, get) => ({
                // Initial state
                theme: "Light",
                
                // Actions
                toggleTheme: () => {
                    const currentTheme = get().theme;
                    const newTheme = currentTheme === "Light" ? "Dark" : "Light";
                    
                    set({ theme: newTheme });
                    
                    if (newTheme === "Dark") {
                        document.documentElement.classList.add("dark");
                    } else {
                        document.documentElement.classList.remove("dark");
                    }
                },
                
                setTheme: (theme: ThemeMode) => {
                    set({ theme });
                    
                    if (theme === "Dark") {
                        document.documentElement.classList.add("dark");
                    } else {
                        document.documentElement.classList.remove("dark");
                    }
                }
            }),
            {
                name: "theme-storage", // Key in localStorage
            }
            
        )
    )
);