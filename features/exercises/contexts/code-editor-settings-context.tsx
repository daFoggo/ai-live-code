"use client";

import type React from "react";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { toast } from "sonner";
import { DEFAULT_SETTINGS } from "../utils/constants";
import type { ICodeEditorSettings } from "../utils/types";

interface ICodeEditorSettingsContextType {
    settings: ICodeEditorSettings;
    updateSetting: <K extends keyof ICodeEditorSettings>(
        category: K,
        key: keyof ICodeEditorSettings[K],
        value: ICodeEditorSettings[K][keyof ICodeEditorSettings[K]],
    ) => void;
    resetSettings: () => void;
    resetCategory: (category: keyof ICodeEditorSettings) => void;
    isLoading: boolean;
    error: string | null;
}

const CodeEditorSettingsContext = createContext<
    ICodeEditorSettingsContextType | undefined
>(undefined);

const STORAGE_KEY = "codeEditorSettings";

interface ICodeEditorSettingsProviderProps {
    children: React.ReactNode;
    storageKey?: string;
    defaultSettings?: ICodeEditorSettings;
}

export const CodeEditorSettingsProvider: React.FC<ICodeEditorSettingsProviderProps> = ({
    children,
    storageKey = STORAGE_KEY,
    defaultSettings = DEFAULT_SETTINGS,
}) => {
    const [settings, setSettings] =
        useState<ICodeEditorSettings>(defaultSettings);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSettings = () => {
            try {
                setIsLoading(true);
                const savedData = localStorage.getItem(storageKey);

                if (savedData) {
                    const parsedData = JSON.parse(savedData);

                    if (parsedData.settings) {
                        setSettings({ ...defaultSettings, ...parsedData.settings });
                    }
                }

                setError(null);
            } catch (err) {
                toast.error("Failed to load settings from localStorage");
                console.log("Error loading settings:", err);
                setError("Failed to load settings");
                setSettings(defaultSettings);
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, [storageKey, defaultSettings]);

    // Save settings to localStorage whenever settings change
    useEffect(() => {
        if (!isLoading) {
            try {
                const dataToStore = {
                    settings,
                    timestamp: Date.now(),
                };

                localStorage.setItem(storageKey, JSON.stringify(dataToStore));
                setError(null);
            } catch (err) {
                console.error("Failed to save settings to localStorage:", err);
                setError("Failed to save settings");
            }
        }
    }, [settings, storageKey, isLoading]);

    const updateSetting = useCallback(
        <K extends keyof ICodeEditorSettings>(
            category: K,
            key: keyof ICodeEditorSettings[K],
            value: ICodeEditorSettings[K][keyof ICodeEditorSettings[K]],
        ) => {
            setSettings((prev) => ({
                ...prev,
                [category]: {
                    ...prev[category],
                    [key]: value,
                },
            }));
        },
        [],
    );

    const resetSettings = useCallback(() => {
        setSettings(defaultSettings);
    }, [defaultSettings]);

    const resetCategory = useCallback(
        (category: keyof ICodeEditorSettings) => {
            setSettings((prev) => ({
                ...prev,
                [category]: defaultSettings[category],
            }));
        },
        [defaultSettings],
    );

    const contextValue: ICodeEditorSettingsContextType = {
        settings,
        updateSetting,
        resetSettings,
        resetCategory,
        isLoading,
        error,
    };

    return (
        <CodeEditorSettingsContext.Provider value={contextValue}>
            {children}
        </CodeEditorSettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(CodeEditorSettingsContext);

    if (context === undefined) {
        throw new Error("useSettings must be used within a CodeEditorSettingsProvider");
    }

    return context;
};