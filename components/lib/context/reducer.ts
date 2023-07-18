export type Action =
  | { type: 'OPEN_CREATE_POST_MODAL' }
  | { type: 'CLOSE_CREATE_POST_MODAL' }
  | { type: 'OPEN_UPDATE_DESCRIPTION_MODAL' }
  | { type: 'CLOSE_UPDATE_DESCRIPTION_MODAL' };

export type State = {
  createPostModalOpen: boolean;
  updateDescriptionModalOpen: boolean;
};

export const defaultState = (): State => ({
  createPostModalOpen: false,
  updateDescriptionModalOpen: false,
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
  }
};
