import { useEffect, useState } from "react";
import "./App.css";
import { HeaderBar } from "./components/HeaderBar";
import { translations } from "./data/content";
import { Toast } from "./components/Toast";
import { BackgroundWave } from "./components/BackgroundWave";
import { HeroSection } from "./components/HeroSection";
import { ToolCard } from "./components/ToolCard";

function App() {
    const [lang, setLang] = useState<"en" | "id">("en");
    const [isLangExiting, setIsLangExiting] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: "" });
    const t = translations[lang] as typeof translations.en;

    useEffect(() => {
        const header = document.getElementById("main-header");
        const onScroll = () => {
            if (!header) return;
            if (window.scrollY > 20) {
                header.classList.add("scrolled", "shadow-sm", "py-4");
                header.classList.remove("bg-transparent", "py-stack-sm");
            } else {
                header.classList.remove("scrolled", "shadow-sm", "py-4");
                header.classList.add("bg-transparent", "py-stack-sm");
            }
        };

        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const ids = [
            "hero-content",
            "url-view",
            "qr-view",
            "tab-container-new",
        ];
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
                el.style.opacity = "0";
                el.style.transform = "translateY(10px)";
            }
        });

        const timeout = window.setTimeout(() => {
            ids.forEach((id) => {
                const el = document.getElementById(id);
                if (el) {
                    el.style.transition =
                        "opacity 0.3s ease, transform 0.3s ease";
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }
            });
        }, 30);

        return () => window.clearTimeout(timeout);
    }, [lang]);

    const handleLangChange = (language: "en" | "id") => {
        if (language === lang) return;

        setIsLangExiting(true);
        setLang(language);
        window.setTimeout(() => {
            setIsLangExiting(false);
        }, 350);
    };

    const showToast = (message: string) => {
        setToast({ visible: true, message });
        window.setTimeout(() => {
            setToast({ visible: false, message: "" });
        }, 3000);
    };

    return (
        <div className="relative z-10 min-h-[100vh] overflow-x-hidden font-sans">
            <BackgroundWave />
            <HeaderBar lang={lang} onChangeLang={handleLangChange} t={t} />
            <main
                className={`min-h-screen flex flex-col md:flex-row pt-20 relative z-10 lang-transition ${
                    isLangExiting ? "lang-exit" : ""
                }`}
                id="main-content"
            >
                <HeroSection t={t} />

                <ToolCard t={t} lang={lang} showToast={showToast} />
            </main>

            <Toast visible={toast.visible} message={toast.message} />
        </div>
    );
}

export default App;
