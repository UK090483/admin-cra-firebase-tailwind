import { ApplicationHelper } from "applications/helper/ApplicationHelper";

const jotFormData = {
  id: "4908158900129205015",
  form_id: "203272222735044",
  ip: "117.199.4.210",
  created_at: "2021-03-05 23:58:12",
  status: "ACTIVE",
  new: "1",
  flag: "0",
  notes: "",
  updated_at: null,
  answers: {
    "1": {
      name: "submissionFuture",
      order: "1",
      text: "Submission Future Hamburg Award 2021",
      type: "control_head",
    },
    "2": {
      name: "submit2",
      order: "72",
      text: "Absenden",
      type: "control_button",
    },
    "3": {
      name: "startupName3",
      order: "3",
      text: "Startup Name",
      type: "control_textbox",
      answer: "NewCo",
    },
    "4": {
      name: "yourSlogan",
      order: "4",
      text: "Your slogan",
      type: "control_textbox",
      answer: "Mobility made simple",
    },
    "6": {
      name: "website",
      order: "5",
      text: "Website",
      type: "control_textbox",
      answer: "http://www.kottackal.org",
    },
    "8": {
      name: "foundingDate",
      order: "6",
      text: "Founding date",
      type: "control_textbox",
      answer: "Planned in 2021",
    },
    "9": {
      name: "stage",
      order: "7",
      text: "Stage",
      type: "control_dropdown",
      answer: "seed",
    },
    "10": {
      name: "segmentFocus",
      order: "8",
      text: "Segment focus",
      type: "control_textbox",
      answer: "B2B2C",
    },
    "11": {
      name: "industry",
      order: "9",
      text: "Industry",
      type: "control_dropdown",
      answer: "Automotive",
    },
    "12": {
      name: "headquarter",
      order: "10",
      text: "Headquarter",
      type: "control_dropdown",
      answer: "India",
    },
    "14": {
      name: "seitenumbruch",
      order: "11",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "15": {
      name: "basicOverview",
      order: "2",
      text: "BASIC OVERVIEW",
      type: "control_head",
    },
    "16": {
      name: "startupOverview16",
      order: "12",
      text: "STARTUP OVERVIEW",
      type: "control_head",
    },
    "17": {
      name: "provideAn17",
      order: "13",
      text: "Provide an overview of your company. ",
      type: "control_textarea",
      answer:
        "We have developed a Blockchain based Vehicle Charging and Back Office Platform GreenPoint.\r\n\r\nThe link for the movie clip of GreenPoint in work:\r\n\r\nhttps://vimeo.com/514201013\r\n\r\nWe are planning to customise this platform to support Hydrogen based Mobility projects.\r\n\r\nThe platform provides the below value to users:\r\n\r\n1) Location, direction and availability of Charging points on map\r\n\r\n2) Easy and hassle free payment for charge using 2D QR code (more payment modes to follow)\r\n\r\n3) Back office accounting and reconciliation for service providers like CPO, Network Operator\r\n\r\n4) Loyalty program for engagement\r\n\r\nUsing GreenPoint, drivers are be able to locate available charge-points easily when they need to charge their vehicle.\r\n\r\nConsumers should be able to rely on their chosen payment method, whether they’re making a short or long journey. Implementing roaming across networks means consumers can access all public charge-points with GreenPoint.\r\n",
    },
    "18": {
      name: "seitenumbruch18",
      order: "14",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "19": {
      name: "product",
      order: "15",
      text: "PRODUCT",
      type: "control_head",
    },
    "20": {
      name: "problemYou",
      order: "16",
      text: "Problem you are solving and severity of the problem:",
      type: "control_textbox",
      answer:
        "Currently, charge-point operators only display static information such as location and power rating related to their network on their platforms. Further payment and charging are limited to membership card holders. This results in the situation that vehicles users are unable to refuel.",
    },
    "21": {
      name: "productDescription",
      order: "17",
      text: "Product description:",
      type: "control_textbox",
      answer:
        "The platform provides the below value to users:  1) Location, direction and availability of Charging points on map  2) Easy and hassle free payment for charge using 2D QR code (more payment modes to follow)  3) Back office accounting and reconciliation for service providers like CPO, Network Operator  4) Loyalty program for engagement",
    },
    "22": {
      name: "uspWhat22",
      order: "18",
      text: "USP: What makes your service/product special and unique?",
      type: "control_textbox",
      answer:
        "We use Blockchain Technology and related technology to bring Trust to the ecosystem.",
    },
    "23": {
      name: "productReadiness23",
      order: "19",
      text: "Product readiness and where are you now:",
      type: "control_textbox",
      answer:
        "We are in the process of piloting the platform. We would be glad to explore piloting the platform in Germany.",
    },
    "24": {
      name: "productRoadmap24",
      order: "20",
      text: "Product roadmap:",
      type: "control_textbox",
      answer: "2021 - Pilot and Limited GoLive, 2022 - Global GoLive",
    },
    "26": {
      name: "seitenumbruch26",
      order: "21",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "27": {
      name: "market",
      order: "22",
      text: "MARKET",
      type: "control_head",
    },
    "28": {
      name: "targetMarket",
      order: "23",
      text: "Target market",
      type: "control_dropdown",
      answer: [
        "United States",
        "India",
        "Singapore",
        "United Arab Emirates",
        "United Kingdom",
      ],
      prettyFormat:
        "United States<br>India<br>Singapore<br>United Arab Emirates<br>United Kingdom",
    },
    "29": {
      name: "marketDrivers",
      order: "24",
      text: "Market drivers and challenges",
      type: "control_textarea",
      answer:
        "1) Signing on ecosystem partners by providing incentives\r\n\r\n2) Scaling",
    },
    "30": {
      name: "marketSize",
      order: "25",
      text: "Market size",
      type: "control_textbox",
      answer:
        "The US market alone for charging is valued around 250 Million USD.",
    },
    "32": {
      name: "seitenumbruch32",
      order: "26",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "33": {
      name: "competition33",
      order: "27",
      text: "COMPETITION",
      type: "control_head",
    },
    "34": {
      name: "yourCompetition34",
      order: "28",
      text: "Your competition",
      type: "control_textarea",
      answer: "1) GreenLots\r\n2) Ubitricity\r\n\r\nand more coming",
    },
    "35": {
      name: "yourStrength35",
      order: "29",
      text: "Your strength against competitors",
      type: "control_textarea",
      answer:
        "We have a robust and future ready Technology stack.\r\n\r\nThis would not only help us reduce cost but also add more features and value for our customers.",
    },
    "36": {
      name: "yourChallenges",
      order: "30",
      text: "Your challenges against competitors",
      type: "control_textarea",
      answer:
        "This is a growing market which is just picking up.\r\n\r\nThere are quite a few markets where there is less competition and other where there is crowding.\r\n\r\nWe feel that having a ready product, we are well positioned to take advantage of this opportunity.",
    },
    "37": {
      name: "seitenumbruch37",
      order: "31",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "38": {
      name: "business38",
      order: "32",
      text: "BUSINESS",
      type: "control_head",
    },
    "39": {
      name: "revenueSources",
      order: "33",
      text: "Revenue sources",
      type: "control_textarea",
      answer: "Currently we are Pre-revenue.",
    },
    "40": {
      name: "salesStrategy",
      order: "34",
      text: "Sales strategy and pricing model",
      type: "control_textarea",
      answer:
        "For pilot programs, we will be charging a fixed fee.\r\n\r\nThen we plan 2 models of pricing\r\n\r\n1) Software As A Service\r\n\r\n2) Sale of White Label Solution",
    },
    "41": {
      name: "traction",
      order: "35",
      text: "Traction",
      type: "control_textarea",
      answer:
        "We have worked with a Utility company in Europe for the requirements which have gone into building the GreenPoint platform.\r\n\r\nWe expect to pilot the platform this year.",
    },
    "42": {
      name: "pilotsAnd",
      order: "36",
      text: "Pilots and customers",
      type: "control_textarea",
      answer:
        "We are short listed to 2 accelerators, one in Europe and the other in India (where the  holding company is an Oil Company in Malaysia)",
    },
    "43": {
      name: "metrics",
      order: "37",
      text: "Metrics",
      type: "control_textarea",
      answer:
        "Selection for accelerator programs which will ensure pilot projects.",
    },
    "45": {
      name: "seitenumbruch45",
      order: "38",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "47": {
      name: "funding",
      order: "39",
      text: "FUNDING",
      type: "control_head",
    },
    "48": {
      name: "howIs",
      order: "40",
      text: "How is your company funded?",
      type: "control_textbox",
      answer: "Self Funded",
    },
    "49": {
      maxValue: "",
      name: "amountRaised",
      order: "41",
      text: "Amount raised to date",
      type: "control_number",
      answer: "170000",
    },
    "50": {
      name: "yourInvestors",
      order: "42",
      text: "Your investors",
      type: "control_textarea",
      answer: "Family and Friends",
    },
    "52": {
      name: "seitenumbruch52",
      order: "44",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "53": {
      name: "team",
      order: "45",
      text: "TEAM",
      type: "control_head",
    },
    "54": {
      maxValue: "",
      name: "numberOf",
      order: "46",
      text: "Number of founders",
      type: "control_number",
      answer: "2",
    },
    "55": {
      maxValue: "",
      name: "overallTeam",
      order: "47",
      text: "Overall team size (including founders)",
      type: "control_number",
      answer: "7",
    },
    "56": {
      name: "foundersQualificationbackground",
      order: "48",
      text: "Founder's qualification/background",
      type: "control_textarea",
      answer:
        "1. Engineer - MBA, Last role : Senior Project Manager - eBay International - Products, Services and Technology team based in Zurich, Switzerland.\r\n\r\n2. Post Graduate in Computer Science",
    },
    "57": {
      name: "seitenumbruch57",
      order: "49",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "58": {
      name: "impacton",
      order: "50",
      text: "IMPACT (ON HAMBURG)",
      type: "control_head",
    },
    "59": {
      name: "howCan59",
      order: "51",
      text:
        "How can your startup help generate an impact for our future cities, especially Hamburg?",
      type: "control_textarea",
      answer:
        "GreenPoint will facilitate easy access to vehicle charging infrastructure. We envision multi-modal support so that citizens would be able to use not only their vehicles, but also share and utilise other modes of transport.",
    },
    "60": {
      name: "toWhat",
      order: "52",
      text:
        "To what degree is sustainability integrated into the business model?",
      type: "control_textarea",
      answer:
        "GreenPoint business model is predicated on the idea to help transition mobility from IC vehicles to non polluting vehicles.\r\n\r\nThis is the core of our business.",
    },
    "61": {
      name: "doYou61",
      order: "53",
      text: "Do you have connection to Hamburg? Please describe.",
      type: "control_textarea",
      answer: "Not yet.",
    },
    "62": {
      name: "doYou62",
      order: "54",
      text: "Do you already collaborate with any entity from Hamburg?",
      type: "control_textarea",
      answer: "Not Yet",
    },
    "63": {
      name: "howDid",
      order: "55",
      text: "How did you hear from the Future Hamburg Award?",
      type: "control_dropdown",
      answer: "Facebook",
    },
    "65": {
      name: "contactInformation",
      order: "57",
      text: "CONTACT INFORMATION",
      type: "control_head",
    },
    "67": {
      name: "name",
      order: "58",
      sublabels:
        '{"prefix":"Pr\\u00e4fix","first":"Firstname","middle":"Zweiter Vorname","last":"Lastname","suffix":"Namenssuffix"}',
      text: "Name",
      type: "control_fullname",
      answer: {
        first: "Jacob",
        last: "Ninan",
      },
      prettyFormat: "Jacob Ninan",
    },
    "68": {
      name: "position",
      order: "59",
      text: "Position",
      type: "control_textbox",
      answer: "Kottackal Business Solutions Private Ltd.",
    },
    "69": {
      name: "phoneNumber",
      order: "60",
      sublabels:
        '{"country":"Landesvorwahl","area":"Vorwahl","phone":"Telefonnummer","full":"Telefonnummer","masked":"(Please enter a valid phone number)"}',
      text: "Phone number",
      type: "control_phone",
      answer: {
        full: "(919) 447-7631",
      },
      prettyFormat: "(919) 447-7631",
    },
    "70": {
      name: "emailAddress",
      order: "61",
      text: "Email address",
      type: "control_email",
      answer: "director@kottackal.org",
    },
    "71": {
      name: "seitenumbruch71",
      order: "62",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "72": {
      name: "mediaUpload",
      order: "63",
      text: "MEDIA UPLOAD",
      type: "control_head",
    },
    "73": {
      name: "companyDeck",
      order: "64",
      text: "Company Deck",
      type: "control_fileupload",
      answer: [
        "https://www.jotform.com/uploads/Schwan23/203272222735044/4908158900129205015/Kottackal_Presentation_GreenPoint_2021.pdf",
      ],
      prettyFormat:
        '<a href="https://www.jotform.com/uploads/Schwan23/203272222735044/4908158900129205015/Kottackal_Presentation_GreenPoint_2021.pdf" target="_blank" title="Kottackal_Presentation_GreenPoint_2021.pdf">Kottackal_Presentation_GreenPoint_2021.pdf</a>',
    },
    "74": {
      name: "companyLogo",
      order: "65",
      text: "Company logo and photo",
      type: "control_fileupload",
      answer: [
        "https://www.jotform.com/uploads/Schwan23/203272222735044/4908158900129205015/Kottackal_Logo.png",
      ],
      prettyFormat:
        '<a href="https://www.jotform.com/uploads/Schwan23/203272222735044/4908158900129205015/Kottackal_Logo.png" target="_blank" title="Kottackal_Logo.png">Kottackal_Logo.png</a>',
    },
    "75": {
      name: "seitenumbruch75",
      order: "56",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "76": {
      name: "fundingObjective76",
      order: "43",
      text: "Funding objective",
      type: "control_textbox",
      answer: "2000000",
    },
    "80": {
      name: "seitenumbruch80",
      order: "69",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "81": {
      cfname: "Überprüfen vor dem Absenden",
      name: "makeSure81",
      order: "71",
      selectedField: "538da19e8f1162765c000011",
      static: "No",
      text: "Make sure to check your answers before submission.",
      type: "control_widget",
    },
    "82": {
      name: "seitenumbruch82",
      order: "66",
      text: "Seitenumbruch",
      type: "control_pagebreak",
    },
    "84": {
      cfname: "Kurze scrollbare Geschäftsbedingungen",
      name: "schreibenSie84",
      order: "68",
      selectedField: "52f8550f0019ace53000000b",
      static: "No",
      text: "",
      type: "control_widget",
      answer: "Accepted",
    },
    "87": {
      name: "input87",
      order: "67",
      text:
        '<p><span style="font-size: 12pt;"><strong>Terms and conditions of entry</strong></span></p>\n<p><em><span style="font-size: 10pt;">By checking the box below you agree to the terms and conditions of entry for the Future Hamburg Award 2021 and confirm that you have read and acknowledged them.</span></em></p>',
      type: "control_text",
    },
    "92": {
      name: "congratulations",
      order: "70",
      text: "Congratulations!",
      type: "control_head",
    },
  },
};

interface IJotFormDataMaper {
  [key: string]: string;
}

const jotFormDataMaper: IJotFormDataMaper = {
  id: "id",
  startupName: "answers.3.answer",
  tagLine: "answers.4.answer",
  website: "answers.6.answer",
  foundingDate: "answers.8.answer",
  stage: "answers.9.answer",
  segmentFocus: "answers.10.answer",
  industry: "answers.11.answer",
  headquarters: "answers.12.answer",

  startupOverview: "answers.17.answer",

  problemYouAreSolving: "answers.20.answer",
  productDescription: "answers.21.answer",
  whatMakesYourProductUnique: "answers.22.answer",
  productReadiness: "answers.23.answer",
  productRoadMap: "answers.24.answer",

  targetMarket: "answers.28.answer",
  marketDrivers: "answers.29.answer",
  marketSize: "answers.30.answer",

  competition: "answers.34.answer",
  strengthAgainstCompetitors: "answers.35.answer",
  challengesAgainstCompetitors: "answers.36.answer",

  revenueSources: "answers.39.answer",
  salesStrategy: "answers.40.answer",
  traction: "answers.41.answer",
  pilotsCustomers: "answers.42.answer",
  metrics: "answers.43.answer",

  howIsCompanyFunded: "answers.48.answer",
  amountRaisedToDate: "answers.49.answer",
  yourInvestors: "answers.50.answer",
  fundingObjective: "answers.76.answer",

  numberOfFounders: "answers.54.answer",
  overallTeamSize: "answers.55.answer",
  foundersQualification: "answers.56.answer",

  howImpact: "answers.59.answer",
  whatDegreeSustainability: "answers.60.answer",
  connectionToHamburg: "answers.61.answer",
  collaborateWithEntityHamburg: "answers.62.answer",
  howDidYouHearAboutFHA: "answers.63.answer",

  contactName: "answers.67.prettyFormat",
  contactPosition: "answers.68.answer",
  contactPhoneNumber: "answers.69.prettyFormat",
  contactEmail: "answers.70.answer",

  companyDeck: "answers.73.answer",
  companyLogo: "answers.74.answer",
};

const getJotFormData = () => {
  return ApplicationHelper.parseJotFormData(jotFormData);
};
export { getJotFormData, jotFormDataMaper };
