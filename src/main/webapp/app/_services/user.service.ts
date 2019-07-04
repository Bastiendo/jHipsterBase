import { User } from 'app/_models/User.model';
import { Subject } from 'rxjs';

export class UserService {
  private users: User[];
  userSubject = new Subject<User[]>();

  emitUser() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUser();
  }
}
