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

// the last approach is where you only have the mint transaction:
saveAddress({ slug: "my-project-slug", transactionHash: "0xabc123456789" });
```

Then when a user visits your site with `?r=<REFERRER_ID>` in the url we'll store the referral to `REFERRER_ID`. A sample url would be `https://mint.boredexamples.com/?r=<REFERRER_ID>`. The package will automatically fetch referrer id from the url so you don't have to.

### Track visits

Use the following code to track visits:

```ts
import { logVisit } from "@sharemint/sdk";

logVisit({ slug: "my-project-slug" });
```

## Usage without package

An alternative method to use the ShareMint API is to send a POST request directly to:

`https://sharemint.xyz/api/external/save`

The request expects the following headers:

```
{ "Content-Type": "application/json" }
```

And the body should include:

```
address?: string
email?: string
transactionHash?: string
slug: string
invitedById: string
```

One of `address` or `email` is required. Typical usage is to send only the address.

An example body is:

```json
{
  "address": "0x1234567",
  "slug": "my-project-slug",
  "invitedById": "referral-code-123"
}
```

`invitedById` should be fetched from the url. Affiliates will refer users to your site with their id in the query params. A sample url is: `https://mysite.com/?r=<REFERRER_ID>`. `REFERRER_ID` should be used for `invitedById` in the API call.
