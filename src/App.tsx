import { useEffect, useMemo, useState } from "react";
import "./App.css";

const translations = {
    en: {
        headline: "Awali. Shorter links, better starts.",
        subheadline:
            "Create clean, memorable links and instant QR codes in seconds. Enhance your digital footprint with precision-engineered tools.",
        urlLabel: "Paste your long URL here...",
        aliasLabel: "Custom Alias (Optional)",
        shortenBtn: "Shorten",
        qrTab: "QR Code",
        urlTab: "Shorten URL",
        supportBtn: "Buy me a coffee",
        qrInputLabel: "Enter URL for QR code...",
        generateQrBtn: "Generate QR Code",
        shortLinkName: "Your short link",
        copy: "Copy",
        uptime: "Uptime",
        support: "Support",
        cdns: "CDNs",
        toastSuccess: "Link shortened successfully!",
        toastQrSuccess: "QR Code generated!",
        creating: "Creating...",
        generating: "Generating...",
        previewReady: "Preview ready",
    },
    id: {
        headline: "Awali. Link lebih singkat, awal yang lebih baik.",
        subheadline:
            "Buat tautan bersih, mudah diingat, dan kode QR instan dalam hitungan detik. Tingkatkan jejak digital Anda dengan alat yang presisi.",
        urlLabel: "Tempel URL panjang Anda di sini...",
        aliasLabel: "Alias Kustom (Opsional)",
        shortenBtn: "Perpendek",
        qrTab: "Kode QR",
        urlTab: "Perpendek URL",
        supportBtn: "Dukung saya",
        qrInputLabel: "Masukkan URL untuk kode QR...",
        generateQrBtn: "Buat Kode QR",
        shortLinkName: "Tautan pendek Anda",
        copy: "Salin",
        uptime: "Aktif",
        support: "Dukungan",
        cdns: "CDN",
        toastSuccess: "Tautan berhasil diperpendek!",
        toastQrSuccess: "Kode QR berhasil dibuat!",
        creating: "Membuat...",
        generating: "Memproses...",
        previewReady: "Pratinjau siap",
    },
} as const;

const placeholders = {
    en: {
        url: "https://example.com/very-long-and-complex-path",
        alias: "my-custom-link",
    },
    id: {
        url: "https://contoh.com/jalur-yang-sangat-panjang",
        alias: "tautan-kustom-saya",
    },
};

function App() {
    const [lang, setLang] = useState<"en" | "id">("en");
    const [tab, setTab] = useState<"url" | "qr">("url");
    const [urlInput, setUrlInput] = useState("");
    const [aliasInput, setAliasInput] = useState("");
    const [qrInput, setQrInput] = useState("");
    const [urlError, setUrlError] = useState(false);
    const [qrError, setQrError] = useState(false);
    const [resultVisible, setResultVisible] = useState(false);
    const [copyLabel, setCopyLabel] = useState<string>(translations[lang].copy);
    const [toast, setToast] = useState({ visible: false, message: "" });
    const [qrPreviewReady, setQrPreviewReady] = useState(false);
    const [shortenLoading, setShortenLoading] = useState(false);
    const [generateLoading, setGenerateLoading] = useState(false);

    const t = translations[lang];
    const urlPlaceholder = placeholders[lang].url;
    const aliasPlaceholder = placeholders[lang].alias;

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

    useEffect(() => {
        setCopyLabel(t.copy);
    }, [lang, t.copy]);

    const supportButtonClass = useMemo(
        () =>
            [
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
            ].join(" "),
        [],
    );

    const showToast = (message: string) => {
        setToast({ visible: true, message });
        window.setTimeout(() => {
            setToast({ visible: false, message: "" });
        }, 3000);
    };

    const handleShorten = () => {
        if (urlInput.trim() === "") {
            setUrlError(true);
            setTimeout(() => setUrlError(false), 1000);
            return;
        }

        setShortenLoading(true);
        setTimeout(() => {
            setShortenLoading(false);
            setResultVisible(true);
            showToast(t.toastSuccess);
        }, 800);
    };

    const handleGenerateQr = () => {
        if (qrInput.trim() === "") {
            setQrError(true);
            setTimeout(() => setQrError(false), 1000);
            return;
        }

        setGenerateLoading(true);
        setTimeout(() => {
            setGenerateLoading(false);
            setQrPreviewReady(true);
            showToast(t.toastQrSuccess);
        }, 800);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("https://lnk.co/xY7z2");
            setCopyLabel("Copied");
            window.setTimeout(() => setCopyLabel(t.copy), 1200);
        } catch {
            setCopyLabel("Copied");
            window.setTimeout(() => setCopyLabel(t.copy), 1200);
        }
    };

    return (
        <div className="relative z-10 min-h-[100vh] overflow-x-hidden font-sans">
            <div className="animated-wave-bg"></div>
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
                            onClick={() => setLang("en")}
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
                            onClick={() => setLang("id")}
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

            <main className="min-h-screen flex flex-col md:flex-row pt-20 relative z-10">
                <section className="w-full md:w-1/2 flex flex-col justify-center px-container-padding-mb md:px-container-padding-dt py-stack-lg space-y-stack-md">
                    <div className="max-w-xl lang-transition" id="hero-content">
                        <h1
                            className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-stack-sm"
                            id="main-headline"
                        >
                            {t.headline}
                        </h1>
                        <p
                            className="font-body-lg text-body-lg text-on-surface-variant"
                            id="main-subheadline"
                        >
                            {t.subheadline}
                        </p>
                        <div className="hidden md:block mt-stack-lg pt-stack-lg border-t border-outline-variant/30">
                            <div className="flex gap-stack-md items-center opacity-60">
                                <div className="flex flex-col">
                                    <span className="text-label-bold font-label-bold text-on-surface">
                                        99.9%
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm text-on-surface-variant"
                                        id="uptime-label"
                                    >
                                        {t.uptime}
                                    </span>
                                </div>
                                <div className="w-px h-8 bg-outline-variant/30"></div>
                                <div className="flex flex-col">
                                    <span className="text-label-bold font-label-bold text-on-surface">
                                        24/7
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm text-on-surface-variant"
                                        id="support-label"
                                    >
                                        {t.support}
                                    </span>
                                </div>
                                <div className="w-px h-8 bg-outline-variant/30"></div>
                                <div className="flex flex-col">
                                    <span className="text-label-bold font-label-bold text-on-surface">
                                        Global
                                    </span>
                                    <span
                                        className="text-label-sm font-label-sm text-on-surface-variant"
                                        id="cdns-label"
                                    >
                                        {t.cdns}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full md:w-1/2 flex items-center justify-center px-container-padding-mb md:px-container-padding-dt py-stack-lg relative overflow-hidden flex-col">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="glass-card mb-stack-sm p-1.5 rounded-xl flex justify-center self-center w-fit relative z-10 transition-all duration-500 hover:shadow-lg">
                        <div className="flex" id="tab-container-new">
                            <button
                                type="button"
                                className={
                                    tab === "url"
                                        ? "px-6 py-2.5 text-label-bold font-label-bold transition-all border-b-2 border-primary text-primary"
                                        : "px-6 py-2.5 text-label-bold font-label-bold transition-all border-b-2 border-transparent text-on-surface-variant"
                                }
                                id="tab-url"
                                onClick={() => setTab("url")}
                            >
                                {t.urlTab}
                            </button>
                            <button
                                type="button"
                                className={
                                    tab === "qr"
                                        ? "px-6 py-2.5 text-label-bold font-label-bold transition-all border-b-2 border-primary text-primary"
                                        : "px-6 py-2.5 text-label-bold font-label-bold transition-all border-b-2 border-transparent text-on-surface-variant"
                                }
                                id="tab-qr"
                                onClick={() => setTab("qr")}
                            >
                                {t.qrTab}
                            </button>
                        </div>
                    </div>

                    <div className="glass-card w-full max-w-lg p-stack-md md:p-stack-lg rounded-xl flex flex-col relative z-10 transition-all duration-500 hover:shadow-2xl space-y-4">
                        <div
                            className={
                                tab === "url"
                                    ? "space-y-stack-sm block"
                                    : "space-y-stack-sm hidden"
                            }
                            id="url-view"
                        >
                            <label
                                className="text-label-bold font-label-bold text-on-surface-variant ml-1"
                                htmlFor="url-input"
                                id="url-input-label"
                            >
                                {t.urlLabel}
                            </label>
                            <div className="relative group">
                                <input
                                    className={`w-full bg-white/50 backdrop-blur-md border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 py-4 px-5 rounded-lg text-body-md font-body-md outline-none ${
                                        urlError ? "border-error" : ""
                                    }`}
                                    id="url-input"
                                    placeholder={urlPlaceholder}
                                    type="url"
                                    value={urlInput}
                                    onChange={(event) =>
                                        setUrlInput(event.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col md:flex-row items-end gap-4 mt-stack-md">
                                <div className="flex-1 space-y-stack-sm w-full">
                                    <label
                                        className="text-label-bold font-label-bold text-on-surface-variant ml-1"
                                        htmlFor="alias-input"
                                        id="alias-input-label"
                                    >
                                        {t.aliasLabel}
                                    </label>
                                    <div className="relative group">
                                        <input
                                            className="w-full bg-white/50 backdrop-blur-md border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 py-4 px-5 rounded-lg text-body-md font-body-md outline-none"
                                            id="alias-input"
                                            placeholder={aliasPlaceholder}
                                            type="text"
                                            value={aliasInput}
                                            onChange={(event) =>
                                                setAliasInput(
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="w-full md:w-auto font-label-bold text-label-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-primary/20 active:scale-[0.98] backdrop-blur-md border text-on-secondary-container hover:brightness-95 h-[56px]"
                                    id="shorten-btn"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgb(56, 189, 248) 0%, rgb(2, 132, 199) 100%)",
                                        borderColor: "rgba(255, 255, 255, 0.2)",
                                        color: "rgb(255, 255, 255)",
                                    }}
                                    onClick={handleShorten}
                                    disabled={shortenLoading}
                                >
                                    {shortenLoading ? t.creating : t.shortenBtn}
                                </button>
                            </div>
                            <div
                                className={`mt-stack-md transition-all duration-500 ${
                                    resultVisible
                                        ? "opacity-100 translate-y-0 pointer-events-auto"
                                        : "opacity-0 translate-y-4 pointer-events-none"
                                }`}
                                id="result-container"
                            >
                                <div className="p-stack-sm bg-white/60 border border-white/80 rounded-lg flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span
                                            className="text-label-sm font-label-sm text-on-surface-variant"
                                            id="short-link-label"
                                        >
                                            {t.shortLinkName}
                                        </span>
                                        <span
                                            className="text-body-md font-body-md font-bold text-primary"
                                            id="short-link-text"
                                        >
                                            lnk.co/xY7z2
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 px-4 py-2 bg-secondary-fixed text-on-secondary-fixed font-label-bold text-label-bold rounded-lg hover:bg-secondary-fixed-dim transition-all active:scale-95"
                                        id="copy-btn"
                                        onClick={handleCopy}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            content_copy
                                        </span>
                                        <span id="copy-label">{copyLabel}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            className={
                                tab === "qr"
                                    ? "space-y-stack-sm duration-300 block"
                                    : "space-y-stack-sm duration-300 hidden"
                            }
                            id="qr-view"
                        >
                            <label
                                className="text-label-bold font-label-bold text-on-surface-variant ml-1"
                                htmlFor="qr-input"
                                id="qr-input-label"
                            >
                                {t.qrInputLabel}
                            </label>
                            <div className="space-y-stack-md">
                                <input
                                    className={`w-full bg-white/50 backdrop-blur-md border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 py-4 px-5 rounded-lg text-body-md font-body-md outline-none ${
                                        qrError ? "border-error" : ""
                                    }`}
                                    id="qr-input"
                                    placeholder="https://example.com"
                                    type="url"
                                    value={qrInput}
                                    onChange={(event) =>
                                        setQrInput(event.target.value)
                                    }
                                />
                                <div className="flex flex-col items-center justify-center p-stack-lg bg-white/40 rounded-xl border border-white/60">
                                    <div className="w-48 h-48 bg-surface-container-highest/50 rounded-lg flex items-center justify-center relative overflow-hidden group">
                                        <span className="material-symbols-outlined text-outline-variant text-5xl group-hover:scale-110 transition-transform">
                                            qr_code_2
                                        </span>
                                        <div
                                            className={`absolute inset-0 flex items-center justify-center bg-white/80 transition-opacity ${
                                                qrPreviewReady
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                            id="qr-placeholder-text"
                                        >
                                            <span
                                                className="text-label-sm font-label-sm text-primary"
                                                id="qr-preview-ready"
                                            >
                                                {t.previewReady}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="w-full font-label-bold text-label-bold py-4 rounded-lg transition-all duration-300 shadow-lg shadow-primary/20 active:scale-[0.98] backdrop-blur-md border text-on-secondary-container hover:brightness-95"
                                    id="generate-qr-btn"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgb(56, 189, 248) 0%, rgb(2, 132, 199) 100%)",
                                        borderColor: "rgba(255, 255, 255, 0.2)",
                                        color: "rgb(255, 255, 255)",
                                    }}
                                    onClick={handleGenerateQr}
                                    disabled={generateLoading}
                                >
                                    {generateLoading
                                        ? t.generating
                                        : t.generateQrBtn}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <div
                className={`fixed bottom-10 left-1/2 -translate-x-1/2 glass-card border-tertiary-container/30 px-6 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 z-[100] ${
                    toast.visible
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-10 pointer-events-none"
                }`}
                id="toast"
            >
                <span
                    className="material-symbols-outlined text-tertiary"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                >
                    check_circle
                </span>
                <span
                    className="text-label-bold font-label-bold text-on-surface"
                    id="toast-text"
                >
                    {toast.message}
                </span>
            </div>
        </div>
    );
}

export default App;
