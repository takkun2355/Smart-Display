document.addEventListener("DOMContentLoaded", () => {
    const languageSetting =
        document.getElementById("language-setting");

    const secondsSetting =
        document.getElementById("seconds-setting");

    const twentyFourHourSetting =
        document.getElementById(
            "twenty-four-hour-setting"
        );

    const translations = {
        ja: {
            home: "ホーム",
            weather: "天気",
            calendar: "カレンダー",
            news: "ニュース",
            browser: "ブラウザ",
            tools: "ツール",
            settings: "設定",

            weeklyWeather: "週間天気",

            language: "言語",
            languageDescription:
                "表示言語を変更します",

            showSeconds: "秒数表示",
            showSecondsDescription:
                "時計に秒数を表示します",

            twentyFourHour: "24時間表記",
            twentyFourHourDescription:
                "24時間制で時刻を表示します",

            eventExample: "GCI Basic 講義"
        },

        en: {
            home: "Home",
            weather: "Weather",
            calendar: "Calendar",
            news: "News",
            browser: "Browser",
            tools: "Tools",
            settings: "Settings",

            weeklyWeather: "Weekly Weather",

            language: "Language",
            languageDescription:
                "Change the display language",

            showSeconds: "Show Seconds",
            showSecondsDescription:
                "Show seconds on the clock",

            twentyFourHour: "24-Hour Format",
            twentyFourHourDescription:
                "Use the 24-hour time format",

            eventExample: "GCI Basic Lecture"
        }
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

    function applyLanguage(language) {
        const dictionary =
            translations[language] || translations.ja;

        document.documentElement.lang = language;

        document
            .querySelectorAll("[data-i18n]")
            .forEach((element) => {
                const key = element.dataset.i18n;

                if (dictionary[key]) {
                    element.textContent =
                        dictionary[key];
                }
            });
    }

    function loadSettings() {
        const settings = getSettings();

        languageSetting.value =
            settings.language;

        secondsSetting.checked =
            settings.showSeconds;

        twentyFourHourSetting.checked =
            settings.twentyFourHour;

        applyLanguage(settings.language);
    }

    languageSetting.addEventListener(
        "change",
        () => {
            localStorage.setItem(
                "language",
                languageSetting.value
            );

            applyLanguage(
                languageSetting.value
            );

            window.dispatchEvent(
                new Event(
                    "smart-display-settings-changed"
                )
            );
        }
    );

    secondsSetting.addEventListener(
        "change",
        () => {
            localStorage.setItem(
                "showSeconds",
                String(secondsSetting.checked)
            );

            window.dispatchEvent(
                new Event(
                    "smart-display-settings-changed"
                )
            );
        }
    );

    twentyFourHourSetting.addEventListener(
        "change",
        () => {
            localStorage.setItem(
                "twentyFourHour",
                String(
                    twentyFourHourSetting.checked
                )
            );

            window.dispatchEvent(
                new Event(
                    "smart-display-settings-changed"
                )
            );
        }
    );

    loadSettings();
});