import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  ConfirmAuBecsDebitPaymentData,
  ConfirmAuBecsDebitSetupData,
  ConfirmBancontactPaymentData,
  ConfirmBancontactPaymentOptions,
  ConfirmCardPaymentData,
  ConfirmCardPaymentOptions,
  ConfirmEpsPaymentData,
  ConfirmEpsPaymentOptions,
  ConfirmFpxPaymentData,
  ConfirmFpxPaymentOptions,
  ConfirmGiropayPaymentData,
  ConfirmGiropayPaymentOptions,
  ConfirmIdealPaymentData,
  ConfirmIdealPaymentOptions,
  ConfirmP24PaymentData,
  ConfirmP24PaymentOptions,
  ConfirmCardSetupData,
  ConfirmCardSetupOptions,
  ConfirmSepaDebitPaymentData,
  ConfirmSepaDebitSetupData,
  CreatePaymentMethodData,
  CreateSourceData,
  CreateTokenIbanData,
  CreateTokenCardData,
  CreateTokenPiiData,
  CreateTokenBankAccountData,
  PaymentIntent,
  PaymentMethod,
  PaymentRequest,
  PaymentRequestOptions,
  RedirectToCheckoutOptions,
  RetrieveSourceParam,
  SetupIntent,
  Stripe,
  StripeCardElement,
  StripeCardNumberElement,
  StripeCardCvcElement,
  StripeConstructorOptions,
  StripeElements,
  StripeElementsOptions,
  StripeElement,
  StripeError,
  StripeIbanElement,
  Source,
  Token,
  TokenCreateParams
} from '@stripe/stripe-js';

import { StripeServiceInterface } from '../interfaces/stripe-instance.interface';

import { WindowRef } from './window-ref';
import { LazyStripeAPILoader, Status } from './api-loader.service';

export class StripeInstance implements StripeServiceInterface {
  private stripe$ = new BehaviorSubject<Stripe | undefined>(undefined);
  public stripe = this.stripe$
    .asObservable()
    .filter(s => Boolean(s));

  constructor(
    private loader: LazyStripeAPILoader,
    private window: WindowRef,
    private key: string,
    private options?: StripeConstructorOptions
  ) {
    this.loader
      .asStream()
      .filter((status: Status) => status.loaded === true)
      .first()
      .map(() => (this.window.getNativeWindow() as any).Stripe)
      .subscribe((stripeInstance: any) => {
        const stripe = this.options
          ? (stripeInstance(this.key, this.options) as Stripe)
          : (stripeInstance(this.key) as Stripe);

        this.stripe$.next(stripe);
      });
  }

  getInstance(): Stripe | undefined {
    return this.stripe$.getValue();
  }

  elements(options?: StripeElementsOptions): Observable<StripeElements> {
    return this.stripe$.asObservable()
      .filter((stripe) => Boolean(stripe))
      .map((stripe) => stripe.elements(options))
      .first();
  }

  redirectToCheckout(
    options?: RedirectToCheckoutOptions
  ): Observable<never | { error: StripeError }> {
    return this.stripe
      .switchMap((stripe) => Observable.fromPromise(stripe.redirectToCheckout(options)))
      .first();
  }

  confirmAuBecsDebitPayment(
    clientSecret: string,
    data?: ConfirmAuBecsDebitPaymentData
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmAuBecsDebitPayment(clientSecret, data))
      )
      .first();
  }

  confirmBancontactPayment(
    clientSecret: string,
    data?: ConfirmBancontactPaymentData,
    options?: ConfirmBancontactPaymentOptions
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmBancontactPayment(clientSecret, data, options))
      )
      .first();
  }

  confirmCardPayment(
    clientSecret: string,
    data?: ConfirmCardPaymentData,
    options?: ConfirmCardPaymentOptions
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmCardPayment(clientSecret, data, options))
      )
      .first();
  }

  confirmEpsPayment(
    clientSecret: string,
    data?: ConfirmEpsPaymentData,
    options?: ConfirmEpsPaymentOptions
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmEpsPayment(clientSecret, data, options))
      )
      .first();
  }

  confirmFpxPayment(
    clientSecret: string,
    data?: ConfirmFpxPaymentData,
    options?: ConfirmFpxPaymentOptions
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmFpxPayment(clientSecret, data, options))
      )
      .first();
  }

  confirmGiropayPayment(
    clientSecret: string,
    data?: ConfirmGiropayPaymentData,
    options?: ConfirmGiropayPaymentOptions
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmGiropayPayment(clientSecret, data, options))
      )
      .first();
  }

  confirmIdealPayment(
    clientSecret: string,
    data?: ConfirmIdealPaymentData,
    options?: ConfirmIdealPaymentOptions
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmIdealPayment(clientSecret, data, options))
      )
      .first();
  }

  confirmP24Payment(
    clientSecret: string,
    data?: ConfirmP24PaymentData,
    options?: ConfirmP24PaymentOptions
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmP24Payment(clientSecret, data, options))
      )
      .first();
  }

  confirmSepaDebitPayment(
    clientSecret: string,
    data?: ConfirmSepaDebitPaymentData
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmSepaDebitPayment(clientSecret, data))
      )
      .first();
  }

  handleCardAction(
    clientSecret: string
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) => Observable.fromPromise(stripe.handleCardAction(clientSecret)))
      .first();
  }

  createPaymentMethod(
    paymentMethodData: CreatePaymentMethodData
  ): Observable<{
    paymentMethod?: PaymentMethod;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.createPaymentMethod(paymentMethodData))
      )
      .first();
  }

  retrievePaymentIntent(
    clientSecret: string
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) => Observable.fromPromise(stripe.retrievePaymentIntent(clientSecret)))
      .first();
  }

  confirmAuBecsDebitSetup(
    clientSecret: string,
    data?: ConfirmAuBecsDebitSetupData
  ): Observable<{
    setupIntent?: SetupIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmAuBecsDebitSetup(clientSecret, data))
      )
      .first();
  }

  confirmCardSetup(
    clientSecret: string,
    data?: ConfirmCardSetupData,
    options?: ConfirmCardSetupOptions
  ): Observable<{
    setupIntent?: SetupIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmCardSetup(clientSecret, data, options))
      )
      .first();
  }

  confirmSepaDebitSetup(
    clientSecret: string,
    data?: ConfirmSepaDebitSetupData
  ): Observable<{
    setupIntent?: SetupIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise(stripe.confirmSepaDebitSetup(clientSecret, data))
      )
      .first();
  }

  retrieveSetupIntent(
    clientSecret: string
  ): Observable<{
    setupIntent?: SetupIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) => Observable.fromPromise(stripe.confirmSepaDebitSetup(clientSecret)))
      .first();
  }

  paymentRequest(options: PaymentRequestOptions): PaymentRequest | undefined {
    const stripe = this.getInstance();

    return stripe ? stripe.paymentRequest(options) : undefined;
  }

  createToken(
    tokenType: StripeIbanElement,
    data: CreateTokenIbanData
  ): Observable<{ token?: Token; error?: StripeError }>;
  createToken(
    tokenType: StripeCardElement | StripeCardNumberElement,
    data?: CreateTokenCardData
  ): Observable<{ token?: Token; error?: StripeError }>;
  createToken(
    tokenType: 'pii',
    data: CreateTokenPiiData
  ): Observable<{ token?: Token; error?: StripeError }>;
  createToken(
    tokenType: 'bank_account',
    data: CreateTokenBankAccountData
  ): Observable<{ token?: Token; error?: StripeError }>;
  createToken(
    tokenType: 'cvc_update',
    element?: StripeCardCvcElement
  ): Observable<{ token?: Token; error?: StripeError }>;
  createToken(
    tokenType: 'account',
    data: TokenCreateParams.Account
  ): Observable<{ token?: Token; error?: StripeError }>;
  createToken(
    tokenType: 'person',
    data: TokenCreateParams.Person
  ): Observable<{ token?: Token; error?: StripeError }>;
  createToken(tokenType, data) {
    return this.stripe
      .switchMap((stripe) => Observable.fromPromise(stripe.createToken(tokenType, data)))
      .first();
  }

  createSource(
    element: StripeElement,
    sourceData: CreateSourceData
  ): Observable<{ source?: Source; error?: StripeError }>;
  createSource(
    sourceData: CreateSourceData
  ): Observable<{ source?: Source; error?: StripeError }>;
  createSource(a, b?): Observable<{ source?: Source; error?: StripeError }> {
    return this.stripe
      .switchMap((stripe) => Observable.fromPromise(stripe.createSource(a, b)))
      .first();
  }

  retrieveSource(
    source: RetrieveSourceParam
  ): Observable<{ source?: Source; error?: StripeError }> {
    return this.stripe
      .switchMap((stripe) => Observable.fromPromise(stripe.retrieveSource(source)))
      .first();
  }

  /**
   * @deprecated
   */
  handleCardPayment(
    clientSecret: string,
    element?,
    data?
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise((stripe as any).handleCardPayment(clientSecret, element, data))
      )
      .first();
  }

  /**
   * @deprecated
   */
  confirmPaymentIntent(
    clientSecret: string,
    element?,
    data?
  ): Observable<{
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise((stripe as any).confirmPaymentIntent(clientSecret, element, data))
      )
      .first();
  }

  /**
   * @deprecated
   */
  handleCardSetup(
    clientSecret: string,
    element?,
    data?
  ): Observable<{
    setupIntent?: SetupIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise((stripe as any).handleCardSetup(clientSecret, element, data))
      )
      .first();
  }

  /**
   * @deprecated
   */
  confirmSetupIntent(
    clientSecret: string,
    element?,
    data?
  ): Observable<{
    setupIntent?: SetupIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise((stripe as any).confirmSetupIntent(clientSecret, element, data))
      )
      .first();
  }

  /**
   * @deprecated
   */
  handleFpxPayment(
    clientSecret: string,
    element?,
    data?
  ): Observable<{
    setupIntent?: SetupIntent;
    error?: StripeError;
  }> {
    return this.stripe
      .switchMap((stripe) =>
        Observable.fromPromise((stripe as any).handleFpxPayment(clientSecret, element, data))
      )
      .first();
  }
}