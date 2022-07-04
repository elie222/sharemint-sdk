function getInvitedById() {
  let invitedById = "";
  location.search
    .substring(1)
    .split("&")
    .forEach((item) => {
      const split = item.split("=");
      if (split[0] === "r") invitedById = split[1];
    });

  return invitedById;
}

export async function saveAddress(options: {
  slug: string;
  address: string;
  referUrl?: string;
}) {
  const { slug, address, referUrl } = options;

  try {
    const invitedById = getInvitedById();
    if (!invitedById) return;
    console.log(`Saving address: ${address}`);

    const url = referUrl || `https://referlist.xyz/api/user/save-address`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, slug, invitedById }),
    });

    console.log(`Saved address: ${address}`);
  } catch (error) {
    console.error(`Error saving address`);
    console.error(error);
  }
}
