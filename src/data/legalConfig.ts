export interface LegalPolicySection {
  isSampleTemplate: boolean;
  [key: string]: string | boolean;
}

export interface LegalConfig {
  LEGAL_REVIEW_PENDING: boolean;
  legalEntityName: string;
  gstin: string;
  pan: string;
  jurisdictionCity: string;
  refundPolicy: {
    isSampleTemplate: boolean;
    venueAdvanceClause: string;
    roomCancellationClause: string;
    blackoutWindowClause: string;
    refundProcessingTimeline: string;
  };
  serviceDeliveryPolicy: {
    isSampleTemplate: boolean;
    holdConfirmationSla: string;
    venueHandoverClause: string;
    roomCheckInOutClause: string;
  };
}

export const LEGAL_CONFIG: LegalConfig = {
  LEGAL_REVIEW_PENDING: true, // Must be set to false after client & CA sign-off before live launch
  legalEntityName: '[CLIENT TO CONFIRM: Registered Legal Entity / Proprietorship / Pvt Ltd Name]',
  gstin: '[CLIENT TO CONFIRM: 15-Digit Uttar Pradesh GSTIN]',
  pan: '[CLIENT TO CONFIRM: Entity PAN]',
  jurisdictionCity: 'Lucknow, Uttar Pradesh',
  refundPolicy: {
    isSampleTemplate: true,
    venueAdvanceClause: '[CLIENT TO CONFIRM: Venue token advance refund & rescheduling schedule per signed event contract]',
    roomCancellationClause: '[CLIENT TO CONFIRM: Free cancellation window & no-show retention terms]',
    blackoutWindowClause: '[CLIENT TO CONFIRM: Peak wedding season / auspicious muhurat blackout terms]',
    refundProcessingTimeline: '[CLIENT TO CONFIRM: e.g., 5–7 working days to original payment source via Razorpay]',
  },
  serviceDeliveryPolicy: {
    isSampleTemplate: true,
    holdConfirmationSla: '[CLIENT TO CONFIRM: Concierge verification & written booking confirmation SLA]',
    venueHandoverClause: '[CLIENT TO CONFIRM: Event lawn/banquet possession & setup window prior to function]',
    roomCheckInOutClause: '[CLIENT TO CONFIRM: Standard estate front-desk check-in and check-out times]',
  },
};

export default LEGAL_CONFIG;
