export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#EEF2FF",
                surface: "#FFFFFF",
                text: "#0F172A",
                muted: "#64748B",
                primary: "#2563EB",
                "primary-soft": "#DBEAFE",
            },
            boxShadow: {
                soft: "0 20px 50px rgba(37, 99, 235, 0.20)",
                card: "0 12px 40px rgba(15, 23, 42, 0.10)",
            },
            borderRadius: {
                xl: "16px",
                "2xl": "20px",
            },
        },
    },
    plugins: [],
};
