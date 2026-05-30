import type { Translation } from "../data/content";

interface ShortenFormProps {
    t: Translation;
    urlInput: string;
    aliasInput: string;
    urlPlaceholder: string;
    aliasPlaceholder: string;
    urlError: boolean;
    isLoading: boolean;
    onUrlChange: (value: string) => void;
    onAliasChange: (value: string) => void;
    onShorten: () => void;
}

const urlInputErrorClass =
    "!border-error !bg-error-container/25 !ring-4 !ring-error/25 dark:!bg-error/10 dark:!ring-error/30";

export function ShortenForm({
    t,
    urlInput,
    aliasInput,
    urlPlaceholder,
    aliasPlaceholder,
    urlError,
    isLoading,
    onUrlChange,
    onAliasChange,
    onShorten,
}: ShortenFormProps) {
    const inputClass =
        "w-full bg-white/50 dark:bg-slate-950/40 backdrop-blur-md border-white/60 dark:border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:text-white dark:placeholder-slate-400/80 transition-all duration-300 py-4 px-5 rounded-lg text-body-md font-body-md outline-none";

    return (
        <>
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
                        className={`${inputClass} ${urlError ? urlInputErrorClass : ""}`}
                        id="url-input"
                        placeholder={urlPlaceholder}
                        type="url"
                        value={urlInput}
                        onChange={(event) => onUrlChange(event.target.value)}
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
                        className={inputClass}
                        id="alias-input"
                        placeholder={aliasPlaceholder}
                        type="text"
                        value={aliasInput}
                        onChange={(event) =>
                            onAliasChange(
                                event.target.value.replace(/[^a-zA-Z0-9_-]/g, ""),
                            )
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
                    onClick={onShorten}
                    disabled={isLoading}
                >
                    {isLoading ? t.creating : t.shortenBtn}
                </button>
            </div>
        </>
    );
}
