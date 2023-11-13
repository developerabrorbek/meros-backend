import { BannerPriority, Status } from '@prisma/client';

export declare interface CreateBannerRequest {
  image: string;
  status: Status;
  priority: BannerPriority;
}
