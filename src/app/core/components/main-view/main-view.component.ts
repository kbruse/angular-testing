import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from 'app/core/services/user.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html'
})
export class MainViewComponent implements OnInit, OnDestroy {

  breadcrumb: string[] = ['Road'];
  isCustomerSelectionRoute = false;
  private subscriptions = new Subscription();

  constructor(public readonly user: UserService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.user.fetchUser();
    this.isCustomerSelectionRoute = this.router.url.includes('customers');
    this.subscriptions.add(
      this.user.customer$.subscribe(customer => {
        this.isCustomerSelectionRoute ? this.breadcrumb = ['Road'] : this.breadcrumb = ['Road', customer.name];
      })
    );
  }

  logout(): void {
    this.user.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
