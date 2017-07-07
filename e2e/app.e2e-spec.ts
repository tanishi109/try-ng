import { TryNgPage } from './app.po';

describe('try-ng App', () => {
  let page: TryNgPage;

  beforeEach(() => {
    page = new TryNgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
