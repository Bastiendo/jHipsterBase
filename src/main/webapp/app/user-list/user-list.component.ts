import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'app/_services/user.service';
import { User } from 'app/_models/User.model';

@Component({
  selector: 'jhi-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  userSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe((users: User[]) => {
      this.users = users;
    });
    this.userService.emitUser();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
