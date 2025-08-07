export interface IAppInfo {
  name?: string;
  description?: string;
  publicUrl?: string;
  ogImage?: string;
  githubUrl?: string;
  githubAuthor?: string;
  githubRepo?: string;
  authorWebsite?: string;
  contactEmail?: string;
  appVersion?: string;
}

export const APP_INFO: IAppInfo = {
  name: "AI Live Code",
  description:
    "Essential components and features builts with shadcn/ui for kickstarting your Next.js projects.",
  publicUrl: "https://ai-live-code.vercel.app",
  ogImage: "https://ai-live-code.vercel.app/og-image.png",
  githubUrl: "https://github.com/daFoggo/ai-live-code",
  githubAuthor: "daFoggo",
  githubRepo: "ai-live-code",
  authorWebsite: "https://github.com/daFoggo",
  contactEmail: "ai-live-code@gmail.com",
  appVersion: "0.1.0-alpha",
};
