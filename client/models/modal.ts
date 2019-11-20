export default class Modal implements ModalInterface {
  type: string;
  title: string;
  messages: string[];
  subtitle?: string;

  constructor(modal: ModalInterface) {
    Object.assign(this, modal);
  }
}

interface ModalInterface {
  type: string;
  title: string;
  messages: string[];
  subtitle?: string;
}
