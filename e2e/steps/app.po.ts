import { browser, element, by } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getImprintText() {
    return element(by.css('p')).getText();
  }
}
