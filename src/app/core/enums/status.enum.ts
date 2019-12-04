export enum StatusServerResponseEnum {
  DRAFT = 'DRAFT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  OUTSTANDING_NOT_STARTED = 'OUTSTANDING_NOT_STARTED',
  OUTSTANDING_ONGOING = 'OUTSTANDING_ONGOING',
  OUTSTANDING_STUCK = 'OUTSTANDING_STUCK',
  OUTSTANDING_DONE = 'OUTSTANDING_DONE',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

export enum StatusEnum {
  DRAFT = 'Draft',
  UNDER_REVIEW = 'Under review',
  OUTSTANDING_ONGOING = 'Ongoing',
  OUTSTANDING_DONE = 'Done',
  OUTSTANDING_NOT_STARTED = 'Not started',
  OUTSTANDING_STUCK = 'Stuck',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled'
}

export enum ActivityTaskStatus {
  NOT_STARTED = 'NOT_STARTED',
  ONGOING = 'ONGOING',
  STUCK = 'STUCK',
  DONE = 'DONE',
  REJECTED = 'REJECTED',
}

export enum ActivityTaskStatusDisplay {
  NOT_STARTED = 'Not started',
  ONGOING = 'Ongoing',
  STUCK = 'Stuck',
  DONE = 'Done',
  REJECTED = 'Rejected',
}
