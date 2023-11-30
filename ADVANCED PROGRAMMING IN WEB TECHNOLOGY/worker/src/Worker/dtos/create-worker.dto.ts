import { WorkerProfile } from "../module/workerProfile.entity";

export class CreateWorkerProfileDto {
  workerid: number;
  workername: string;
  workertitle: string;
  workerusername: string;
  workerpassword: string;
  worker: Worker;
}

export class CreateWorkerDto {
  id: number;
  name: string;
  profile: WorkerProfile;
  worker: Worker;
}
