import { AssessmentType } from "./AssessmentHelper";

const Fields: AssessmentType = {
  isInnovative: {
    label: "Is the product/service innovative",
    shortLabel: "Inn",
    weight: 3,
    type: "number",
    source: "isInnovative",
    fields: {
      main: {
        label: "Is the product/service innovative",
        shortLabel: "Inn",
        type: "number",
        source: "isInnovative",
      },
      more: [
        {
          label: "is innovative",
          shortLabel: "I-R",
          type: "text",
          source: "isInnovativeReason",
        },
      ],
    },
  },

  isClearUSP: {
    label: "Is there a clear USP ?",
    shortLabel: "USP",
    type: "number",
    source: "isClearUSP",
    weight: 1,
    fields: {
      main: {
        label: "isClearUSP",
        shortLabel: "USP",
        type: "number",
        source: "isClearUSP",
      },
      more: [
        {
          label: "isClearUSPReason",
          shortLabel: "C-R",
          type: "text",
          source: "isClearUSPReason",
        },
      ],
    },
  },

  isTherePotential: {
    label: "Is there relevant market potential ?",
    shortLabel: "Pot",
    type: "number",
    source: "isTherePotential",
    weight: 1,
    fields: {
      main: {
        label: "isTherePotential",
        shortLabel: "P",
        type: "number",
        source: "isTherePotential",
      },
      more: [
        {
          label: "is innovative",
          shortLabel: "P-R",
          type: "text",
          source: "isTherePotentialReason",
        },
      ],
    },
  },

  doTheyKnowCompetitors: {
    label: "Do they know their competitors ?",
    shortLabel: "Cmp",
    type: "number",
    source: "doTheyKnowCompetitors",
    weight: 1,
    fields: {
      main: {
        label: "doTheyKnowCompetitors",
        shortLabel: "Cmp",
        type: "number",
        source: "doTheyKnowCompetitors",
      },
      more: [
        {
          label: "is innovative",
          shortLabel: "C-R",
          type: "text",
          source: "doTheyKnowCompetitorsReason",
        },
      ],
    },
  },

  isBusinessModelSolid: {
    label: "Is their business model solid and in balance with their resources?",
    shortLabel: "BMo",
    type: "number",
    source: "isBusinessModelSolid",
    weight: 1,
    fields: {
      main: {
        label: "isBusinessModelSolid",
        shortLabel: "BMo",
        type: "number",
        source: "isBusinessModelSolid",
      },
      more: [
        {
          label: "is innovative",
          shortLabel: "B-R",
          type: "text",
          source: "isBusinessModelSolidReason",
        },
      ],
    },
  },

  areNumbersPromising: {
    label: "Are the numbers promising?",
    shortLabel: "Num",
    type: "number",
    source: "areNumbersPromising",
    weight: 1,
    fields: {
      main: {
        label: "Are the numbers promising?",
        shortLabel: "Num",
        type: "number",
        source: "areNumbersPromising",
      },
      more: [
        {
          label: "is innovative",
          shortLabel: "P-R",
          type: "text",
          source: "areNumbersPromisingReason",
        },
      ],
    },
  },

  isFundingSolid: {
    label: "Is the funding solid?",
    shortLabel: "Fun",
    type: "number",
    source: "isFundingSolid",
    weight: 1,
    fields: {
      main: {
        label: "Is the funding solid?",
        shortLabel: "Fun",
        type: "number",
        source: "isFundingSolid",
      },
      more: [
        {
          label: "is innovative",
          shortLabel: "F-R",
          type: "text",
          source: "isFundingSolidReason",
        },
      ],
    },
  },

  isTeamExperienced: {
    label: "is Team Experienced",
    shortLabel: "Exp",
    type: "number",
    source: "isTeamExperienced",
    weight: 1,
    fields: {
      main: {
        label: "isTeamExperienced",
        shortLabel: "Exp",
        type: "number",
        source: "isTeamExperienced",
      },
      more: [
        {
          label: "is innovative",
          shortLabel: "E-R",
          type: "text",
          source: "isTeamExperiencedReason",
        },
      ],
    },
  },

  willFutureCitiesBenefit: {
    label: "Will our future cities benefit from their idea? ",
    shortLabel: "FCB",
    type: "number",
    source: "willFutureCitiesBenefit",
    weight: 3,
    fields: {
      main: {
        label: "willFutureCitiesBenefit",
        shortLabel: "FCB",
        type: "number",
        source: "willFutureCitiesBenefit",
      },
      more: [
        {
          label: "is innovative",
          shortLabel: "F-R",
          type: "text",
          source: "willFutureCitiesBenefitReason",
        },
      ],
    },
  },

  isComplianceWithSDG: {
    label: "Is the business in compliance with the SDGs?",
    shortLabel: "SDG",
    type: "number",
    source: "isComplianceWithSDG",
    fields: {
      main: {
        label: "isComplianceWithSDGs",
        shortLabel: "SDG",
        type: "number",
        source: "isComplianceWithSDGs",
      },
      more: [
        {
          label: "is innovative",
          shortLabel: "F-R",
          type: "text",
          source: "isComplianceWithSDGsReason",
        },
      ],
    },
  },
  isPresentationGood: {
    label:
      "Is the startup presentation based on elevator pitch, pitch deck and website good?",
    shortLabel: "PDF",
    type: "number",
    source: "isPresentationGood",
    weight: 2,
    fields: {
      main: {
        label: "isPresentationGood",
        shortLabel: "PDF",
        type: "number",
        source: "isPresentationGood",
      },
      more: [
        {
          label: "is innovative",
          shortLabel: "F-R",
          type: "text",
          source: "isInnovativeReason",
        },
      ],
    },
  },
};

export { Fields };
