// <reference types="Cypress" />
import { Actor, BrowseTheWeb, Navigate, See } from 'cypress-screenplay';

describe('Google homepage', () => {
  it('should display the correct text', () => {
    const actor = new Actor();
    actor.whoCan(BrowseTheWeb.with(cy))
      .attemptsTo(
        Navigate.to('https://www.google.com'),
        See.if(Text.of('#hplogo')).contains('Google')
      );
  });
});
