import { Injectable } from '@nestjs/common';
import { AdminInfo } from './admin.dto';

@Injectable()

export class adminService {
  updateAdminById(id: number, data: AdminInfo): object {
      throw new Error('Method not implemented.');
  }

  getAdmin(): string {
    return 'Hello World from admin!';
  }

}