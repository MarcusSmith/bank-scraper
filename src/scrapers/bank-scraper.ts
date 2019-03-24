import * as fs from 'fs';
import { Browser, launch, Page } from 'puppeteer';

import { UnauthenticatedError } from '../errors/unauthenticated-error';
import { Account } from '../models/account';
import { Transaction } from '../models/transaction';

// tslint:disable-next-line:max-line-length
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';
const notABot = fs.readFileSync(`${__dirname}/not-a-bot.js`, 'utf8');

export abstract class BankScraper {
  protected browser: Browser;
  protected page: Page;

  constructor(
    private baseURL: string,
    private usernameSelector: string,
    private passwordSelector: string,
    private loginButtonSelector: string) {
  }

  public async setup() {
    this.browser = await launch({
      args: [`--user-agent=${userAgent}`],
      headless: true
    });

    this.page = await this.browser.newPage();
    await this.page.evaluateOnNewDocument(notABot);
  }

  public async tearDown() {
    await this.page.close();
    await this.browser.close();
  }

  public async login(username: string, password: string) {
    await this.page.goto(this.baseURL);
    await this.page.type(this.usernameSelector, username, { delay: 20 });
    await this.page.type(this.passwordSelector, password, { delay: 20 });
    await this.page.$eval(this.loginButtonSelector, (button: any) => button.click());
    await this.page.waitForNavigation();

    try {
      await this.checkAuthenticated();
    } catch (err) {
      throw new UnauthenticatedError(err.message);
    }
  }

  public abstract async getAccounts(): Promise<Account[]>;
  public abstract async getRecentTransactions(account: Account): Promise<Transaction[]>;
  // FIXME: Transactions in date range?

  /// Should throw if unauthenticated
  protected abstract checkAuthenticated(): Promise<void>;
}
