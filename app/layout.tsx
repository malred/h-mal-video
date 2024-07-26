import type {Metadata} from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

// import "@chinese-fonts/mkwtyt/dist/MaoKenTangYuan/results.css";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Theme>
            <NavBar/>
            {children}
        </Theme>
        </body>
        </html>
    );
}
