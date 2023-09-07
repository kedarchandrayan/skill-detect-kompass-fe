export type Mission = {
  id: number;
  name: string;
  resumeFolderUrl: string;
  skills: Array<string>;
  totalExperienceDetails: string;
  minCGPA?: number;
  customSelectionCriteria?: string;
  reportUrl?: string;
  totalCount?: number;
  processedCount?: number;
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
