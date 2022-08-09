import debug from "debug";
const log = debug("sharemint");
const logError = debug("sharemint:error");

const DEFAULT_BASE_URI = "https://sharemint.xyz";
const QUERY_PARAM = "r";

function getInvitedById() {
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

export async function saveAddress(options: {
  slug: string;
  address?: string;
  email?: string;
  referUrl?: string;
}) {
  const { slug, address, email, referUrl } = options;

  try {
    const invitedById = getInvitedById();
    if (!invitedById) return;
    log(`Saving address: ${address || email}`);

    const url = referUrl || `${DEFAULT_BASE_URI}/api/external/save`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, email, slug, invitedById }),
    });

    log(`Saved address: ${address || email}`);
  } catch (error) {
    logError(`Error saving user`);
    logError(error);
  }
}

export async function logVisit(options?: { referUrl?: string }) {
  const url = options?.referUrl || `${DEFAULT_BASE_URI}/api/external/visit`;

  const invitedById = getInvitedById();
  if (!invitedById) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: invitedById }),
  });
}
