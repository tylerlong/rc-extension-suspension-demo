import RingCentral from '@rc-ex/core';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });

  const r = await rc.restapi().account().extension().list();
  const extension_to_be_suspended = r.records?.find(
    record =>
      record.extensionNumber === process.env.RINGCENTRAL_EXTENSION_TO_SUSPEND
  );
  console.log(JSON.stringify(extension_to_be_suspended, null, 2));
  await rc.revoke();
};

main();
