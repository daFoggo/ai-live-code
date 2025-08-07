"use client";

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

const HeaderLeftSection = () => {
	const navbarItems: INavItem[] = [
		{ title: "Danh sách bài tập", url: "/exercises", icon: LibraryBig },
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

const HeaderRightSection = () => {
	return (
		<AnimatedButton variant="ghost" delay={0.4} asChild>
			<ThemeSwitcher />
		</AnimatedButton>
	);
};

const HeaderMobileMenuContent = () => {
	return (
		<div className="flex flex-col gap-4">
			<AnimatedButton variant="ghost" delay={0.4} asChild>
				<ThemeSwitcher showText={true} />
			</AnimatedButton>
		</div>
	);
};

export const ExerciseHeader = () => {
	return (
		<ReusableHeader
			leftSection={<HeaderLeftSection />}
			rightSection={<HeaderRightSection />}
			mobileMenuContent={<HeaderMobileMenuContent />}
			enableScrollEffect={true}
			enableMobileMenu={true}
			stickyHeader={true}
			backdropBlur={true}
			useContainer={false}
			className="border-b border-border/20"
		/>
	);
};
