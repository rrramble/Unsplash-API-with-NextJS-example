import { Action } from '@reduxjs/toolkit'
import { MenuState } from 'types/menu-state'

export const INITIAL_STATE: MenuState = {
  isSearchIconHidden: true,
  isSearchHidden: false,
  isSearchFull: false,
  isHistoryIconHidden: false,
  isHistoryHidden: true,
} as const

const SEARCH_MODAL_OPEN: MenuState = {
  isSearchIconHidden: true,
  isSearchHidden: false,
  isSearchFull: true,
  isHistoryIconHidden: false,
  isHistoryHidden: true,
} as const

const HISTORY_MODAL_OPEN: MenuState = {
  isSearchIconHidden: false,
  isSearchHidden: true,
  isSearchFull: false,
  isHistoryIconHidden: true,
  isHistoryHidden: false,
} as const

const MODALS_CLOSED: MenuState = {
  isSearchIconHidden: false,
  isSearchHidden: true,
  isSearchFull: false,
  isHistoryIconHidden: false,
  isHistoryHidden: true,
} as const

export function headerReducer(state: MenuState, { type }: Action) {
  switch (true) {
    case
      type === 'init':
      return INITIAL_STATE

    case
      (type === 'search-icon-clicked' && !state.isSearchFull):
      return SEARCH_MODAL_OPEN

    case
      (type === 'history-icon-clicked' && state.isHistoryHidden):
      return HISTORY_MODAL_OPEN

    case
      (type === 'escape-pressed' && (state.isSearchFull || !state.isHistoryHidden)) ||
      type === 'window-scrolled' ||
      (type === 'search-icon-clicked' && state.isSearchFull) ||
      (type === 'history-icon-clicked' && !state.isHistoryHidden) ||
      (type === 'modal-blurred' && (state.isSearchFull || !state.isHistoryHidden)) ||
      (type === 'minimize-menu')
      :
      return MODALS_CLOSED
  }
  return state
}
