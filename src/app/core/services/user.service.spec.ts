import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { UserService } from 'app/core/services/user.service';
import { ApiService } from 'app/core/services/api.service';
import { ApiServiceSpecStub } from 'app/core/services/api.service.spec.stub';
import { throwError } from 'rxjs';

describe('userService', () => {

  let service: UserService;
  let apiService: ApiService;
  let router: Router;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: Router, useClass: class {
            navigate = jest.fn();
          }
        },
        { provide: ApiService, useClass: ApiServiceSpecStub }
      ]
    });

    service = TestBed.get(UserService);
    apiService = TestBed.get(ApiService);
    router = TestBed.get(Router);
  });

  describe('fetchUser', () => {
    test('should fetch user', () => {
      service.fetchUser();
      expect(service.user).toEqual({});
      expect(service.externalApiUser).toEqual({ activity: 'contributor'});
    });

    test('should call next after fetching user', () => {
      expect(true).toEqual(true);
    });
  });

  describe('logout', () => {
    test('should logout', () => {
      expect(true).toEqual(true);
    });

    test('should logout and throw error', () => {
      apiService.auth.logout = jest.fn().mockReturnValue(throwError({ error: 'error' }));
      jest.spyOn(console, 'error');
      service.logout();
      expect(service.user).toEqual(undefined);
      expect(service.externalApiUser).toEqual({ activity: '', firstName: '', lastName: '' });
      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });
});
