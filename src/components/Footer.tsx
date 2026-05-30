const startYear = 2026;

function getCopyrightYear() {
    const currentYear = new Date().getFullYear();

    return currentYear > startYear
        ? `${startYear}-${currentYear}`
        : `${startYear}`;
}

export function Footer() {
    return (
        <footer className="relative z-10 px-container-padding-mb md:px-container-padding-dt pb-8 text-center">
            <p className="text-label-sm font-label-sm text-on-surface-variant">
                &copy; {getCopyrightYear()} Awali
            </p>
        </footer>
    );
}
