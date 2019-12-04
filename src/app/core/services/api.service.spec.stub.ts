import { of } from 'rxjs';

import {
  Activity,
  ActivityTemplate,
  Customer, LeaderGroup,
  Target,
  TargetReview,
  TargetTemplate, ExternalApiUser, Task,
  User
} from 'interfaces';

export class ApiServiceSpecStub {

  auth = {
    login: () => of({}),
    logout: () => of({})
  };

  user = {
    me: () => of({} as User)
  };

  customers = {
    fetchAll: () => of([] as Customer[])
  };

  customersAuth = {
    switch: () => of({} as User)
  };

  targets = {
    fetchOne: () => of({} as Target),
    fetchAll: () => of([] as Target[]),
    fetchAllInProgress: () => of([] as Target[]),
    create: () => of({} as Target),
    update: () => of({} as Target),
    setStatus: () => of({}),
    getOwnedItemIds: () => of([])
  };

  targetTemplates = {
    fetchOne: () => of({} as TargetTemplate),
    fetchByFilter: () => of([] as TargetTemplate[]),
    fetchAllMine: () => of([] as TargetTemplate[]),
    create: () => of({} as TargetTemplate),
    update: () => of({} as TargetTemplate),
    delete: () => of({})
  };

  targetReview = {
    computeLeaderGroups: () => of({} as TargetReview),
    fetchComputedLeaderGroups: () => of({} as TargetReview),
    sendVote: () => of({}),
    skipApproval: () => of({})
  };

  activities = {
    fetchOne: () => of({} as Activity),
    fetchAllMine: () => of([] as Activity[]),
    create: () => of({} as Activity),
    update: () => of({} as Activity),
    delete: () => of({} as Activity)
  };

  activityTemplates = {
    fetchOne: () => of({} as ActivityTemplate),
    fetchByFilter: () => of([] as ActivityTemplate[]),
    fetchAllMine: () => of([] as ActivityTemplate[]),
    create: () => of({} as ActivityTemplate),
    update: () => of({} as ActivityTemplate),
    delete: () => of({} as ActivityTemplate)
  };

  tasks = {
    fetchOne: () => of({} as Task),
    fetchAllMine: () => of([] as Task[]),
    create: () => of({} as Task),
    update: () => of({} as Task)
  };

  leaderGroup = {
    fetchOne: () => of({} as LeaderGroup),
    fetchAllMine: () => of([] as LeaderGroup[]),
    fetchByFilter: () => of([] as LeaderGroup[]),
    create: () => of({} as LeaderGroup),
    update: () => of({} as LeaderGroup),
    delete: () => of({}),
    isNameAvailable: () => of({})
  };

  externalApiUsers = {
    fetchAll: () => of([] as ExternalApiUser[]),
  };
}
