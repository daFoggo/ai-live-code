export interface ISession {
  id: string;
  name: string;
  duration: number;
  videoUrl?: string;
  materialsUrl?: string;
  practiceUrl?: string;
  description?: string;
}
