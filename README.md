# README

SDK for use with [ShareMint.xyz](https://sharemint.xyz).

## Usage

```ts
import { saveAddress } from "@sharemint/sdk";

saveAddress({ slug: "my-project-slug", address: "0x123abc123" });
```

Then when a user visits your site with `?r=<REFERRER_ID>` in the url we'll store the referral to `REFERRER_ID`. A sample url would be `https://mint.boredexamples.com/?r=<REFERRER_ID>`. The package will automatically fetch the referrer id from the url so you don't have to.

You can also send the transaction hash, and we will store the purchaser. For NFT purchases the user that receives the token will be considered the purchaser. This makes for easy integration with platforms like Winter that allow for fiat payments for NFT purchases.

```ts
import { saveAddress } from "@sharemint/sdk";

saveAddress({ slug: "my-project-slug", transactionHash: "0xabc123456789" });
```

### Saving the referrer id for later

In some cases a user will visit the page, not connect their wallet, and return later to connect it. Or the user will change pages on your website and the referrer id will be lost. To store the referrer in localStorage as soon as the user visits your website you can do the following in your JavaScript code:

```ts
import { storeReferrer } from "@sharemint/sdk";

storeReferrer();
```

Then when calling `saveAddress()` we will use the previously stored referrer. In the case localStorage does not contain a referrer we will use the referral code in the URL (if it exists).

### Track visits

Use the following code to track page visits:

```ts
import { logVisit } from "@sharemint/sdk";

logVisit({ slug: "my-project-slug" });
```

### Fetch user referral code

```ts
import { getOrCreateInviteCode } from "@sharemint/sdk";

const inviteCode = await getOrCreateInviteCode({ address: "0x123abc123" });
```

If the user doesn't have a referral code yet we will generate one for them.

## API Usage

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

One of `address` or `transactionHash` or `email` is required. Typical usage is to send only the address.

An example body is:

```json
{
  "address": "0x1234567",
  "slug": "my-project-slug",
  "invitedById": "referral-code-123"
}
```

`invitedById` should be fetched from the url. Affiliates will refer users to your site with their id in the query params. A sample url is: `https://mysite.com/?r=<REFERRER_ID>`. `REFERRER_ID` should be used for `invitedById` in the API call.

To fetch (or create) a user invite code via the API, make a `POST` request to `https://sharemint.xyz/api/external/get-or-create-invite-code` with a body of:

```json
{
  "address": "0x123abc123"
}
```
