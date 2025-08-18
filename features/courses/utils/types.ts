import type { ISession } from "@/features/sessions";

export interface ICourse {
  id: string;
  name: string;
  chapters: IChapter[];
}

export interface IChapter {
  id: string;
  name: string;
  sessions: ISession[];
}
