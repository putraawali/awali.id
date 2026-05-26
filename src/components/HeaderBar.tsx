import type { Lang, Translation } from "../data/content";

interface HeaderBarProps {
    lang: Lang;
    onChangeLang: (lang: Lang) => void;
    t: Translation;
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

export function HeaderBar({ lang, onChangeLang, t }: HeaderBarProps) {
    return (
        <header
            id="main-header"
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-container-padding-mb md:px-container-padding-dt border-b border-transparent bg-transparent py-stack-sm"
        >
            <div className="text-headline-md font-headline-md font-extrabold tracking-tighter text-on-surface">
                Awali.
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
