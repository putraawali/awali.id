import { useEffect, useRef, useState } from "react";
import { placeholders, type Lang, type Translation } from "../data/content";
import { shortenUrl } from "../apis/shortenApi";
import { LinkResultPanel } from "./LinkResultPanel";
import { QrResultPanel } from "./QrResultPanel";
import { ShortenForm } from "./ShortenForm";
import type { QrCodeHandle } from "./QrCode";

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
                <ShortenForm
                    t={t}
                    urlInput={urlInput}
                    aliasInput={aliasInput}
                    urlPlaceholder={urlPlaceholder}
                    aliasPlaceholder={aliasPlaceholder}
                    urlError={urlError}
                    isLoading={shortenLoading}
                    onUrlChange={setUrlInput}
                    onAliasChange={setAliasInput}
                    onShorten={handleShorten}
                />
                <div
                    className={`opacity-0 translate-y-4 transition-all duration-500 pointer-events-none mt-stack-md ${resultVisible || qrResultVisible
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : ""
                        }`}
                    id="result-container"
                >
                    <LinkResultPanel
                        t={t}
                        shortCode={shortenUrlResult}
                        copyLabel={copyLabel}
                        isActive={activeResult === "url"}
                        onCopy={handleCopy}
                        onShowQr={handleShowQr}
                    />
                    <QrResultPanel
                        ref={qrResultRef}
                        t={t}
                        fullShortUrl={fullShortUrl}
                        isActive={activeResult === "qr"}
                        shouldRenderQr={qrResultVisible}
                        qrCodeRef={qrCodeRef}
                        onShowLink={handleShowLink}
                        onDownload={handleDownloadQr}
                        onShare={handleShareQr}
                    />
                </div>
            </div>
        </section>
    );
}
