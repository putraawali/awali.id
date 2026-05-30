import { useEffect, useRef, useState } from "react";
import { placeholders, type Lang, type Translation } from "../data/content";
import { shortenUrl } from "../apis/shortenApi";
import QrCode, { type QrCodeHandle } from "./QrCode";

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
    const qrCodeRef = useRef<QrCodeHandle>(null);
    const qrResultRef = useRef<HTMLDivElement>(null);

    const urlPlaceholder = placeholders[lang].url;
    const aliasPlaceholder = placeholders[lang].alias;
    const fullShortUrl = shortenUrlResult
        ? `${window.location.origin}/${shortenUrlResult}`
        : "";
    const urlInputErrorClass =
        "!border-error !bg-error-container/25 !ring-4 !ring-error/25 dark:!bg-error/10 dark:!ring-error/30";

    const getErrorMessage = (error: unknown) =>
        error instanceof Error ? error.message : "Something went wrong.";

    useEffect(() => {
        if (activeResult !== "qr") return;

        const scrollTimeout = window.setTimeout(() => {
            qrResultRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }, 80);

        return () => window.clearTimeout(scrollTimeout);
    }, [activeResult]);

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
            setAliasInput("");
            setUrlInput("");
        } catch (error: unknown) {
            setShortenLoading(false);
            let toastMessage = getErrorMessage(error);

            if (toastMessage.toLowerCase().includes("too many requests")) {
                toastMessage = "Too many requests. Please try again later.";
                setUrlError(true);
                setTimeout(() => setUrlError(false), 1000);
            }

            showToast(toastMessage);
        }
    };

    const handleShowQr = () => {
        setQrResultVisible(true);
        setActiveResult("qr");
    };

    const handleShowLink = () => {
        setActiveResult("url");
    };

    const handleCopy = async () => {
        const fullUrl = fullShortUrl;

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

    const getQrFileName = () =>
        `awali-qr-${shortenUrlResult || "code"}`.replace(/[^a-zA-Z0-9_-]/g, "-");

    const handleDownloadQr = async () => {
        try {
            await qrCodeRef.current?.download(getQrFileName());
        } catch {
            showToast(t.toastQrDownloadFailed);
        }
    };

    const handleShareQr = async () => {
        try {
            const blob = await qrCodeRef.current?.getBlob();

            if (!blob) {
                throw new Error("QR image is not ready");
            }

            const file = new File([blob], `${getQrFileName()}.png`, {
                type: "image/png",
            });

            if (navigator.canShare?.({ files: [file] })) {
                await navigator.share({
                    title: t.shareQrTitle,
                    text: fullShortUrl,
                    files: [file],
                });
                return;
            }

            if (navigator.share) {
                await navigator.share({
                    title: t.shareQrTitle,
                    text: fullShortUrl,
                    url: fullShortUrl,
                });
                return;
            }

            await handleCopy();
            showToast(t.toastShareFallback);
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }

            showToast(t.toastShareFailed);
        }
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
                            className={`w-full bg-white/50 dark:bg-slate-950/40 backdrop-blur-md border-white/60 dark:border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:text-white dark:placeholder-slate-400/80 transition-all duration-300 py-4 px-5 rounded-lg text-body-md font-body-md outline-none ${urlError ? urlInputErrorClass : ""
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
                            className="w-full bg-white/50 dark:bg-slate-950/40 backdrop-blur-md border-white/60 dark:border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:text-white dark:placeholder-slate-400/80 transition-all duration-300 py-4 px-5 rounded-lg text-body-md font-body-md outline-none"
                            id="alias-input"
                            placeholder={aliasPlaceholder}
                            type="text"
                            value={aliasInput}
                            onChange={(event) => {
                                const filtered = event.target.value.replace(/[^a-zA-Z0-9_-]/g, "");
                                setAliasInput(filtered);
                            }}
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
                </div>
                <div
                    className={`opacity-0 translate-y-4 transition-all duration-500 pointer-events-none mt-stack-md ${resultVisible || qrResultVisible
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : ""
                        }`}
                    id="result-container"
                >
                    <div
                        className={`result-panel-enter p-stack-sm bg-white/60 dark:bg-slate-900/60 border border-white/80 dark:border-white/10 rounded-lg flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${activeResult === "url" ? "flex" : "hidden"
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
                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 bg-secondary-fixed text-on-secondary-fixed font-label-bold text-label-bold rounded-lg hover:bg-secondary-fixed-dim transition-all active:scale-95 sm:w-auto"
                                id="copy-btn"
                                onClick={handleCopy}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    content_copy
                                </span>
                                <span id="copy-label">{copyLabel}</span>
                            </button>
                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary font-label-bold text-label-bold rounded-lg hover:brightness-95 transition-all active:scale-95 sm:w-auto"
                                id="show-qr-btn"
                                onClick={handleShowQr}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    qr_code_2
                                </span>
                                <span>{t.showQr}</span>
                            </button>
                        </div>
                    </div>
                    <div
                        className={`result-panel-enter flex flex-col items-center justify-center p-stack-lg bg-white/40 dark:bg-slate-900/40 rounded-xl border border-white/60 dark:border-white/10 mt-4 ${activeResult === "qr" ? "flex" : "hidden"
                            }`}
                        id="qr-result-ui"
                        ref={qrResultRef}
                    >
                        <div className="w-56 h-56 bg-white rounded-lg flex items-center justify-center relative overflow-hidden shadow-sm">
                            {qrResultVisible && (
                                <QrCode
                                    ref={qrCodeRef}
                                    value={fullShortUrl}
                                    size={192}
                                    level="H"
                                    id="qr-result"
                                />
                            )}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3 w-full mt-4">
                            <button
                                type="button"
                                className="inline-flex w-fit max-w-full items-center justify-center gap-2 whitespace-nowrap px-4 py-2.5 bg-white/70 dark:bg-slate-950/50 text-on-surface font-label-bold text-label-bold rounded-lg border border-white/70 dark:border-white/10 hover:bg-white/90 dark:hover:bg-slate-950/70 transition-all active:scale-95"
                                id="show-link-btn"
                                onClick={handleShowLink}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    link
                                </span>
                                <span>{t.showLink}</span>
                            </button>
                            <button
                                type="button"
                                className="inline-flex w-fit max-w-full items-center justify-center gap-2 whitespace-nowrap px-4 py-2.5 bg-secondary-fixed text-on-secondary-fixed font-label-bold text-label-bold rounded-lg hover:bg-secondary-fixed-dim transition-all active:scale-95"
                                id="download-qr-btn"
                                onClick={handleDownloadQr}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    download
                                </span>
                                <span>{t.downloadQr}</span>
                            </button>
                            <button
                                type="button"
                                className="inline-flex w-fit max-w-full items-center justify-center gap-2 whitespace-nowrap px-4 py-2.5 bg-primary text-on-primary font-label-bold text-label-bold rounded-lg hover:brightness-95 transition-all active:scale-95"
                                id="share-qr-btn"
                                onClick={handleShareQr}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    ios_share
                                </span>
                                <span>{t.shareQr}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
