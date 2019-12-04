import { TeamLeaderDecision, TeamLeaderStatus, StatusServerResponseEnum, ActivityTaskStatus, Trigger } from 'app/core/enums';

interface Duration {
  minDaysDuration: number;
  maxDaysDuration: number;
  normDaysDuration: number;
}

interface Sequence {
  inputs?: string[];
  outputs?: string[];
  trigger: Trigger;
}

interface Date {
  creationDate?: string;
  lastUpdateDate?: string;
}

interface Template {
  id: string;
  name: string;
  version: number;
  isModified: boolean;
}

interface TargetBase extends Duration, Date {
  id?: string;
  creatorId?: number;
  name: string;
  description: string;
}

interface ActivityBase extends Duration, Sequence, Date {
  id?: string;
  creatorId?: number;
  targetId?: string;
  sequenceId: string;
  name: string;
  description: string;
  outcome: string;
}

interface TaskBase extends Duration, Sequence, Date {
  id?: string;
  creatorId?: number;
  action?: string;
  sequenceId: string;
  name: string;
  description: string;
  outcome: string;
}

export interface Target extends TargetBase {
  priority: number;
  startDate: string | null;
  creationDate: string;
  lastUpdateDate: string;
  minDaysDuration: number;
  normDaysDuration: number;
  maxDaysDuration: number;
  deadline: string | null;
  activities: Activity[];
  leaderGroup: LeaderGroup;
  atRisk: boolean;
  status: StatusServerResponseEnum;
  template: Template | null;
  timeliness: string;
  trend: string;
}

export interface TargetTemplate extends TargetBase {
  version?: number;
  enabled: boolean;
  leaderGroup: LeaderGroup;
  type: 'Target';
  activities: ActivityTemplate[];
}

export interface TargetReview {
  activitiesContributions: ReviewedLeaderGroup[];
  targetContribution: ReviewedLeaderGroup;
  tasksContributions: ReviewedLeaderGroup[];
  resultingVote: TeamLeaderDecision;
  isReviewSkipped?: boolean;
  reviewSkipperFirstName?: string;
  reviewSkipperLastName?: string;
  reviewCloseDate: string;
  targetDeadline: string;
}

export interface ReviewedLeaderGroup {
  id: string;
  roadItemId: string;
  roadItemName: string;
  leaderGroup: {
    id: string;
    name: string
  };
  teamLeaderVotes: TeamLeaderVote[];
  resultingVote?: string;
}

export interface TeamLeaderVote {
  teamLeaderExternalId: string;
  firstName: string;
  lastName: string;
  vote: TeamLeaderDecision;
  lastUpdateDate?: string;
}

export interface Activity extends ActivityBase {
  tasks: Task[];
  leaderGroup: LeaderGroup;
  status: ActivityTaskStatus;
  atRisk: boolean;
  startDate: string;
  dueDate: string;
  template: Template | null;
}

export interface ActivityTemplate extends ActivityBase {
  version?: number;
  enabled: boolean;
  leaderGroup: LeaderGroup;
  type: 'ACTIVITY';
  tasks: TaskTemplate[];
}

export interface Task extends TaskBase {
  activityId?: string;
  leaderGroup: LeaderGroup;
  status: ActivityTaskStatus;
  atRisk: boolean;
  startDate: string;
  dueDate: string;
}

export interface TaskTemplate extends TaskBase {
  activityId?: string;
  leaderGroup?: number;
}

export interface LeaderGroup {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  teamLeaders?: TeamLeader[];
  membersCount?: number;
  creationDate?: string;
  lastUpdateDate?: string;
}

export interface TeamLeader {
  externalId: string;
  firstName: string;
  lastName: string;
  status: TeamLeaderStatus;
  isLeader: boolean;
}

export interface TaskDialogData {
  task: any;
  taskNames: string[];
  activityOwner: LeaderGroup;
  isTemplate: boolean;
  permissionSet: string[];
}

export interface ActivityDialogData {
  activity: any;
  activityNames: string[];
  isTemplate: boolean;
  permissionSet: string[];
}
