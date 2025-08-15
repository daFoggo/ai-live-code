"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { LibraryBig } from "lucide-react";
import type { INavItem } from "@/lib/types/navigation";
import AppLogo from "../common/app-logo";
import {
	AnimatedButton,
	AnimatedNavItem,
	ReusableHeader,
} from "../common/reuse-header";
import { ThemeSwitcher } from "../common/theme-switcher";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const HeaderLeftSection = () => {
	const navbarItems: INavItem[] = [
		{ title: "Problem list", url: "/exercises", icon: LibraryBig },
	];

	return (
		<div className="flex items-center gap-6">
			<AppLogo navigateTo="/exercises" />
			<Separator orientation="vertical" className="min-h-4" />
			{navbarItems.map((item, i) => (
				<AnimatedNavItem
					key={item.title}
					href={item.url}
					delay={i * 0.05}
					className="flex items-center gap-2 py-2 text-sm"
				>
					{item.icon && <item.icon className="size-4" />}
					{item.title}
				</AnimatedNavItem>
			))}
		</div>
	);
};

const HeaderRightSection = ({
	isSignedIn,
	isLoaded,
	userId,
	sessionId,
}: {
	isSignedIn: boolean | undefined;
	isLoaded: boolean | undefined;
	userId: string | null | undefined;
	sessionId: string | null | undefined;
}) => {
	return (
		<div className="flex items-center gap-2 md:gap-4">
			<AnimatedButton variant="ghost" delay={0.4} asChild>
				<ThemeSwitcher />
			</AnimatedButton>

			{!isLoaded ? null : !isSignedIn ? (
				<SignInButton />
			) : userId && sessionId ? (
				<UserButton />
			) : (
				<Skeleton className="rounded-full size-12" />
			)}
		</div>
	);
};

const HeaderMobileMenuContent = ({
	isSignedIn,
	isLoaded,
	userId,
	sessionId,
}: {
	isSignedIn: boolean | undefined;
	isLoaded: boolean | undefined;
	userId: string | null | undefined;
	sessionId: string | null | undefined;
}) => {
	return (
		<div className="flex flex-col gap-4">
			<AnimatedButton variant="ghost" delay={0.4} asChild>
				<ThemeSwitcher showText={true} />
			</AnimatedButton>

			<div className="mt-2 pt-2 border-t border-border/30">
				{!isLoaded ? null : !isSignedIn ? (
					<SignInButton />
				) : userId && sessionId ? (
					<UserButton />
				) : (
					<Skeleton className="rounded-full size-12" />
				)}
			</div>
		</div>
	);
};

export const ExerciseHeader = () => {
	const { isSignedIn, userId, sessionId, isLoaded } = useAuth();
	return (
		<ReusableHeader
			leftSection={<HeaderLeftSection />}
			rightSection={
				<HeaderRightSection
					isSignedIn={isSignedIn}
					isLoaded={isLoaded}
					userId={userId}
					sessionId={sessionId}
				/>
			}
			mobileMenuContent={
				<HeaderMobileMenuContent
					isSignedIn={isSignedIn}
					isLoaded={isLoaded}
					userId={userId}
					sessionId={sessionId}
				/>
			}
			enableScrollEffect={true}
			enableMobileMenu={true}
			stickyHeader={true}
			backdropBlur={true}
			useContainer={false}
			className="border-b border-border/20"
		/>
	);
};
