"use client";

import { useCallback, useMemo, useReducer } from "react";

const HISTORY_ACTIONS = Object.freeze({
  APPLY: "HISTORY_APPLY",
  UNDO: "HISTORY_UNDO",
  REDO: "HISTORY_REDO",
});

function createHistoryState(initialPresent) {
  return { past: [], present: initialPresent, future: [] };
}

function historyReducer(state, action) {
  switch (action.type) {
    case HISTORY_ACTIONS.APPLY: {
      const { reducer, innerAction, maxHistory } = action;
      const nextPresent = reducer(state.present, innerAction);
      if (Object.is(nextPresent, state.present)) return state;

      const nextPast = [...state.past, state.present];
      const trimmedPast =
        typeof maxHistory === "number" && maxHistory > 0
          ? nextPast.slice(Math.max(0, nextPast.length - maxHistory))
          : nextPast;

      return {
        past: trimmedPast,
        present: nextPresent,
        future: [],
      };
    }
    case HISTORY_ACTIONS.UNDO: {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const nextPast = state.past.slice(0, -1);
      return {
        past: nextPast,
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case HISTORY_ACTIONS.REDO: {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const nextFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: nextFuture,
      };
    }
    default:
      return state;
  }
}

export function useUndoRedoReducer(
  reducer,
  initialArg,
  initializer,
  options = {}
) {
  const maxHistory = options.maxHistory ?? 50;

  const initialPresent = useMemo(() => {
    return typeof initializer === "function" ? initializer(initialArg) : initialArg;
  }, [initialArg, initializer]);

  const [history, historyDispatch] = useReducer(
    historyReducer,
    initialPresent,
    createHistoryState
  );

  const dispatch = useCallback(
    (innerAction) => {
      historyDispatch({
        type: HISTORY_ACTIONS.APPLY,
        reducer,
        innerAction,
        maxHistory,
      });
    },
    [maxHistory, reducer]
  );

  const undo = useCallback(() => {
    historyDispatch({ type: HISTORY_ACTIONS.UNDO });
  }, []);

  const redo = useCallback(() => {
    historyDispatch({ type: HISTORY_ACTIONS.REDO });
  }, []);

  return {
    state: history.present,
    dispatch,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}
