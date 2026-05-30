import type { Translation } from "../data/content";

interface LinkResultPanelProps {
    t: Translation;
    shortCode: string;
    copyLabel: string;
    isActive: boolean;
    onCopy: () => void;
    onShowQr: () => void;
}

export function LinkResultPanel({
    t,
    shortCode,
    copyLabel,
    isActive,
    onCopy,
    onShowQr,
}: LinkResultPanelProps) {
    return (
        <div
            className={`result-panel-enter p-stack-sm bg-white/60 dark:bg-slate-900/60 border border-white/80 dark:border-white/10 rounded-lg flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${
                isActive ? "flex" : "hidden"
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
                    <span className="font-normal opacity-70 bg-surface-container/50 px-1 rounded mr-0.5 flex-shrink-0">
                        awali.id/
                    </span>
                    <span className="font-extrabold truncate" title={shortCode}>
                        {shortCode}
                    </span>
                </span>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 bg-secondary-fixed text-on-secondary-fixed font-label-bold text-label-bold rounded-lg hover:bg-secondary-fixed-dim transition-all active:scale-95 sm:w-auto"
                    id="copy-btn"
                    onClick={onCopy}
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
                    onClick={onShowQr}
                >
                    <span className="material-symbols-outlined text-[18px]">
                        qr_code_2
                    </span>
                    <span>{t.showQr}</span>
                </button>
            </div>
        </div>
    );
}
