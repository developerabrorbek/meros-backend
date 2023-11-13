import { Status } from "@prisma/client"

export declare interface UpdateBannerRequest {
  id: string
  image? : string
  status?: Status
}