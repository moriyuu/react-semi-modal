import * as React from "react";
import {
  useState,
  useEffect,
  useCallback,
  TouchEvent,
  MouseEvent
} from "react";
import * as iNoBounce from "inobounce";
import "./style.scss";

type Props = {
  open: boolean;
  onClose(): void;
};
type State = {
  startPointY: number;
  offset: number;
  defaultHeight: number;
  translateY: number;
};
const initialState: State = {
  startPointY: 0,
  offset: 0,
  defaultHeight: 200,
  translateY: 0
};

const SemiModal: React.FC<Props> = props => {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    if (props.open) {
      iNoBounce.enable();
      setState(_state => ({
        ..._state,
        translateY: -1 * _state.defaultHeight
      }));
    } else {
      iNoBounce.disable();
    }
  }, [props.open]);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLElement>) => {
    event.persist();

    setState(_state => ({
      ..._state,
      startPointY: event.changedTouches[0].clientY
    }));
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      event.persist();

      const height =
        -1 * state.offset > state.defaultHeight / 2 ? 0 : state.defaultHeight;
      if (height === 0) props.onClose();

      setState(_state => ({
        ..._state,
        startPointY: 0,
        offset: 0,
        translateY: -1 * height
      }));
    },
    [state.offset, state.defaultHeight]
  );

  const handleTouchMove = useCallback(
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
        translateY: -1 * height
      }));
    },
    [state.startPointY, state.offset, state.defaultHeight]
  );

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setState(_state => ({
      ..._state,
      translateY: 0
    }));

    props.onClose();
  }, []);

  const defaultHeight = props.open ? state.defaultHeight : 0;
  return (
    <div
      id="react-semi-modal-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      style={{
        backgroundColor: `rgba(0, 0, 0, ${
          -1 * state.translateY > defaultHeight
            ? 0.5
            : 0.5 * ((-1 * state.translateY) / defaultHeight)
        })`,
        visibility: props.open ? "visible" : "hidden"
      }}
    >
      <div
        id="react-semi-modal"
        onClick={(event: MouseEvent<HTMLElement>) => event.stopPropagation()}
        style={{
          transform: `translateY(${state.translateY}px)`,
          transitionDuration: props.open ? "0" : "0.1s",
          willChange: props.open ? "transform" : "auto"
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default SemiModal;
