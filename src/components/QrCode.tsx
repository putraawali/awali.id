import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import QRCodeStyling from "qr-code-styling";

interface QrCodeProps {
    value: string;
    size: number;
    exportSize?: number;
    level: "L" | "M" | "Q" | "H";
    id: string;
}

export interface QrCodeHandle {
    download: (name?: string) => Promise<void>;
    getBlob: () => Promise<Blob | null>;
}

const QrCode = forwardRef<QrCodeHandle, QrCodeProps>(
    ({ value, size, exportSize = 1024, level, id }, ref) => {
        const qrRef = useRef<HTMLDivElement>(null);
        const qrCodeRef = useRef<QRCodeStyling | null>(null);

        const createQrCode = useCallback(
            (renderSize: number) =>
                new QRCodeStyling({
                    width: renderSize,
                    height: renderSize,
                    margin: Math.round(renderSize * 0.06),
                    data: value,
                    type: "canvas",
                    qrOptions: {
                        errorCorrectionLevel: level,
                    },
                    image: "./awali_logo_light_mode_press.png",
                    imageOptions: {
                        crossOrigin: "anonymous",
                        imageSize: 0.4,
                        margin: Math.round(renderSize * 0.02),
                    },
                    dotsOptions: {
                        type: "rounded",
                        color: "#0058be",
                    },
                    cornersSquareOptions: {
                        type: "extra-rounded",
                        color: "#003c70",
                    },
                    cornersDotOptions: {
                        type: "dot",
                        color: "#003c70",
                    },
                    backgroundOptions: {
                        color: "#ffffff",
                    },
                }),
            [level, value],
        );

        useEffect(() => {
            const container = qrRef.current;

            if (!container) return;

            container.replaceChildren();

            const qr = createQrCode(size);

            qr.append(container);
            qrCodeRef.current = qr;

            return () => {
                container.replaceChildren();
                qrCodeRef.current = null;
            };
        }, [createQrCode, size]);

        useImperativeHandle(ref, () => ({
            download: async (name = "awali-qr-code") => {
                await createQrCode(exportSize).download({
                    name,
                    extension: "png",
                });
            },
            getBlob: async () => {
                const data = await createQrCode(exportSize).getRawData("png");

                if (!data) return null;
                if (data instanceof Blob) return data;

                return new Blob([data], { type: "image/png" });
            },
        }));

        return <div ref={qrRef} id={id} />;
    },
);

export default QrCode;
