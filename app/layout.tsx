import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ClerkThemeProvider } from "@/components/providers/clerk-theme-provider";
import { SWRProvider } from "@/components/providers/swr-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_INFO } from "@/lib/configs/app-info";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const merriWeather = Merriweather({
	variable: "--font-merriweather",
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
				className={`${geistSans.variable} ${geistMono.variable} ${merriWeather.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NuqsAdapter>
						<SWRProvider>
							<ClerkThemeProvider>
								<ClerkProvider>
									<TooltipProvider delayDuration={0} skipDelayDuration={100}>
										{children}
									</TooltipProvider>
								</ClerkProvider>
							</ClerkThemeProvider>
						</SWRProvider>
					</NuqsAdapter>
				</ThemeProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
