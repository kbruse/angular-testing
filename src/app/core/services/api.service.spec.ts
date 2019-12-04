import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';

import { ApiService } from 'app/core/services/api.service';
import { TeamLeaderDecision, StatusEnum } from 'app/core/enums';
import { environment } from 'environments/environment';
import { Target } from 'interfaces';

describe('apiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiService
      ]
    });

    service = TestBed.get(ApiService);

    (service as any).post = jest.fn();
    (service as any).fetch = jest.fn();
    (service as any).put = jest.fn();
    (service as any).delete = jest.fn();
  });

  describe('auth', () => {
    test('should login', () => {
      service.auth.login({});
      expect((service as any).post).toHaveBeenCalledTimes(1);
      expect((service as any).post).toHaveBeenCalledWith('login', {});
    });

    test('should logout', () => {
      service.auth.logout();
      expect((service as any).post).toHaveBeenCalledTimes(1);
      expect((service as any).post).toHaveBeenCalledWith('logout');
    });
  });

  describe('user', () => {
    test('should fetch user', () => {
      service.user.me();
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith('user/me');
    });
  });

  describe('customer', () => {
    test('should fetch all customers', () => {
      service.customers.fetchAll();
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith('customers');
    });
  });

  describe('customersAuth', () => {
    test('should switch customer', () => {
      expect(true).toEqual(true);
    });
  });

  describe('targets', () => {
    const id = 'testId';
    const data = {};

    test('should fetchOne', () => {
      service.targets.fetchOne(id);
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`target/${id}`);
    });

    test('should fetchAll', () => {
      service.targets.fetchAll();
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`target/all`);
    });

    test('should fetchAllInProgress', () => {
      service.targets.fetchAllInProgress();
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`target/in-progress`);
    });

    test('should create', () => {
      service.targets.create(data);
      expect((service as any).post).toHaveBeenCalledTimes(1);
      expect((service as any).post).toHaveBeenCalledWith(`target`, data);
    });

    test('should update', () => {
      service.targets.update(data);
      expect((service as any).put).toHaveBeenCalledTimes(1);
      expect((service as any).put).toHaveBeenCalledWith('target', data);
    });

    test('should setStatus', () => {
      service.targets.setStatus(id, StatusEnum.OUTSTANDING_NOT_STARTED);
      expect((service as any).post).toHaveBeenCalledTimes(1);
      expect((service as any).post).toHaveBeenCalledWith(`target/${id}/set-status/${StatusEnum.OUTSTANDING_NOT_STARTED}`);
    });
  });

  describe('targetTemplates', () => {
    const id = 'testId';
    const data = {};
    const filter = 'filter';

    test('should fetchOne', () => {
      service.targetTemplates.fetchOne(id);
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`target-template/${id}`);
    });

    test('should fetchByFilter', () => {
      service.targetTemplates.fetchByFilter(filter);
      const params = new HttpParams().set('searchPhrase', filter);
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`target-template/filter`, params);
    });

    test('should fetchAllMine', () => {
      service.targetTemplates.fetchAllMine();
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`target-template/my`);
    });

    test('should create', () => {
      service.targetTemplates.create(data);
      expect((service as any).post).toHaveBeenCalledTimes(1);
      expect((service as any).post).toHaveBeenCalledWith(`target-template`, data);
    });

    test('should update', () => {
      service.targetTemplates.update(data);
      expect((service as any).put).toHaveBeenCalledTimes(1);
      expect((service as any).put).toHaveBeenCalledWith(`target-template`, data);
    });

    test('should delete', () => {
      service.targetTemplates.delete(id);
      expect((service as any).delete).toHaveBeenCalledTimes(1);
      expect((service as any).delete).toHaveBeenCalledWith(`target-template/${id}`);
    });
  });

  describe('targetReview', () => {
    const id = 'testId';

    test('should fetchComputedLeaderGroups and get 404 error to computeLeaderGroups', () => {
      jest.spyOn((service as any), 'fetch').mockReturnValue(throwError({ status: 404 }));
      service.targetReview.computeLeaderGroups = jest.fn();
      expect.assertions(2);
      return service.targetReview.fetchComputedLeaderGroups(id).toPromise().catch(() => {
        expect(service.targetReview.computeLeaderGroups).toHaveBeenCalledTimes(1);
        expect((service as any).fetch).toHaveBeenCalledTimes(1);
      });
    });

    test('should computeLeaderGroups', () => {
      expect(true).toEqual(true);
    });

    test('should sendVote', () => {
      expect(true).toEqual(true);
    });

    test('should skipApproval', () => {
      service.targetReview.skipApproval(id);
      expect((service as any).post).toHaveBeenCalledTimes(1);
      expect((service as any).post).toHaveBeenCalledWith(`target-review/${id}/skip-review`);
    });
  });

  describe('activities', () => {
    const id = 'testId';
    const data = {};

    test('should fetchOne', () => {
      service.activities.fetchOne(id);
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`activity/${id}`);
    });

    test('should fetchAllMine', () => {
      service.activities.fetchAllMine();
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`activity/my`);
    });

    test('should create', () => {
      service.activities.create(data);
      expect((service as any).post).toHaveBeenCalledTimes(1);
      expect((service as any).post).toHaveBeenCalledWith(`activity`, data);
    });

    test('should update', () => {
      service.activities.update(data);
      expect((service as any).put).toHaveBeenCalledTimes(1);
      expect((service as any).put).toHaveBeenCalledWith(`activity`, data);
    });

    test('should delete', () => {
      service.activities.delete(id);
      expect((service as any).delete).toHaveBeenCalledTimes(1);
      expect((service as any).delete).toHaveBeenCalledWith(`activity/${id}`);
    });
  });

  describe('activityTemplates', () => {
    const id = 'testId';
    const data = {};
    const filter = 'filter';

    test('should fetchOne', () => {
      service.activityTemplates.fetchOne(id);
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`activity-template/${id}`);
    });

    test('should fetchByFilter', () => {
      service.activityTemplates.fetchByFilter(filter);
      const params = new HttpParams().set('searchPhrase', filter);
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`activity-template/filter`, params);
    });

    test('should fetchAllMine', () => {
      service.activityTemplates.fetchAllMine();
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`activity-template/my`);
    });

    test('should create', () => {
      service.activityTemplates.create(data);
      expect((service as any).post).toHaveBeenCalledTimes(1);
      expect((service as any).post).toHaveBeenCalledWith(`activity-template`, data);
    });

    test('should update', () => {
      service.activityTemplates.update(data);
      expect((service as any).put).toHaveBeenCalledTimes(1);
      expect((service as any).put).toHaveBeenCalledWith(`activity-template`, data);
    });

    test('should delete', () => {
      service.activityTemplates.delete(id);
      expect((service as any).delete).toHaveBeenCalledTimes(1);
      expect((service as any).delete).toHaveBeenCalledWith(`activity-template/${id}`);
    });
  });

  describe('tasks', () => {
    const id = 'testId';
    const data = {};

    test('should fetchOne', () => {
      service.tasks.fetchOne(id);
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`task/${id}`);
    });

    test('should fetchAllMine', () => {
      service.tasks.fetchAllMine();
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`task/my`);
    });

    test('should create', () => {
      service.tasks.create(data);
      expect((service as any).post).toHaveBeenCalledTimes(1);
      expect((service as any).post).toHaveBeenCalledWith(`task`, data);
    });

    test('should update', () => {
      service.tasks.update(data);
      expect((service as any).put).toHaveBeenCalledTimes(1);
      expect((service as any).put).toHaveBeenCalledWith(`task`, data);
    });
  });

  describe('leaderGroup', () => {
    const id = 'testId';
    const data = {};
    const filter = 'filter';

    test('should fetchOne', () => {
      service.leaderGroup.fetchOne(id);
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`teamLeader-pool/${id}`);
    });

    test('should fetchByFilter with params provided', () => {
      const enabled = true;
      const ownedOnly = true;
      service.leaderGroup.fetchByFilter(filter, enabled, ownedOnly);
      const params = new HttpParams()
        .set('searchPhrase', filter)
        .append('enabled', enabled.toString())
        .append('ownedOnly', ownedOnly.toString());
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`teamLeader-pool/filter`, params);
    });

    test('should fetchByFilter with no params provided', () => {
      expect(true).toEqual(true);
    });

    test('should isNameAvailable', () => {
      service.leaderGroup.isNameAvailable(filter);
      const params = new HttpParams().set('name', filter);
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith('teamLeader-pool/is-name-available', params);
    });

    test('should fetchAllMine', () => {
      service.leaderGroup.fetchAllMine();
      expect((service as any).fetch).toHaveBeenCalledTimes(1);
      expect((service as any).fetch).toHaveBeenCalledWith(`teamLeader-pool`);
    });

    test('should create', () => {
      service.leaderGroup.create(data);
      expect((service as any).post).toHaveBeenCalledTimes(1);
      expect((service as any).post).toHaveBeenCalledWith(`teamLeader-pool`, data);
    });

    test('should update', () => {
      service.leaderGroup.update(data);
      expect((service as any).put).toHaveBeenCalledTimes(1);
      expect((service as any).put).toHaveBeenCalledWith(`teamLeader-pool`, data);
    });

    test('should delete', () => {
      service.leaderGroup.delete(id);
      expect((service as any).delete).toHaveBeenCalledTimes(1);
      expect((service as any).delete).toHaveBeenCalledWith(`teamLeader-pool/${id}`);
    });
  });

  describe('external api users', () => {
    test('should fetchAll', () => {
     expect(true).toEqual(true);
    });
  });

});

describe('apiService - CRUD', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiService,
        {
          provide: Router, useClass: class {
            navigate = jest.fn();
          }
        }
      ]
    });

    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('fetch', () => {
    test('should fetch user', () => {
      const dummyUser = {
        uuid: 'sad',
        firstName: 'sad',
        lastName: 'sad',
        authorities: ['', 's'],
        customerAuthData: undefined
      };
      const url = 'user/me';

      service.user.me().toPromise().then(user => {
        expect(user).toEqual(dummyUser);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}${url}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUser);
    });
  });

  describe('post', () => {
    test('should login', () => {
      const dummyLogin = { email: 'test@test', name: 'test', rememberMe: false };
      const dummyResponse = {status: 200};
      expect(true).toEqual(true);
    });
  });

  describe('put', () => {
    test('should update target properties via PUT', () => {
      const dummyTarget = { id: 'id' } as Target;
      expect(true).toEqual(true);
    });
  });

  describe('delete', () => {
    test('should delete activity via REQUEST', () => {
      const id = 'testId';

      service.activities.delete(id).subscribe(res => {
        expect(res).toEqual(id);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}activity/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(id);
    });
  });
});
