import { css } from "@emotion/react";
import { useState } from "react";

import { BottomSheet } from "@/component/BottomSheet";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { info } from "@/config/info";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { getDeviceType } from "@/utils/deviceUtils";

const TERMS_SHEET_ID = "signUpTermsSheet";

type SignUpTerm = {
  id: string;
  label: string;
  required: boolean;
  content: string;
};

const SIGN_UP_TERMS: SignUpTerm[] = [
  { id: "termsOfService", label: "이용약관", required: true, content: info.termsOfService },
  { id: "privacyPolicy", label: "개인정보 수집 및 이용", required: true, content: info.privacyPolicy },
  { id: "marketing", label: "마케팅 활용 및 광고 수신", required: false, content: info.marketingConsent },
];

export const isRequiredTermsAgreed = (agreedIds: string[]) => SIGN_UP_TERMS.every((term) => !term.required || agreedIds.includes(term.id));

function CheckMark({ checked }: { checked: boolean }) {
  return (
    <span
      css={css`
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 0.6rem;
        border: 0.1rem solid ${checked ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray300};
        background-color: ${checked ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray00};
        transition: 0.2s all;
      `}
    >
      {checked && <Icon icon="ic_check" size={1.4} color={DESIGN_TOKEN_COLOR.gray00} />}
    </span>
  );
}

function TermContent({ content }: { content: string }) {
  return (
    <Typography
      variant="body16Medium"
      color="gray800"
      css={css`
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-wrap: break-word;
      `}
    >
      {content}
    </Typography>
  );
}

type SignUpTermsAgreementProps = {
  agreedIds: string[];
  onChange: (agreedIds: string[]) => void;
};

export function SignUpTermsAgreement({ agreedIds, onChange }: SignUpTermsAgreementProps) {
  const { isDesktop } = getDeviceType();
  const { openBottomSheet } = useBottomSheet();
  const { open: openDesktopModal } = useDesktopBasicModal();

  const [openedTerm, setOpenedTerm] = useState<SignUpTerm | null>(null);

  const isAllAgreed = SIGN_UP_TERMS.every((term) => agreedIds.includes(term.id));

  const toggleAll = () => onChange(isAllAgreed ? [] : SIGN_UP_TERMS.map((term) => term.id));

  const toggleTerm = (id: string) => onChange(agreedIds.includes(id) ? agreedIds.filter((agreedId) => agreedId !== id) : [...agreedIds, id]);

  const openTermContent = (term: SignUpTerm) => {
    if (isDesktop) {
      openDesktopModal({
        title: term.label,
        contents: <TermContent content={term.content} />,
        options: { enableFooter: false },
      });
      return;
    }

    setOpenedTerm(term);
    openBottomSheet({ id: TERMS_SHEET_ID });
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <button
        type="button"
        onClick={toggleAll}
        css={css`
          display: flex;
          align-items: center;
          column-gap: 1.2rem;
          padding: 0.6rem 0;
        `}
      >
        <CheckMark checked={isAllAgreed} />
        <Typography variant="body15SemiBold" color="gray900">
          전체 동의
        </Typography>
      </button>

      <hr
        css={css`
          border: none;
          border-top: 0.1rem solid ${DESIGN_TOKEN_COLOR.gray200};
          margin: 1.2rem 0;
        `}
      />

      <ul
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 1.2rem;
        `}
      >
        {SIGN_UP_TERMS.map((term) => (
          <li
            key={term.id}
            css={css`
              display: flex;
              align-items: center;
              column-gap: 1.2rem;
            `}
          >
            <button type="button" onClick={() => toggleTerm(term.id)} aria-pressed={agreedIds.includes(term.id)} aria-label={`${term.label} 동의`}>
              <CheckMark checked={agreedIds.includes(term.id)} />
            </button>
            <Typography variant="body15SemiBold" color="gray900">
              <button
                type="button"
                onClick={() => openTermContent(term)}
                css={css`
                  font: inherit;
                  color: inherit;
                  text-decoration-line: underline;
                  text-decoration-style: solid;
                  text-decoration-skip-ink: none;
                  text-underline-position: from-font;
                `}
              >
                {term.label}
              </button>
              {` 동의 (${term.required ? "필수" : "선택"})`}
            </Typography>
          </li>
        ))}
      </ul>

      {!isDesktop && (
        <BottomSheet
          id={TERMS_SHEET_ID}
          title={openedTerm?.label}
          sheetHeight={620}
          contents={
            <div
              css={css`
                padding-top: 1.6rem;
              `}
            >
              <TermContent content={openedTerm?.content ?? ""} />
            </div>
          }
        />
      )}
    </div>
  );
}
