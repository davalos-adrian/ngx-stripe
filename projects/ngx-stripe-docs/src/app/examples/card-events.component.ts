import { Component, inject } from '@angular/core';

import {
  StripeCardComponent,
  StripeElementsDirective,
  StripeCardNumberComponent,
  StripeCardExpiryComponent,
  StripeCardCvcComponent,
  StripeCardGroupDirective,
  injectStripe
} from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';

import { NgStrPlutoService } from '../core';

@Component({
  selector: 'ngstr-card-events-example',
  template: `
    <div>
      <div color="secondary" section-content-header>
        <span>Card Events Example</span>
      </div>
      <div section-content>
        <ngx-stripe-elements [stripe]="stripe" [elementsOptions]="elementsOptions">
          <ngx-stripe-card
            [options]="cardOptions"
            (load)="onEvent('load', $event)"
            (blur)="onEvent('blur', $event)"
            (change)="onEvent('change', $event)"
            (focus)="onEvent('focus', $event)"
            (ready)="onEvent('ready', $event)"
            (escape)="onEvent('escape', $event)"
          />
        </ngx-stripe-elements>
        <hr />
        <ngx-stripe-card-group
          [stripe]="stripe"
          (change)="onEvent('change', $event)"
          [elementsOptions]="elementsOptions"
        >
          <ngx-stripe-card-number [options]="cardOptions" />
          <ngx-stripe-card-expiry [options]="cardOptions" />
          <ngx-stripe-card-cvc [options]="cardOptions" />
        </ngx-stripe-card-group>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    StripeCardComponent,
    StripeCardNumberComponent,
    StripeCardExpiryComponent,
    StripeCardCvcComponent,
    StripeCardGroupDirective,
    StripeElementsDirective
  ]
})
export default class CardEventsExampleComponent {
  private readonly plutoService = inject(NgStrPlutoService);

  stripe = injectStripe(this.plutoService.KEYS.main);
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  onEvent(source, ev) {
    console.log({ source, ev });
  }
}
