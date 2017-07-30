import { expect } from 'chai';
import { defineSupportCode } from 'cucumber';
import { AppPage } from './app.po';

defineSupportCode(({Given, When, Then, Before}) => {
  let app: AppPage;

  Before(() => {
    app = new AppPage();
  });

  When('I visit the root page',
    () => app.navigateTo());

  Then('I see an imprint section',
    () => app.getImprintText()
      .then(text => expect(text.startsWith('impressum: ')).to.be.true));

});
