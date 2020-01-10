import Condition from './condition';
import ConditionalObject from './conditional_object';
import RequestProgress from './request_progress';
import StackCost from './stack_cost';

export default class Request extends ConditionalObject implements RequestInterface {
  id: number;
  name: string;
  travelerRoleRequesting: string;
  description: string;
  conditionsToRequest: Condition[];
  costsToComplete: StackCost[];
  conditionsToComplete: Condition[];
  progress: RequestProgress;
  reward: string;

  constructor(request: RequestInterface) {
    super(request);
    Object.assign(this, request);
  }
}

interface RequestInterface {
  id: number;
  name: string;
  travelerRoleRequesting: string;
  description: string;
  conditionsToRequest: Condition[];
  costsToComplete: StackCost[];
  conditionsToComplete: Condition[];
  progress: RequestProgress;
  reward: string;
}
