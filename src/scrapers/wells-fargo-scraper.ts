import { Account } from '../models/account';
import { Transaction } from '../models/transaction';
import { BankScraper } from './bank-scraper';

export class WellsFargoScraper extends BankScraper {
  public static bankName = 'wf';

  constructor() {
    super('https://www.wellsfargo.com', '#userid', '#password', '#btnSignon');
  }

  public getAccounts(): Promise<Account[]> {
    throw new Error('Method not implemented.');
  }

  public getRecentTransactions(account: Account): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }

  protected async checkAuthenticated(): Promise<void> {
    const url = new URL(this.page.url());

    if (url.pathname.startsWith('/auth/login')) {
      throw new Error('Invalid login');
    }
  }
}
