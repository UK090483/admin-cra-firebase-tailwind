import { IJotFormData } from "./jotFormDataMaper";
import MediaHandler from "./MediaHandler";

const handleMedia = async (application: IJotFormData) => {
  let DECK: any[] = [];

  for (let deck of application.companyDeck) {
    const item = new MediaHandler(deck, application.id, "deck");
    const mediaItem = await item.prepare();
    DECK.push(mediaItem);
  }

  let LOGO: any[] = [];

  if (application.companyLogo && application.companyLogo.length > 0) {
    for (let logo of application.companyLogo) {
      const item = new MediaHandler(logo, application.id, "logo");

      const mediaItem = await item.prepare();

      LOGO.push(mediaItem);
    }
  }

  application.companyDeck = DECK;
  application.companyLogo = LOGO;

  return application;
};

export { handleMedia };
