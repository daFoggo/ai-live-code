"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { SlashIcon } from "lucide-react";
import { useParams } from "next/navigation";
import AppLogo from "@/components/common/app-logo";
import {
	AnimatedButton,
	ReusableHeader,
} from "@/components/common/reuse-header";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ExerciseToolBar from "./exercise-tool-bar";

const HeaderLeftSection = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<div className="flex flex-row items-center gap-6">
			<AppLogo navigateTo="/exercises" showText={false} />
			<Separator orientation="vertical" className="hidden lg:block min-h-4" />
			<Breadcrumb className="hidden lg:block w-fit">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/exercises">Problem list</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<SlashIcon />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>{id}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};

const HeaderCenterSection = () => {
	return <ExerciseToolBar />;
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

export const ExerciseDetailHeader = () => {
	const { isSignedIn, userId, sessionId, isLoaded } = useAuth();
	return (
		<ReusableHeader
			leftSection={<HeaderLeftSection />}
			centerSection={<HeaderCenterSection />}
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
			enableScrollEffect={false}
			enableMobileMenu={true}
			stickyHeader={false}
			backdropBlur={false}
			useContainer={false}
			className="border-b border-border/30"
		/>
	);
};
