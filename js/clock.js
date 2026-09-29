document.addEventListener("DOMContentLoaded", () => {
    const clock = document.getElementById("clock");
    const date = document.getElementById("date");

    if (!clock || !date) {
        return;
    }

    const weekdays = {
        ja: ["日", "月", "火", "水", "木", "金", "土"],
        en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    };

    function getSettings() {
        return {
            language:
                localStorage.getItem("language") || "ja",

            showSeconds:
                localStorage.getItem("showSeconds") !== "false",

            twentyFourHour:
                localStorage.getItem("twentyFourHour") !== "false"
        };
    }

    function updateClock() {
        const now = new Date();
        const settings = getSettings();

        let hours = now.getHours();

        let period = "";

        if (settings.twentyFourHour) {
            hours = String(hours).padStart(2, "0");
        } else {
            period = now.getHours() >= 12
                ? "PM"
                : "AM";

            hours = now.getHours() % 12;

            if (hours === 0) {
                hours = 12;
            }

            hours = String(hours).padStart(2, "0");
        }

        const minutes = String(
            now.getMinutes()
        ).padStart(2, "0");

        const seconds = String(
            now.getSeconds()
        ).padStart(2, "0");

        let time = "";

        if (!settings.twentyFourHour) {
            time += `${period} `;
        }

        time += `${hours}:${minutes}`;

        if (settings.showSeconds) {
            time += `:${seconds}`;
        }

        clock.textContent = time;

        const month = now.getMonth() + 1;
        const day = now.getDate();

        if (settings.language === "ja") {
            date.textContent =
                `${month}/${day} (${weekdays.ja[now.getDay()]})`;
        } else {
            date.textContent =
                `${month}/${day} (${weekdays.en[now.getDay()]})`;
        }
    }

    updateClock();

    setInterval(updateClock, 1000);

    window.addEventListener(
        "smart-display-settings-changed",
        updateClock
    );
});