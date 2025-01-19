import { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { Colors } from "@/constants/Colors";

export const ThemeContext = createContext({
    colorScheme: Appearance.getColorScheme(),
    setColorScheme: () => {},
    theme: Appearance.getColorScheme() === "dark" ? Colors.dark : Colors.light
});


export const ThemeProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
            setColorScheme(newColorScheme);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const theme = colorScheme === "dark"
        ? Colors.dark
        : Colors.light;

    return (
        <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
            {children}
        </ThemeContext.Provider>
    )
}