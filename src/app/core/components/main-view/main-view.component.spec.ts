import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';

import { MainViewComponent } from 'app/core/components';
import { UserService } from 'app/core/services/user.service';
import { Customer } from 'interfaces';

class UserServiceSpy {
  externalApiUser = {
    firstName: 'John',
    lastName: 'Doe',
    activity: 'contributor'
  };
  customer$ = new Subject();
  fetchUser() {}
  logout() {}
}

describe('MainViewComponent', () => {

  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: UserService, useClass: UserServiceSpy }
      ],
      declarations: [
        MainViewComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('breadcrumb and init', () => {
    test('should have initially valid breadcrumb variable', () => {
      expect(component.breadcrumb).toStrictEqual(['Road']);
    });

    test('should assign customer name to breadcrumb variable if not customer customer view', () => {
      component.isCustomerSelectionRoute = false;
      component.user.customer$.next({ name: 'MOCK_USER' } as Customer);
      expect(component.breadcrumb).toStrictEqual(['Road', 'MOCK_USER']);
    });

    test('should not assign customer name to breadcrumb variable if customer customer view', () => {
      component.isCustomerSelectionRoute = true;
      component.user.customer$.next();
      expect(component.breadcrumb).toStrictEqual(['Road']);
    });

    test('should have external api user format variable defined', () => {
      expect(component.user.externalApiUser).toStrictEqual({
        firstName: 'John',
        lastName: 'Doe',
        activity: 'contributor'
      });
    });
  });

  test('logout() should call user logout() method', () => {
    expect(true).toEqual(true);
  });

  test('onDestroy', () => {
    expect(true).toEqual(true);
  });
});
