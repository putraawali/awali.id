import type { Lang, Translation } from "../data/content";
import AwaliLogoLightMode from "../assets/long_awali_removed_bg.png";
import AwaliLogoDarkMode from "../assets/long_awali_dark_mode_removed_bg_ractangle.png";

interface HeaderBarProps {
    lang: Lang;
    onChangeLang: (lang: Lang) => void;
    t: Translation;
    theme: "light" | "dark";
    onChangeTheme: (theme: "light" | "dark") => void;
}

const supportButtonClass = [
    "glass-card",
    "flex",
    "items-center",
    "gap-2",
    "px-4",
    "py-2",
    "rounded-full",
    "text-label-bold",
    "font-label-bold",
    "text-on-surface",
    "hover:bg-white/60",
    "transition-all",
    "duration-300",
    "active:scale-95",
    "group",
    "shadow-sm",
].join(" ");

export function HeaderBar({
    lang,
    onChangeLang,
    t,
    theme,
    onChangeTheme,
}: HeaderBarProps) {
    const cycleTheme = () => {
        onChangeTheme(theme === "light" ? "dark" : "light");
    };

    const getThemeIcon = () => {
        return theme === "light" ? "light_mode" : "dark_mode";
    };

    const getThemeTitle = () => {
        return theme === "light" ? t.themeLight : t.themeDark;
    };

    return (
        <header
            id="main-header"
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-container-padding-mb md:px-container-padding-dt border-b border-transparent bg-transparent py-stack-sm"
        >
            <div className="text-headline-md font-headline-md font-extrabold tracking-tighter text-on-surface">
                <img
                    src={AwaliLogoLightMode}
                    alt="Awali Logo"
                    className="block dark:hidden h-12 w-auto object-contain"
                />

                <img
                    src={AwaliLogoDarkMode}
                    alt="Awali Logo"
                    className="hidden dark:block h-12 w-auto object-contain"
                />
            </div>
            <div className="flex items-center gap-3">
                <div className="glass-card flex p-1 rounded-full items-center text-label-sm font-label-bold overflow-hidden shadow-sm">
                    <button
                        type="button"
                        className={
                            lang === "en"
                                ? "px-3 py-1.5 rounded-full transition-all duration-300 bg-primary text-white"
                                : "px-3 py-1.5 rounded-full transition-all duration-300 text-on-surface hover:bg-white/40"
                        }
                        onClick={() => onChangeLang("en")}
                    >
                        EN
                    </button>
                    <button
                        type="button"
                        className={
                            lang === "id"
                                ? "px-3 py-1.5 rounded-full transition-all duration-300 bg-primary text-white"
                                : "px-3 py-1.5 rounded-full transition-all duration-300 text-on-surface hover:bg-white/40"
                        }
                        onClick={() => onChangeLang("id")}
                    >
                        ID
                    </button>
                </div>
                <button
                    type="button"
                    onClick={cycleTheme}
                    className="glass-card flex items-center justify-center w-10 h-10 rounded-full text-on-surface hover:bg-white/40 dark:hover:bg-white/10 active:scale-95 transition-all duration-300 shadow-sm relative group"
                    title={getThemeTitle()}
                    id="theme-toggle-btn"
                >
                    <span className="material-symbols-outlined text-[20px] theme-icon-transition">
                        {getThemeIcon()}
                    </span>
                </button>
                <a
                    className={supportButtonClass}
                    href="https://saweria.co/putraawali"
                    id="support-btn"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span className="material-symbols-outlined text-[18px] text-tertiary group-hover:animate-bounce">
                        coffee
                    </span>
                    <span className="hidden sm:inline" id="support-text">
                        {t.supportBtn}
                    </span>
                </a>
            </div>
        </header>
    );
}
