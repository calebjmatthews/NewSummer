export default class RequestProgress implements RequestProgressInterface {
  props: any[];
  values: string[];

  constructor(requestProgress: RequestProgressInterface) {
    Object.assign(this, requestProgress);
  }
}

interface RequestProgressInterface {
  props: any[];
  values: string[];
}
