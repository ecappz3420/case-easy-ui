import { COUNTRY_CODES } from "./countryCode";
//All forms
export const CASE_TYPE_OPTIONS = [
  {
    value: "None",
    label: "None",
  },
  {
    value: "Study Visa",
    label: "Study Visa",
  },
  {
    value: "Study Permit Extension",
    label: "Study Permit Extension",
  },
  {
    value: "Visitor to Study",
    label: "Visitor to Study",
  },
  {
    value: "PGWP",
    label: "PGWP",
  },
  {
    value: "Visitor Visa",
    label: "Visitor Visa",
  },
  {
    value: "Work Permit Extension",
    label: "Work Permit Extension",
  },
  {
    value: "Study + Work Permit Extension",
    label: "Study + Work Permit Extension",
  },
  {
    value: "Work Visa",
    label: "Work Visa",
  },
  {
    value: "Study + Spouse",
    label: "Study + Spouse",
  },
  {
    value: "PR",
    label: "PR",
  },
  {
    value: "Home Child Care Pilot",
    label: "Home Child Care Pilot",
  },
  {
    value: "College Change",
    label: "College Change",
  },
];

export const CASE_TYPE_OPTIONS_USA = [
  ...CASE_TYPE_OPTIONS,
  {
    value: "USA",
    label: "USA",
  },
];

export const CASE_TYPE_OPTIONS_WORK_VISA = [
  {
    value: "Choice 3",
    label: "Choice 3",
  },
  ...CASE_TYPE_OPTIONS,
];

//USA Form
export const PAYMENT_DETAILS_OPTIONS = [
  {
    value: "Payment Received",
    label: "Payment Received",
  },
  {
    value: "Payment Pending",
    label: "Payment Pending",
  },
];

//Visitor Visa Form
export const WHOM_THEY_MEET_OPTIONS = [
  {
    value: "Child",
    label: "Child",
  },
  {
    value: "Spouse",
    label: "Spouse",
  },
  {
    value: "Brother/Sister",
    label: "Brother/Sister",
  },
  {
    value: "Friend",
    label: "Friend",
  },
  {
    value: "Cousin",
    label: "Cousin",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const VISIT_PURPOSE_OPTIONS = [
  {
    value: "Family Visit",
    label: "Family Visit",
  },
  {
    value: "Convocation Ceremony",
    label: "Convocation Ceremony",
  },
  {
    value: "Event",
    label: "Event",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const SPONSOR_STATUS_OPTIONS = [
  {
    value: "Work Permit",
    label: "Work Permit",
  },
  {
    value: "Study Visa",
    label: "Study Visa",
  },
  {
    value: "PR",
    label: "PR",
  },
  {
    value: "Citizen",
    label: "Citizen",
  },
];

export const OCCUPATION_OPTIONS = [
  {
    value: "Agriculturist",
    label: "Agriculturist",
  },
  {
    value: "Businessman",
    label: "Businessman",
  },
  {
    value: "Home Maker",
    label: "Home Maker",
  },
  {
    value: "Retired",
    label: "Retired",
  },
  {
    value: "Student",
    label: "Student",
  },
  {
    value: "Worker",
    label: "Worker",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const TRAVEL_VISA_TYPE_OPTIONS = [
  {
    value: "Study Visa",
    label: "Study Visa",
  },
  {
    value: "Work Permit",
    label: "Work Permit",
  },
  {
    value: "Visitor Visa",
    label: "Visitor Visa",
  },
  {
    value: "Study + Spouse",
    label: "Study + Spouse",
  },
  {
    value: "PR",
    label: "PR",
  },
];

export const REFUSAL_VISA_TYPE_OPTIONS = [
  ...TRAVEL_VISA_TYPE_OPTIONS.map((option) =>
    option.value === "Work Permit"
      ? { ...option, value: "Work Visa", label: "Work Visa" }
      : option
  ),
  {
    value: "Home Child Care Pilot",
    label: "Home Child Care Pilot",
  },
];

export const RELATION_OPTIONS = [
  {
    value: "Spouse",
    label: "Spouse",
  },
  {
    value: "Parents",
    label: "Parents",
  },
  {
    value: "Brother/Sister",
    label: "Brother/Sister",
  },
];

//Country Code selection for Mobile/Phone Numbers
export const COUNTRY_CODE_OPTIONS = [
  ...COUNTRY_CODES.map((country) => ({
    label: `${country.name} ${country.code}`,
    value: country.code,
    key: `${country.name}`,
  })),
];
