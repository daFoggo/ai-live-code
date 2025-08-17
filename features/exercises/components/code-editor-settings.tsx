"use client";

import { BotMessageSquare, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Scroller } from "@/components/ui/scroller";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSettings } from "../contexts/code-editor-settings-context";
import { REVIEW_MODE } from "../utils/constants";

export const SETTINGS_CATEGORIES = [
    { id: "codeReview", label: "Code Review", icon: BotMessageSquare },
];

const CodeEditorSettings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("codeReview");
    const [showMobileMenu, setShowMobileMenu] = useState(true);

    const { settings, updateSetting, isLoading, error } = useSettings();

    const handleCategorySelect = (categoryId: string) => {
        setActiveCategory(categoryId);
        setShowMobileMenu(false);
    };

    const renderCodeReviewSettings = () => (
        <div className="space-y-6">
            <div className="items-center gap-6 grid grid-cols-1 md:grid-cols-2 py-4 border-b">
                <div className="space-y-1">
                    <Label className="font-medium text-base">Review Mode</Label>
                    <p className="text-muted-foreground text-sm">
                        Choose how you want to review your code
                    </p>
                </div>
                <div className="space-y-2">
                    <Select
                        value={settings.codeReview.mode.toString()}
                        onValueChange={(value) =>
                            updateSetting("codeReview", "mode", Number.parseInt(value))
                        }
                        disabled={isLoading}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select review mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={REVIEW_MODE.STEP_CODE.toString()}>
                                Step by Step
                            </SelectItem>
                            <SelectItem value={REVIEW_MODE.FULL_CODE.toString()}>
                                Full Code Review
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-muted-foreground text-xs">
                        {settings.codeReview.mode === REVIEW_MODE.STEP_CODE
                            ? "Review code step by step with detailed explanations"
                            : "Get a comprehensive review of the entire codebase"}
                    </p>
                    {error && <p className="text-destructive text-xs">{error}</p>}
                </div>
            </div>

            <div className="items-center gap-6 grid grid-cols-1 md:grid-cols-2 py-4 border-b">
                <div className="space-y-1">
                    <Label className="font-medium text-base">Show Instructions</Label>
                    <p className="text-muted-foreground text-sm">
                        Show problem solving instructions
                    </p>
                </div>
                <Switch
                    checked={settings.codeReview.showInstructions}
                    onCheckedChange={(checked) =>
                        updateSetting("codeReview", "showInstructions", checked)
                    }
                />
                {error && <p className="text-destructive text-xs">{error}</p>}
            </div>
        </div>
    );

    const renderCategoryContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center py-8">
                    <div className="text-muted-foreground">Loading settings...</div>
                </div>
            );
        }

        switch (activeCategory) {
            case "codeReview":
                return renderCodeReviewSettings();
            default:
                return null;
        }
    };

    const activeCategoryLabel =
        SETTINGS_CATEGORIES.find((cat) => cat.id === activeCategory)?.label ||
        "Settings";

    const MobileMenu = () => (
        <div className="md:hidden">
            {showMobileMenu ? (
                <div className="p-4">
                    <h3 className="mb-4 font-semibold">Settings Categories</h3>
                    <div className="space-y-2">
                        {SETTINGS_CATEGORIES.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.id}
                                    variant={item.id === activeCategory ? "default" : "ghost"}
                                    className="justify-start w-full"
                                    onClick={() => handleCategorySelect(item.id)}
                                    disabled={isLoading}
                                >
                                    <Icon className="mr-2 size-4" />
                                    {item.label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <header className="flex items-center gap-2 px-4 border-b h-16">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage
                                        onClick={() => setShowMobileMenu(true)}
                                        className="text-muted-foreground cursor-pointer"
                                    >
                                        Settings
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-semibold text-primary">
                                        {activeCategoryLabel}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <Scroller className="flex flex-col flex-1 px-4 py-4 max-h-[670px]">
                        {renderCategoryContent()}
                    </Scroller>
                </div>
            )}
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant="secondary" size="icon">
                                <SlidersHorizontal className="size-4" />
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Open code editor settings</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="p-0 md:max-w-[800px] lg:max-w-[900px] max-h-[90vh] md:max-h-[500px] overflow-hidden">
                <DialogTitle className="sr-only">Code Editor Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your code editor settings here.
                </DialogDescription>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                    <SidebarProvider className="h-full">
                        <Sidebar collapsible="none" className="flex h-full">
                            <SidebarContent className="h-full">
                                <SidebarGroup className="h-full">
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {SETTINGS_CATEGORIES.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <SidebarMenuItem key={item.id}>
                                                        <SidebarMenuButton
                                                            asChild
                                                            isActive={item.id === activeCategory}
                                                            onClick={() => setActiveCategory(item.id)}
                                                            disabled={isLoading}
                                                        >
                                                            <div>
                                                                <Icon />
                                                                <span>{item.label}</span>
                                                            </div>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                );
                                            })}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            </SidebarContent>
                        </Sidebar>
                        <main className="flex flex-col flex-1 h-[480px] overflow-hidden">
                            <header className="flex items-center gap-2 h-16 shrink-0">
                                <div className="flex items-center gap-2 px-4">
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>Settings</BreadcrumbPage>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage className="font-semibold text-primary">
                                                    {activeCategoryLabel}
                                                </BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </header>
                            <Scroller className="flex flex-col flex-1 px-4">
                                {renderCategoryContent()}
                            </Scroller>
                        </main>
                    </SidebarProvider>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden h-[80vh]">
                    <MobileMenu />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CodeEditorSettings;
