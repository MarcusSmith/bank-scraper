import atob from 'atob';
import express from 'express';

import { NotFoundError } from '../errors/not-found-error';
import { UnauthenticatedError } from '../errors/unauthenticated-error';

import { AmexScraper } from '../scrapers/amex-scraper';
import { BankScraper } from '../scrapers/bank-scraper';
import { WellsFargoScraper } from '../scrapers/wells-fargo-scraper';

function bankScraperForName(name: string): BankScraper {
  switch (name) {
    case AmexScraper.bankName:
      return new AmexScraper();
    case WellsFargoScraper.bankName:
      return new WellsFargoScraper();
    default:
      throw new NotFoundError();
  }
}

export async function login(req: express.Request, res: express.Response, next: any) {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Basic ')) {
      throw new UnauthenticatedError('Basic auth required');
    }

    const credentials = atob(auth.slice(6)).split(':');

    const bankName = req.params.bankName;
    const scraper = bankScraperForName(bankName);
    await scraper.setup();
    await scraper.login(credentials[0], credentials[1]);

    res.locals.scraper = scraper;
    return next();
  } catch (err) {
    return next(err);
  }
}
