import type { Translation } from "../data/content";

interface HeroSectionProps {
    t: Translation;
}

export function HeroSection({ t }: HeroSectionProps) {
    return (
        <section className="w-full md:w-1/2 flex flex-col justify-center px-container-padding-mb md:px-container-padding-dt py-stack-lg space-y-stack-md">
            <div className="max-w-xl lang-transition" id="hero-content">
                <h1
                    className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-stack-sm"
                    id="main-headline"
                >
                    {t.headline}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant" id="main-subheadline">
                    {t.subheadline}
                </p>
                <div className="hidden md:block mt-stack-lg pt-stack-lg border-t border-outline-variant/30">
                    <div className="flex gap-stack-md items-center opacity-60">
                        <div className="flex flex-col">
                            <span className="text-label-bold font-label-bold text-on-surface">
                                99.9%
                            </span>
                            <span className="text-label-sm font-label-sm text-on-surface-variant" id="uptime-label">
                                {t.uptime}
                            </span>
                        </div>
                        <div className="w-px h-8 bg-outline-variant/30"></div>
                        <div className="flex flex-col">
                            <span className="text-label-bold font-label-bold text-on-surface">
                                24/7
                            </span>
                            <span className="text-label-sm font-label-sm text-on-surface-variant" id="support-label">
                                {t.support}
                            </span>
                        </div>
                        <div className="w-px h-8 bg-outline-variant/30"></div>
                        <div className="flex flex-col">
                            <span className="text-label-bold font-label-bold text-on-surface">
                                Global
                            </span>
                            <span className="text-label-sm font-label-sm text-on-surface-variant" id="cdns-label">
                                {t.cdns}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
