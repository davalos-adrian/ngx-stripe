import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentIntent } from '@stripe/stripe-js';
import Stripe from 'stripe';

import { PLUTO_ID } from './client-id.provider';

@Injectable({ providedIn: 'root' })
export class NgStrPlutoService {
  private readonly BASE_URL = 'https://api.pluto.ricardosanchez.dev/api';

  readonly KEYS = {
    main: 'pk_test_51Ii5RpH2XTJohkGafOSn3aoFFDjfCE4G9jmW48Byd8OS0u2707YHusT5PojHOwWAys9HbvNylw7qDk0KkMZomdG600TJYNYj20',
    malaysia:
      'pk_test_51KRdewCuu3LJxlmKq4Oeixoi5GcBSiT3cMOdwhhkZ2jCXeUuGZ8xjblOlbEKUob30aC9P3l07Qxn2IKWm6tncYPY00w6Kem6tg',
    usa: 'pk_test_51MHzdHCFzZvO65bFwNvBHBPwn6oefQ8chNt0Q324OC0XzqFk15awlmiyBqtpmyddjTia69ex8A3cQqvLnBLEvrYn006yHaznBY'
  };

  private readonly clientId = inject(PLUTO_ID);
  private readonly http = inject(HttpClient);

  createPaymentIntent(
    params: Stripe.PaymentIntentCreateParams,
    options: { clientId?: string } = {}
  ): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(`${this.BASE_URL}/payments/create-payment-intent`, params, {
      headers: { merchant: options.clientId ?? this.clientId }
    });
  }

  createVerificationSession(userid: string, options: { clientId?: string } = {}): Observable<any> {
    return this.http.post<PaymentIntent>(
      `${this.BASE_URL}/identity/create-verification-session`,
      { userid },
      { headers: { merchant: options.clientId ?? this.clientId } }
    );
  }

  createEphemeralKeys(
    params: Stripe.EphemeralKeyCreateParams,
    options: { clientId?: string } = {}
  ): Observable<{ ephemeralKeySecret: string }> {
    return this.http.post<{ ephemeralKeySecret: string }>(`${this.BASE_URL}/payments/ephemeral-keys`, params, {
      headers: { merchant: options.clientId ?? this.clientId }
    });
  }
}
