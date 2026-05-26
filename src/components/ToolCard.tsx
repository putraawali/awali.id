import type { TabType, Translation } from "../data/content";

interface ToolCardProps {
    tab: TabType;
    onTabChange: (tab: TabType) => void;
    t: Translation;
    urlInput: string;
    aliasInput: string;
    qrInput: string;
    urlPlaceholder: string;
    aliasPlaceholder: string;
    urlError: boolean;
    qrError: boolean;
    resultVisible: boolean;
    qrPreviewReady: boolean;
    shortenLoading: boolean;
    generateLoading: boolean;
    copyLabel: string;
    onUrlChange: (value: string) => void;
    onAliasChange: (value: string) => void;
    onQrChange: (value: string) => void;
    onShorten: () => void;
    onGenerateQr: () => void;
    onCopy: () => void;
}

const actionButtonStyles =
    "w-full md:w-auto font-label-bold text-label-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-primary/20 active:scale-[0.98] backdrop-blur-md border text-on-secondary-container hover:brightness-95 h-[56px]";

export function ToolCard({
    tab,
    onTabChange,
    t,
    urlInput,
    aliasInput,
    qrInput,
    urlPlaceholder,
    aliasPlaceholder,
    urlError,
    qrError,
    resultVisible,
    qrPreviewReady,
    shortenLoading,
    generateLoading,
    copyLabel,
    onUrlChange,
    onAliasChange,
    onQrChange,
    onShorten,
    onGenerateQr,
    onCopy,
}: ToolCardProps) {
    return (
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
                        onClick={() => onTabChange("url")}
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
                        onClick={() => onTabChange("qr")}
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
                                onUrlChange(event.target.value)
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
                                        onAliasChange(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            className={actionButtonStyles}
                            id="shorten-btn"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgb(56, 189, 248) 0%, rgb(2, 132, 199) 100%)",
                                borderColor: "rgba(255, 255, 255, 0.2)",
                                color: "rgb(255, 255, 255)",
                            }}
                            onClick={onShorten}
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
                                onClick={onCopy}
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
                            onChange={(event) => onQrChange(event.target.value)}
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
                            onClick={onGenerateQr}
                            disabled={generateLoading}
                        >
                            {generateLoading ? t.generating : t.generateQrBtn}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
