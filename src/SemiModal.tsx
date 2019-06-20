import * as React from "react";
import {
  useState,
  useEffect,
  useCallback,
  TouchEvent,
  MouseEvent
} from "react";
import styled from "styled-components";
import * as iNoBounce from "inobounce";

type SemiModalWrapperProps = {
  open: boolean;
  defaultHeight: number;
  height: number;
};
const SemiModalWrapper = styled.div.attrs({
  style: p => ({
    backgroundColor: `rgba(0, 0, 0, ${
      p.height > p.defaultHeight ? 0.5 : 0.5 * (p.height / p.defaultHeight)
    })`
  })
})`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  /* background-color: ${(p: SemiModalWrapperProps) =>
    `rgba(0, 0, 0, ${
      p.height > p.defaultHeight ? 0.5 : 0.5 * (p.height / p.defaultHeight)
    })`}; */
  visibility: ${(p: SemiModalWrapperProps) => (p.open ? "visible" : "hidden")};
  transition: background-color 0.1s ease-out, visibility 0.1s ease-out;
`;

type SemiModalContentProps = {
  height: number;
};
const SemiModalContent = styled.div.attrs((p: SemiModalContentProps) => ({
  style: { top: `calc(100vh - ${p.height}px)` }
}))`
  position: absolute;
  /* top: ${(p: SemiModalWrapperProps) => `calc(100vh - ${p.height}px)`}; */
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #151f2b;
  border-radius: 20px 20px 0 0;
  padding: 24px 12px 0;
  color: #fff;
  transition: top 0.1s ease-out;

  &:before {
    content: "";
    position: absolute;
    top: 10px;
    right: 0;
    left: 0;
    margin: auto;
    background-color: #243346;
    height: 6px;
    width: 56px;
    border-radius: 999px;
  }
`;

type Props = {
  open: boolean;
  callbackOnClose(): void;
};
type State = {
  startPointY: number;
  offset: number;
  defaultHeight: number;
  height: number;
};
const initialState: State = {
  startPointY: 0,
  offset: 0,
  defaultHeight: 200,
  height: 0
};

const SemiModal: React.FC<Props> = props => {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    if (props.open) {
      // iNoBounce.enable();
      setState(_state => ({
        ..._state,
        height: _state.defaultHeight
      }));
    } else {
      // iNoBounce.disable();
    }
  }, [props.open]);

  const onClose = useCallback(() => {
    props.callbackOnClose();
  }, []);
  const handleStart = useCallback((event: TouchEvent<HTMLElement>) => {
    event.persist();

    setState(_state => ({
      ..._state,
      startPointY: event.changedTouches[0].clientY
    }));
  }, []);
  const handleEnd = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      event.persist();

      const height =
        -1 * state.offset > state.defaultHeight / 2 ? 0 : state.defaultHeight;
      if (height === 0) onClose();

      setState(_state => ({
        ..._state,
        startPointY: 0,
        offset: 0,
        height
      }));
    },
    [state.offset, state.defaultHeight]
  );
  const handleMove = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      event.persist();

      const offset = state.startPointY - event.changedTouches[0].clientY;
      const height =
        state.offset < 0
          ? state.defaultHeight + state.offset
          : state.defaultHeight + 0.6 * state.offset;

      setState(_state => ({
        ..._state,
        offset,
        height
      }));
    },
    [state.startPointY, state.offset, state.defaultHeight]
  );
  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setState(_state => ({
      ..._state,
      height: 0
    }));

    onClose();
  }, []);

  return (
    <SemiModalWrapper
      open={props.open}
      defaultHeight={props.open ? state.defaultHeight : 0}
      height={state.height}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchMove={handleMove}
      onClick={handleClick}
    >
      <SemiModalContent
        height={state.height}
        id="react-semi-modal"
        onClick={(event: MouseEvent<HTMLElement>) => event.stopPropagation()}
      >
        {props.children}
      </SemiModalContent>
    </SemiModalWrapper>
  );
};

export default SemiModal;
