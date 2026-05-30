import { forwardRef, type RefObject } from "react";
import type { Translation } from "../data/content";
import QrCode, { type QrCodeHandle } from "./QrCode";

interface QrResultPanelProps {
    t: Translation;
    fullShortUrl: string;
    isActive: boolean;
    shouldRenderQr: boolean;
    qrCodeRef: RefObject<QrCodeHandle | null>;
    onShowLink: () => void;
    onDownload: () => void;
    onShare: () => void;
}

export const QrResultPanel = forwardRef<HTMLDivElement, QrResultPanelProps>(
    (
        {
            t,
            fullShortUrl,
            isActive,
            shouldRenderQr,
            qrCodeRef,
            onShowLink,
            onDownload,
            onShare,
        },
        ref,
    ) => (
        <div
            className={`result-panel-enter flex flex-col items-center justify-center p-stack-lg bg-white/40 dark:bg-slate-900/40 rounded-xl border border-white/60 dark:border-white/10 mt-4 ${
                isActive ? "flex" : "hidden"
            }`}
            id="qr-result-ui"
            ref={ref}
        >
            <div className="w-56 h-56 bg-white rounded-lg flex items-center justify-center relative overflow-hidden shadow-sm">
                {shouldRenderQr && (
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
                    onClick={onShowLink}
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
                    onClick={onDownload}
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
                    onClick={onShare}
                >
                    <span className="material-symbols-outlined text-[18px]">
                        ios_share
                    </span>
                    <span>{t.shareQr}</span>
                </button>
            </div>
        </div>
    ),
);
