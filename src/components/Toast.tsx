interface ToastProps {
    visible: boolean;
    message: string;
}

export function Toast({ visible, message }: ToastProps) {
    return (
        <div
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 glass-card border-tertiary-container/30 px-6 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 z-[100] ${
                visible
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
                {message}
            </span>
        </div>
    );
}
