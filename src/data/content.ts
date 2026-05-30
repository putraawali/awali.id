export type Lang = "en" | "id";
export type TabType = "url" | "qr";

export const translations = {
    en: {
        headline: "Awali. Shorter links, better starts.",
        subheadline:
            "Create clean, memorable links and instant QR codes in seconds. Enhance your digital footprint with precision-engineered tools.",
        urlLabel: "Paste your long URL here...",
        aliasLabel: "Custom Alias (Optional)",
        shortenBtn: "Shorten",
        qrTab: "QR Code",
        urlTab: "Shorten URL",
        supportBtn: "Buy me a coffee",
        qrInputLabel: "Enter URL for QR code...",
        generateQrBtn: "Generate QR Code",
        shortLinkName: "Your short link",
        copy: "Copy",
        showQr: "Show QR",
        showLink: "Show link",
        downloadQr: "Download",
        shareQr: "Share",
        shareQrTitle: "Awali QR Code",
        uptime: "Uptime",
        support: "Support",
        cdns: "CDNs",
        toastSuccess: "Link shortened successfully!",
        toastQrSuccess: "QR Code generated!",
        toastShareFallback: "Sharing is unavailable here, so the link was copied.",
        toastShareFailed: "Could not share the QR code. Please try downloading it.",
        toastQrDownloadFailed: "Could not download the QR code. Please try again.",
        creating: "Creating...",
        generating: "Generating...",
        previewReady: "Preview ready",
        themeLight: "Light Mode",
        themeDark: "Dark Mode",
    },
    id: {
        headline: "Awali. Link lebih singkat, awal yang lebih baik.",
        subheadline:
            "Buat tautan bersih, mudah diingat, dan kode QR instan dalam hitungan detik. Tingkatkan jejak digital Anda dengan alat yang presisi.",
        urlLabel: "Tempel URL panjang Anda di sini...",
        aliasLabel: "Alias Kustom (Opsional)",
        shortenBtn: "Perpendek",
        qrTab: "Kode QR",
        urlTab: "Perpendek URL",
        supportBtn: "Dukung saya",
        qrInputLabel: "Masukkan URL untuk kode QR...",
        generateQrBtn: "Buat Kode QR",
        shortLinkName: "Tautan pendek Anda",
        copy: "Salin",
        showQr: "Lihat QR",
        showLink: "Lihat tautan",
        downloadQr: "Unduh",
        shareQr: "Bagikan",
        shareQrTitle: "Kode QR Awali",
        uptime: "Aktif",
        support: "Dukungan",
        cdns: "CDN",
        toastSuccess: "Tautan berhasil diperpendek!",
        toastQrSuccess: "Kode QR berhasil dibuat!",
        toastShareFallback: "Berbagi tidak tersedia di sini, jadi tautan sudah disalin.",
        toastShareFailed: "Kode QR belum bisa dibagikan. Coba unduh terlebih dahulu.",
        toastQrDownloadFailed: "Kode QR belum bisa diunduh. Silakan coba lagi.",
        creating: "Membuat...",
        generating: "Memproses...",
        previewReady: "Pratinjau siap",
        themeLight: "Mode Terang",
        themeDark: "Mode Gelap",
    },
} as const;

export const placeholders = {
    en: {
        url: "https://example.com/very-long-and-complex-path",
        alias: "my-custom-link",
    },
    id: {
        url: "https://contoh.com/jalur-yang-sangat-panjang",
        alias: "tautan-kustom-saya",
    },
};

type Translation = (typeof translations)["en"];
export type { Translation };
