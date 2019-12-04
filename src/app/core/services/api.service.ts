import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { TeamLeaderDecision } from 'app/core/enums';
import {
  Activity,
  ActivityTemplate,
  Customer,
  LeaderGroup,
  Target,
  TargetReview,
  TargetTemplate,
  ExternalApiUser,
  Task,
  User
} from 'interfaces';

@Injectable({ providedIn: 'root' })
export class ApiService {

  auth = {
    login: (data) => this.post('login', data),
    logout: () => this.post('logout')
  };

  user = {
    me: () => this.fetch<User>('user/me')
  };

  customers = {
    fetchAll: () => this.fetch<Customer[]>('customers')
  };

  customersAuth = {
    switch: (customerUuid: string) => this.post<User>(`customers-auth/${customerUuid}/switch`)
  };

  targets = {
    fetchOne: (id: string) => this.fetch<Target>(`target/${id}`),
    fetchAll: () => this.fetch<Target[]>(`target/all`),
    fetchAllInProgress: () => this.fetch<Target[]>(`target/in-progress`),
    create: (data) => this.post<Target>(`target`, data),
    update: (data) => this.put<Target>(`target`, data),
    setStatus: (id: string, status: string) => this.post<null>(`target/${id}/set-status/${status}`),
    getOwnedItemIds: (id: string) => this.fetch<string[]>(`target/${id}/owned-items`)
  };

  targetTemplates = {
    fetchOne: (id: string) => this.fetch<TargetTemplate>(`target-template/${id}`),
    fetchByFilter: (filter: string) => {
      const params = new HttpParams().set('searchPhrase', filter);
      return this.fetch<TargetTemplate[]>(`target-template/filter`, params);
    },
    fetchAllMine: () => this.fetch<TargetTemplate[]>(`target-template/my`),
    create: (data) => this.post<TargetTemplate>(`target-template`, data),
    update: (data) => this.put<TargetTemplate>(`target-template`, data),
    delete: (id: string) => this.delete<TargetTemplate>(`target-template/${id}`)
  };

  targetReview = {
    computeLeaderGroups: (id: string) => this.post<TargetReview>(
      `target-review/${id}/recompute-contributions`),
    fetchComputedLeaderGroups: (id: string) => this.fetch(`target-review/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return this.targetReview.computeLeaderGroups(id);
        }
      })
    ),
    sendVote: (targetId: string, vote: TeamLeaderDecision) => {
      const params = new HttpParams().set('vote', vote);
      return this.post<null>(`target-review/${targetId}/vote`, params);
    },
    skipApproval: (targetId: string) => this.post(`target-review/${targetId}/skip-review`)
  };

  activities = {
    fetchOne: (id: string) => this.fetch<Activity>(`activity/${id}`),
    fetchAllMine: () => this.fetch<Activity[]>(`activity/my`),
    create: (data) => this.post<Activity>(`activity`, data),
    update: (data) => this.put<Activity>(`activity`, data),
    delete: (id: string) => this.delete<Activity>(`activity/${id}`)
  };

  activityTemplates = {
    fetchOne: (id: string) => this.fetch<ActivityTemplate>(`activity-template/${id}`),
    fetchByFilter: (filter: string) => {
      const params = new HttpParams().set('searchPhrase', filter);
      return this.fetch<ActivityTemplate[]>(`activity-template/filter`, params);
    },
    fetchAllMine: () => this.fetch<ActivityTemplate[]>(`activity-template/my`),
    create: (data) => this.post<ActivityTemplate>(`activity-template`, data),
    update: (data) => this.put<ActivityTemplate>(`activity-template`, data),
    delete: (id: string) => this.delete<ActivityTemplate>(`activity-template/${id}`)
  };

  tasks = {
    fetchOne: (id: string) => this.fetch<Task>(`task/${id}`),
    fetchAllMine: () => this.fetch<Task[]>(`task/my`),
    create: (data) => this.post<Task>(`task`, data),
    update: (data) => this.put<Task>(`task`, data)
  };

  leaderGroup = {
    fetchOne: (id: string) => this.fetch<LeaderGroup>(`teamLeader-pool/${id}`),
    fetchAllMine: () => this.fetch<LeaderGroup[]>(`teamLeader-pool`),
    fetchByFilter: (filter: string, enabled: boolean = true, ownedOnly: boolean = false) => {
      const params = new HttpParams()
        .set('searchPhrase', filter)
        .append('enabled', enabled.toString())
        .append('ownedOnly', ownedOnly.toString());
      return this.fetch<LeaderGroup[]>(`teamLeader-pool/filter`, params);
    },
    isNameAvailable: (filter: string) => {
      const params = new HttpParams().set('name', filter);
      return this.fetch<boolean>('teamLeader-pool/is-name-available', params);
    },
    create: (data) => this.post<LeaderGroup>(`teamLeader-pool`, data),
    update: (data) => this.put<LeaderGroup>(`teamLeader-pool`, data),
    delete: (id: string) => this.delete<void>(`teamLeader-pool/${id}`)
  };

  externalApiUsers = {
    fetchAll: (search: string) => {
      const params = new HttpParams().set('search', search);
      return this.fetch<ExternalApiUser[]>(`users`, params);
    },
  };

  constructor(private readonly http: HttpClient) {}

  private fetch<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${url}`, { params });
  }

  private post<T>(url: string, data?): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${url}`, data);
  }

  private put<T>(url: string, data): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}${url}`, data);
  }

  private delete<T>(url: string, body?: any): Observable<T> {
    return this.http.request('delete', `${environment.apiUrl}${url}`, { body }) as Observable<T>;
  }
}
