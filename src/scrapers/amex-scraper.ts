import { Account } from '../models/account';
import { Transaction } from '../models/transaction';
import { BankScraper } from './bank-scraper';

export class AmexScraper extends BankScraper {
  public static bankName = 'amex';

  constructor() {
    super('https://www.americanexpress.com/', '#login-user', '#login-password', '#login-submit');
  }

  public getAccounts(): Promise<Account[]> {
    throw new Error('Method not implemented.');
  }

  public getRecentTransactions(account: Account): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }

  protected async checkAuthenticated(): Promise<void> {
    const url = new URL(this.page.url());

    if (url.hostname !== 'global.americanexpress.com') {
      throw new Error('Invalid login');
    }
  }
}
