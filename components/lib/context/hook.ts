import { useContext } from 'react';

import Context from '.';

const Hook = () => {
  const { state, dispatch } = useContext(Context);
  const openCreatePostModal = () => dispatch({ type: 'OPEN_CREATE_POST_MODAL' });
  const closeCreatePostModal = () => dispatch({ type: 'CLOSE_CREATE_POST_MODAL' });
  const openUpdateDescriptionModal = () => dispatch({ type: 'OPEN_UPDATE_DESCRIPTION_MODAL' });
  const closeUpdateDescriptionModal = () => dispatch({ type: 'CLOSE_UPDATE_DESCRIPTION_MODAL' });
  return {
    state,
    openCreatePostModal,
    closeCreatePostModal,
    openUpdateDescriptionModal,
    closeUpdateDescriptionModal,
  };
};

export default Hook;
