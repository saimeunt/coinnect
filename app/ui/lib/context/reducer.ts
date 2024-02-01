import { type CardTierName } from '@/app/lib/types';

export type Action =
  | { type: 'OPEN_CREATE_POST_MODAL' }
  | { type: 'CLOSE_CREATE_POST_MODAL' }
  | { type: 'OPEN_UPDATE_DESCRIPTION_MODAL' }
  | { type: 'CLOSE_UPDATE_DESCRIPTION_MODAL' }
  | { type: 'OPEN_DONATE_MODAL' }
  | { type: 'CLOSE_DONATE_MODAL' }
  | { type: 'OPEN_SUBSCRIBE_MODAL'; payload: { tier: CardTierName } }
  | { type: 'CLOSE_SUBSCRIBE_MODAL' }
  | { type: 'OPEN_CREATE_EXCLUSIVITY_MODAL' }
  | { type: 'CLOSE_CREATE_EXCLUSIVITY_MODAL' }
  | { type: 'OPEN_SHARE_PAGE_MODAL' }
  | { type: 'CLOSE_SHARE_PAGE_MODAL' };

export type State = {
  createPostModalOpen: boolean;
  updateDescriptionModalOpen: boolean;
  donateModalOpen: boolean;
  subscribeModalOpen: boolean;
  tier: CardTierName;
  createExclusivityModalOpen: boolean;
  sharePageModalOpen: boolean;
};

export const defaultState = (): State => ({
  createPostModalOpen: false,
  updateDescriptionModalOpen: false,
  donateModalOpen: false,
  subscribeModalOpen: false,
  tier: 'free',
  createExclusivityModalOpen: false,
  sharePageModalOpen: false,
});

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'OPEN_CREATE_POST_MODAL': {
      return { ...state, createPostModalOpen: true };
    }
    case 'CLOSE_CREATE_POST_MODAL': {
      return { ...state, createPostModalOpen: false };
    }
    case 'OPEN_UPDATE_DESCRIPTION_MODAL': {
      return { ...state, updateDescriptionModalOpen: true };
    }
    case 'CLOSE_UPDATE_DESCRIPTION_MODAL': {
      return { ...state, updateDescriptionModalOpen: false };
    }
    case 'OPEN_DONATE_MODAL': {
      return { ...state, donateModalOpen: true };
    }
    case 'CLOSE_DONATE_MODAL': {
      return { ...state, donateModalOpen: false };
    }
    case 'OPEN_SUBSCRIBE_MODAL': {
      return { ...state, subscribeModalOpen: true, tier: action.payload.tier };
    }
    case 'CLOSE_SUBSCRIBE_MODAL': {
      return { ...state, subscribeModalOpen: false };
    }
    case 'OPEN_CREATE_EXCLUSIVITY_MODAL': {
      return { ...state, createExclusivityModalOpen: true };
    }
    case 'CLOSE_CREATE_EXCLUSIVITY_MODAL': {
      return { ...state, createExclusivityModalOpen: false };
    }
    case 'OPEN_SHARE_PAGE_MODAL': {
      return { ...state, sharePageModalOpen: true };
    }
    case 'CLOSE_SHARE_PAGE_MODAL': {
      return { ...state, sharePageModalOpen: false };
    }
    default: {
      return state;
    }
  }
};
