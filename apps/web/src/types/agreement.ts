export type AgreementType = "TERMS" | "PRIVACY" | "MARKETING";

export type MemberAgreement = {
  agreementType: AgreementType;
  agreed: boolean;
  agreedAt: string | null;
};

export type MemberAgreementsResponse = {
  agreements: MemberAgreement[];
};
