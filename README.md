# README

SDK for use with ShareMint.xyz.

## Usage

```ts
import { saveAddress } from "@sharemint/sdk";

// slug: ShareMint project slug
// address: connected user's Ethereum address
saveAddress({ slug: "my-project-slug", address: "0x123abcd...efg" });

// alternatively, if you don't have the address, but only an email, you can provide that instead:
saveAddress({ slug: "my-project-slug", email: "hello@example.com" });
```

Then when a user visits your site with `?r=<REFERRER_ID>` in the url we'll store the referral to `REFERRER_ID`.

## Usage without package

Send a POST request to:

`https://sharemint.xyz/api/external/save`

With the following details:

Headers:

```
{ "Content-Type": "application/json" }
```

Body:

```
address?: string
email?: string
slug: string
invitedById: string
```

One of `address` or `email` is required. Typical usage is to send only the address.
