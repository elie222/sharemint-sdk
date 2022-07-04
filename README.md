# README

SDK for use with ReferList.

## Usage

```ts
import { saveAddress } from '@referlist/sdk';

// set the slug for your project
// use the connected user's address
saveAddress({ slug: 'my-project-slug', address: '0x123abcd...efg' });
```

Then when a user visits your site with `?r=<REFERRER_ID>` in the url we'll store the referral to `REFERRER_ID`.
