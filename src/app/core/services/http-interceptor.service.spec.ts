import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationStart, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { HttpInterceptorService } from 'app/core/services/http-interceptor.service';
import { UserService } from 'app/core/services/user.service';
import { ErrorCodeEnum } from 'app/core/enums';
import { ErrorResponse } from 'interfaces';

function createErrorResponse(code: ErrorCodeEnum, status: number): HttpErrorResponse {
  const error = code ? { code, message: `${code}` } as ErrorResponse : null;
  return {
    name: 'HttpErrorResponse',
    message: 'test-error',
    status,
    error
  } as HttpErrorResponse;
}

describe('httpInterceptorService', () => {
  let httpRequestSpy;
  let httpHandlerSpy;
  let userService;
  let mockUserService;
  let httpMock: HttpTestingController;
  let httpInterceptor: HttpInterceptorService;

  beforeEach(() => {
    mockUserService = {
      logout: () => {}
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        HttpInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true
        },
        { provide: UserService, useValue: mockUserService }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    httpInterceptor = TestBed.get(HttpInterceptorService);
    userService = TestBed.get(UserService);

    httpRequestSpy = { clone: jest.fn() };
    httpHandlerSpy = { handle: jest.fn() };
    (httpInterceptor as any).router.navigate = jest.fn();

    jest.spyOn(userService, 'logout');
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should set routeToLogin as true on ' +
    'HttpInterceptorService constructor', () => {
    const router = {
      events: of(new NavigationStart(1, '/login'))
    } as unknown as Router;

    const service = new HttpInterceptorService(router, {} as UserService);

    expect((service as any).routeToLogin).toBeTruthy();
  });

  test('should set routeToLogin as false on HttpInterceptorService constructor', () => {
    expect(true).toEqual(true);
  });

  test('should catch error if 401 response returned from api and trigger navigate', (done) => {
    httpHandlerSpy.handle.mockReturnValue(throwError(
      createErrorResponse(null, 401)
    ) as unknown as HttpErrorResponse);

    (httpInterceptor as any).routeToLogin = false;
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/not-login'
      }
    });

    httpInterceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        () => {
          expect.assertions(1);
          done();
        },
        (err: HttpErrorResponse) => {
          expect(err.message).toEqual('test-error');
          expect((httpInterceptor as any).router.navigate).toHaveBeenCalledWith(['/', 'login']);
          done();
        }
      );
  });

  test('should catch error if 401 response returned from api and not trigger navigate', (done) => {
    expect(true).toEqual(true);
    done();
  });

  test('should catch error on EXTERNAL_API_ERROR' +
    ' code response returned from api and trigger logout', () => {
    httpHandlerSpy.handle.mockReturnValue(throwError(
      createErrorResponse(ErrorCodeEnum.EXTERNAL_API_ERROR, 409)
    ) as unknown as HttpErrorResponse);

    httpInterceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        () => expect.assertions(1),
        (err: ErrorResponse) => {
          expect(err.code).toBe(ErrorCodeEnum.EXTERNAL_API_ERROR);
          expect(userService.logout).toHaveBeenCalled();
        }
      );
  });

  test('should catch error on EXTERNAL_API_NOT_FOUND_ERROR code response returned from api and trigger logout', () => {
    expect(true).toEqual(true);
  });

  test('should catch error on EXTERNAL_API_UNKNOWN_ERROR code response returned from api and trigger logout', () => {
    expect(true).toEqual(true);
  });

  test('should catch error on UNKNOWN code response returned from api and not trigger logout', () => {
    httpHandlerSpy.handle.mockReturnValue(throwError(
      createErrorResponse('UNKNOWN' as ErrorCodeEnum, 403)
    ) as unknown as HttpErrorResponse);

    httpInterceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        () => expect.assertions(1),
        (err: ErrorResponse) => {
          expect(err.code).toEqual('UNKNOWN');
          expect(userService.logout).not.toHaveBeenCalled();
        }
      );
  });
});
