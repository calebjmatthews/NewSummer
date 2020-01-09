import Condition from './condition';
import ConditionalObject from './conditional_object';
import RequestProgress from './request_progress';

export default class Request extends ConditionalObject implements RequestInterface {
  name: string;
  travelerRoleRequesting: string;
  description: string;
  conditionsToRequest: Condition[];
  conditionsToComplete: Condition[];
  progress: RequestProgress;
  reward: string;

  constructor(request: RequestInterface) {
    super(request);
    Object.assign(this, request);
  }
}

interface RequestInterface {
  name: string;
  travelerRoleRequesting: string;
  description: string;
  conditionsToRequest: Condition[];
  conditionsToComplete: Condition[];
  progress: RequestProgress;
  reward: string;
}
