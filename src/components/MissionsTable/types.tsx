export type Mission = {
  id: number;
  name: string;
  resumeFolder: string;
  skillIds: Array<number>;
  totalExperienceDetails: Array<ExperienceDetails>;
  minCGPA?: number;
  customSelectionCriteria?: string;
  reportUrl?: string;
  totalResumes?: number;
  processedResumes?: number;
  status: MissionStatus;
  createdAt: number;
  updatedAt: number;
};

export type ExperienceDetails = {
  op: ExperienceOperator;
  value: number;
};

export type ExperienceOperator = "<=" | ">=";

export type MissionStatus = "COMPLETED" | "DELETED" | "ONGOING";

export type Skill = {
  id: number;
  name: string;
};
