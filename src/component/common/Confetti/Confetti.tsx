import { Fragment, useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { type IProps } from "react-canvas-confetti";

const canvasStyles = {
  position: "absolute",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
} as React.CSSProperties;

type ConfettiProps = {
  style?: React.CSSProperties;
};
type CreateConfetti = NonNullable<Parameters<NonNullable<IProps["refConfetti"]>>[0]>;

/** 빵빠레 기본 세팅은 화면 중앙으로 세팅, 임포트를 통해 바로 사용 가능 */
export function Confetti({ style }: ConfettiProps) {
  const refAnimationInstance = useRef<CreateConfetti>();

  useEffect(() => {
    fire();
  }, []);

  const getInstance = useCallback((instance: confetti.CreateTypes | null) => {
    if (instance) {
      refAnimationInstance.current = instance;
    }
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: object) => {
    void (
      refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.8 },
        particleCount: Math.floor(200 * particleRatio),
        colors: ["#93c6ff", "#fff4c8"],
      })
    );
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    <Fragment>
      <ReactCanvasConfetti refConfetti={getInstance} style={{ ...canvasStyles, ...style }} />
    </Fragment>
  );
}
