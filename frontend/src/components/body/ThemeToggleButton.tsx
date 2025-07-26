interface ToggleProps{
    theme: string
    toggleTheme: () => void
};

export default function ThemeToggleButton(
    { 
        theme, 
        toggleTheme 
    }: ToggleProps
) {
    return (

        <button
          className="
            bg-white/70 py-3 px-6
            rounded-2xl
            hover:cursor-pointer hover:scale-110 hover:bg-white hover:shadow-md hover:shadow-black/65
            font-bold
            transition-all ease-in
            mt-5
          "
          onClick={toggleTheme}
        >
            {theme==="Light" ? "Dark": "Light"} Mode
        </button>

    );
}

