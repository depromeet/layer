import { css } from "@emotion/react";
import { forwardRef, useContext, useState, useRef, useEffect, useCallback } from "react";

import { InputContext } from "./InputLabelContainer";
import { patterns } from "./patterns.const";

import { Typography } from "@/component/common/typography";
import { useValidation } from "@/hooks/useValidation";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";

type TextAreaProps = {
  value: string;
  width?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  autoResize?: boolean;
  count?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validations?: (keyof typeof patterns)[];
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function (
  { id, width = "100%", height = "7.4rem", minHeight = "5.4rem", maxHeight = "20rem", autoResize = false, count, validations, onChange, ...props },
  ref,
) {
  const { maxLength, value } = props;
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaContext = useContext(InputContext);
  const { errorMsg, onInputValidate } = useValidation({ validations, maxLength });

  // * 두 개의 ref를 결합하는 callback ref
  const setRefs = useCallback(
    (element: HTMLTextAreaElement | null) => {
      textareaRef.current = element;

      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    },
    [ref],
  );

  // * 텍스트에 따른 높이 자동 조절
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;

      // 높이를 리셋하여 scrollHeight를 정확히 측정
      textarea.style.height = "inherit";

      const scrollHeight = textarea.scrollHeight;

      // rem을 px로 변환
      const minHeightPx = parseFloat(minHeight.replace("rem", "")) * 10;
      const maxHeightPx = parseFloat(maxHeight.replace("rem", "")) * 10;

      // scrollHeight와 최소/최대 높이를 비교
      const calculatedHeight = Math.max(minHeightPx, Math.min(scrollHeight, maxHeightPx));

      textarea.style.height = `${calculatedHeight}px`;
    }
  }, [value, autoResize, minHeight, maxHeight]);

  return (
    <div>
      <div
        css={css`
          width: ${width};
          border: 1px solid;
          border-color: ${isFocused ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray300};
          border-radius: 1.2rem;
          padding: 1.6rem 1.4rem;
          display: flex;
          flex-direction: column;
          min-height: ${autoResize ? minHeight : height};
          max-height: ${autoResize ? maxHeight : "none"};
          transition: border-color 0.2s;
        `}
      >
        <textarea
          ref={setRefs}
          id={id || textareaContext?.id}
          css={css`
            flex-grow: 1;
            overflow-y: auto;
            resize: none;
            height: ${autoResize ? "auto" : "100%"};
            ::placeholder {
              color: ${DESIGN_TOKEN_COLOR["gray500"]};
              ${DESIGN_TOKEN_TEXT["body15Medium"]}
            }
            ${DESIGN_TOKEN_TEXT["body15Medium"]};
            color: ${DESIGN_TOKEN_COLOR.gray900};
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            onChange(e);
            onInputValidate(e);
          }}
          {...props}
        />
        {count && maxLength && (
          <div
            css={css`
              align-self: flex-end;
            `}
          >
            <Typography variant={"body12Medium"} color={value.length ? "blue600" : "gray500"}>
              {value.length}
            </Typography>
            <Typography variant={"body12Medium"} color={"gray500"}>{`/${maxLength}`}</Typography>
          </div>
        )}
      </div>
      {errorMsg && (
        <div
          css={css`
            margin-top: 0.8rem;
          `}
        >
          <Typography color={"red400"} variant={"body14Medium"}>
            {`*${errorMsg}`}
          </Typography>
        </div>
      )}
    </div>
  );
});

TextArea.displayName = "TextArea";
