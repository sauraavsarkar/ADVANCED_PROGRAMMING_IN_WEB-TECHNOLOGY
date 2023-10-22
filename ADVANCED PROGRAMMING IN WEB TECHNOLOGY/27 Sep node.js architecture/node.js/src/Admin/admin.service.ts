import { Injectable } from '@nestjs/common';

@Injectable()

export class adminService {

  getAdmin(): string {
    return 'Hello World from admin!';
  }

  getIndex(): string {
    return 'Hello World from Index!';
  }

  PostIndex(): string {
    return 'Hello World from Post Index!';
  }
}
