"use client";

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

export const ExerciseDetailHeader = () => {
	return (
		<ReusableHeader
			leftSection={<HeaderLeftSection />}
			centerSection={<HeaderCenterSection />}
			rightSection={<HeaderRightSection />}
			mobileMenuContent={<HeaderMobileMenuContent />}
			enableScrollEffect={true}
			enableMobileMenu={true}
			stickyHeader={false}
			backdropBlur={false}
			useContainer={false}
			
		/>
	);
};
