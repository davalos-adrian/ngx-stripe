import { Inject, Injectable } from '@angular/core';

import {
  STRIPE_OPTIONS,
  STRIPE_PUBLISHABLE_KEY
} from '../interfaces/ngx-stripe.interface';
import { StripeConstructorOptions } from '../interfaces/stripejs.interface';

import { LazyStripeAPILoader } from './api-loader.service';
import { WindowRef } from './window-ref.service';

import { StripeInstance } from './stripe-instance.class';

@Injectable()
export class StripeFactoryService {
  constructor(
    @Inject(STRIPE_PUBLISHABLE_KEY) public baseKey: string,
    @Inject(STRIPE_OPTIONS) public baseOptions: StripeConstructorOptions,
    public loader: LazyStripeAPILoader,
    public window: WindowRef
  ) {}

  public create(
    key?: string,
    options?: StripeConstructorOptions
  ): StripeInstance {
    if (!key && !this.baseKey) {
      return null;
    }

    return new StripeInstance(
      this.loader,
      this.window,
      key || this.baseKey,
      options || this.baseOptions
    );
  }
}
