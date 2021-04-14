import { IFullProfile } from "../../domain";

export class FullProfileModel implements IFullProfile {
  readonly email: string;
  // it can be more data here like phone, slack account ad more
  readonly publicId: string;

  readonly phone: string;
  readonly slackId: string;
}