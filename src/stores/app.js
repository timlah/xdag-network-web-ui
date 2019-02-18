import { action, observable } from 'mobx';

class AppStore {
  @observable hasError = false;

  @observable modalIsOpen = false;

  @observable errorMessage;

  @observable modalContent;

  @action.bound
  openModal(content) {
    this.modalContent = content;
    this.modalIsOpen = true;
  }

  @action.bound
  closeModal() {
    this.modalIsOpen = false;
  }

  @action.bound
  setError(message) {
    this.hasError = true;
    this.errorMessage = message;
  }
}

export default new AppStore();
