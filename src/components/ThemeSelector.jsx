import { useState } from "react";
import api from "../api/axios";
import "../styles/ThemeSelector.css";

function ThemeSelector() {

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "LIGHT"
    );

    const changeTheme = async (selectedTheme) => {

        try {

            const userId =
                localStorage.getItem("userId");

            await api.put(
                `/users/${userId}/theme`,
                {
                    theme: selectedTheme
                }
            );

            localStorage.setItem(
                "theme",
                selectedTheme
            );

            setTheme(selectedTheme);

            window.location.reload();

        } catch (error) {

            console.error(error);

            alert("Unable to update theme.");
        }
    };

    return (

        <select
            className="theme-select"
            value={theme}
            onChange={(e) =>
                changeTheme(
                    e.target.value
                )
            }
        >
            <option value="LIGHT">
                🌞 Light
            </option>

            <option value="DARK">
                🌙 Dark
            </option>

            <option value="ADMIN">
                💼 Admin
            </option>

        </select>

    );
}

export default ThemeSelector;