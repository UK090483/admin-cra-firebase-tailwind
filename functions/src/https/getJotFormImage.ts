import * as functions from "firebase-functions";
import * as https from "https";

export default functions.https.onCall(async (data, context) => {
  const { auth } = context;
  const { url } = data;

  if (!auth) {
    return;
  }

  const urlWithKey = `${url}?apiKey=${functions.config().jotform.key}`;

  try {
    const nextUrl = await getUrl(urlWithKey);

    return nextUrl;
  } catch (error) {
    return error;
  }
});

const getUrl = (url: string) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.headers.location) {
        resolve(response.headers.location);
      } else {
        reject(response);
      }
    });
  });
};
