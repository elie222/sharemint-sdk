import debug from "debug";
const log = debug("sharemint");
const logError = debug("sharemint:error");

const DEFAULT_BASE_URI = "https://sharemint.xyz";
const QUERY_PARAM = "r";
const LOCAL_STORAGE_KEY = "sharemint:invitedById";

export function getInvitedById() {
  let invitedById = "";
  location.search
    .substring(1)
    .split("&")
    .forEach((item) => {
      const split = item.split("=");
      if (split[0] === QUERY_PARAM) invitedById = split[1];
    });

  return invitedById;
}

export async function saveAddress(
  options: {
    slug: string;
    referUrl?: string;
  } & (
    | {
        address: string;
        email?: string;
        transactionHash?: string;
      }
    | {
        address?: string;
        email: string;
        transactionHash?: string;
      }
    | {
        address?: string;
        email?: string;
        transactionHash: string;
      }
  )
) {
  const { slug, address, email, transactionHash, referUrl } = options;

  try {
    const invitedById =
      localStorage.getItem(LOCAL_STORAGE_KEY) || getInvitedById();
    if (!invitedById) return;
    log(`Saving address: ${address || email}`);

    const url = referUrl || `${DEFAULT_BASE_URI}/api/external/save`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        email,
        transactionHash,
        slug,
        invitedById,
      }),
    });

    log(`Saved address: ${address || email}`);
  } catch (error) {
    logError(`Error saving user`);
    logError(error);
  }
}

export async function logVisit(options: { slug: string; referUrl?: string }) {
  const { slug, referUrl } = options;
  const url = referUrl || `${DEFAULT_BASE_URI}/api/external/visit`;

  const invitedById = getInvitedById();
  if (!invitedById) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug, code: invitedById }),
  });
}

export async function getOrCreateInviteCode(options: { address: string }) {
  const { address } = options;
  const url = `${DEFAULT_BASE_URI}/api/external/get-or-create-invite-code`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address }),
  });

  return await res.json();
}

export function storeReferrer() {
  const invitedById = getInvitedById();
  if (!invitedById) return;
  localStorage.setItem(LOCAL_STORAGE_KEY, invitedById);
}

export function clearReferrer() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
