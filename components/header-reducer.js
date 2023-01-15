export function headerReducer (state, { type }) {
  switch (true) {
    case
      type === 'init':
      return {
        isSearchIconHidden: true,
        isSearchHidden: false,
        isSearchFull: false,
        isHistoryIconHidden: false,
        isHistoryHidden: true,
      }

    case
      (type === 'search-icon-clicked' && !state.isSearchFull):
      return {
        // Open Search modal
        isSearchIconHidden: true,
        isSearchHidden: false,
        isSearchFull: true,
        isHistoryIconHidden: false,
        isHistoryHidden: true,
      }

    case
      (type === 'history-icon-clicked' && state.isHistoryHidden):
      return {
        // Open History modal
        isSearchIconHidden: false,
        isSearchHidden: true,
        isSearchFull: false,
        isHistoryIconHidden: true,
        isHistoryHidden: false,
    }

    case
      (type === 'escape-pressed' && (state.isSearchFull || !state.isHistoryHidden))||
      type === 'window-scrolled' ||
      (type === 'search-icon-clicked' && state.isSearchFull) ||
      (type === 'history-icon-clicked' && !state.isHistoryHidden) ||
      (type === 'modal-blurred' && (state.isSearchFull || !state.isHistoryHidden)):
      return {
        // Close modals
        isSearchIconHidden: false,
        isSearchHidden: true,
        isSearchFull: false,
        isHistoryIconHidden: false,
        isHistoryHidden: true,
      }
  }
  return state
}
