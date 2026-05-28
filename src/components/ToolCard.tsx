import { useState } from "react";
import { placeholders, type Lang, type Translation } from "../data/content";
import { shortenUrl } from "../apis/shortenApi";

interface ToolCardProps {
    t: Translation;
    lang: Lang;
    showToast: (message: string) => void;
}

export function ToolCard({ t, lang, showToast }: ToolCardProps) {
    const [urlInput, setUrlInput] = useState("");
    const [aliasInput, setAliasInput] = useState("");
    const [urlError, setUrlError] = useState(false);
    const [resultVisible, setResultVisible] = useState(false);
    const [shortenUrlResult, setShortenUrlResult] = useState("");
    const [qrResultVisible, setQrResultVisible] = useState(false);
    const [activeResult, setActiveResult] = useState<"url" | "qr" | null>(null);
    const [copyLabel, setCopyLabel] = useState<string>(t.copy);
    const [shortenLoading, setShortenLoading] = useState(false);
    const [generateLoading, setGenerateLoading] = useState(false);

    const urlPlaceholder = placeholders[lang].url;
    const aliasPlaceholder = placeholders[lang].alias;

    const handleShorten = async () => {
        if (urlInput.trim() === "") {
            setUrlError(true);
            setTimeout(() => setUrlError(false), 1000);
            return;
        }

        setShortenLoading(true);

        try {
            const response = await shortenUrl(urlInput, aliasInput);
            setShortenLoading(false);

            setShortenUrlResult(response.data.urlCode);
            setResultVisible(true);
            setActiveResult("url");
            setQrResultVisible(false);
            showToast(t.toastSuccess);
        } catch (error) {
            setShortenLoading(false);
            showToast("An error occurred. Please try again.");
        }
    };

    const handleGenerateQr = () => {
        if (urlInput.trim() === "") {
            setUrlError(true);
            setTimeout(() => setUrlError(false), 1000);
            return;
        }

        setGenerateLoading(true);
        setTimeout(() => {
            setGenerateLoading(false);
            setQrResultVisible(true);
            setActiveResult("qr");
            setResultVisible(false);
            showToast(t.toastQrSuccess);
        }, 800);
    };

    const handleCopy = async () => {
        const fullUrl = `${window.location.origin}/${shortenUrlResult}`;

        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(fullUrl);
            } else {
                fallbackCopy(fullUrl);
            }

            setCopyLabel("Copied");
        } catch {
            setCopyLabel("Copied");
        }

        window.setTimeout(() => setCopyLabel(t.copy), 1200);
    };

    const fallbackCopy = (text: string) => {
        const textarea = document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);
    };

    return (
        <section className="w-full md:w-1/2 flex items-center justify-center px-container-padding-mb md:px-container-padding-dt py-stack-lg relative overflow-hidden flex-col">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div
                className="glass-card w-full max-w-lg p-stack-md md:p-stack-lg rounded-xl flex flex-col relative z-10 transition-all duration-500 hover:shadow-2xl space-y-4"
                id="tool-card"
            >
                <div className="space-y-stack-sm">
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
                </div>
                <div className="space-y-stack-sm">
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
                                setAliasInput(event.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                        className="flex-1 font-label-bold text-label-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-primary/20 active:scale-[0.98] backdrop-blur-md border text-white hover:brightness-95"
                        id="shorten-btn"
                        style={{
                            background:
                                "linear-gradient(135deg, rgb(56, 189, 248) 0%, rgb(2, 132, 199) 100%)",
                            borderColor: "rgba(255, 255, 255, 0.2)",
                        }}
                        onClick={handleShorten}
                        disabled={shortenLoading}
                    >
                        {shortenLoading ? t.creating : t.shortenBtn}
                    </button>
                    <div className="flex-1 relative group/qr">
                        <button
                            className="w-full font-label-bold text-label-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-primary/20 backdrop-blur-md border text-white cursor-not-allowed opacity-80"
                            id="generate-qr-btn"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(56, 189, 248, 0.4) 0%, rgba(2, 132, 199, 0.4) 100%)",
                                borderColor: "rgba(255, 255, 255, 0.2)",
                            }}
                            onClick={handleGenerateQr}
                            disabled={true}
                            // disabled={generateLoading}
                        >
                            {generateLoading ? t.generating : t.generateQrBtn}
                        </button>
                        <div className="absolute -top-1 -right-1 z-30 pointer-events-none">
                            <div className="bg-white/40 backdrop-blur-md border border-white/60 text-[10px] font-bold text-primary px-2 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">
                                Soon
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`opacity-0 translate-y-4 transition-all duration-500 pointer-events-none mt-stack-md ${
                        resultVisible || qrResultVisible
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : ""
                    }`}
                    id="result-container"
                >
                    <div
                        className={`p-stack-sm bg-white/60 border border-white/80 rounded-lg flex items-center justify-between ${
                            activeResult === "url" ? "block" : "hidden"
                        }`}
                        id="link-result-ui"
                    >
                        <div className="flex flex-col min-w-0 flex-1">
                            <span
                                className="text-label-sm font-label-sm text-on-surface-variant"
                                id="short-link-label"
                            >
                                {t.shortLinkName}
                            </span>
                            <span
                                className="text-body-md font-body-md font-bold text-primary flex items-center min-w-0 max-w-[180px] sm:max-w-[240px]"
                                id="short-link-text"
                            >
                                <span className="font-normal opacity-70 bg-surface-container/50 px-1 rounded mr-0.5 flex-shrink-0">{`awali.id/`}</span>
                                <span
                                    className="font-extrabold truncate"
                                    title={shortenUrlResult}
                                >
                                    {shortenUrlResult}
                                </span>
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
                    <div
                        className={`flex flex-col items-center justify-center p-stack-lg bg-white/40 rounded-xl border border-white/60 mt-4 ${
                            activeResult === "qr" ? "flex" : "hidden"
                        }`}
                        id="qr-result-ui"
                    >
                        <div className="w-48 h-48 bg-surface-container-highest/50 rounded-lg flex items-center justify-center relative overflow-hidden group">
                            <span className="material-symbols-outlined text-outline-variant text-5xl">
                                qr_code_2
                            </span>
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-white/80"
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
                </div>
            </div>
        </section>
    );
}
