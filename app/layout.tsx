import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, Space_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SWRProvider } from "@/components/providers/swr-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/features/auth";
import { APP_INFO } from "@/lib/configs/app-info";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

const spaceMono = Space_Mono({
	variable: "--font-space-mono",
	subsets: ["latin"],
	weight: "400",
});

const fraunces = Fraunces({
	variable: "--font-fraunces",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: APP_INFO.name,
	description: APP_INFO.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${spaceGrotesk.variable} ${spaceMono.variable} ${fraunces.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NuqsAdapter>
						<SWRProvider>
							<AuthProvider>
								<TooltipProvider delayDuration={0} skipDelayDuration={100}>
									{children}
								</TooltipProvider>
							</AuthProvider>
						</SWRProvider>
					</NuqsAdapter>
				</ThemeProvider>
			</body>
		</html>
	);
}
