import { useContext } from 'react';

import Context from '.';
import { CardTierName } from '../../../lib/types';

const Hook = () => {
  const { state, dispatch } = useContext(Context);
  const openCreatePostModal = () => dispatch({ type: 'OPEN_CREATE_POST_MODAL' });
  const closeCreatePostModal = () => dispatch({ type: 'CLOSE_CREATE_POST_MODAL' });
  const openUpdateDescriptionModal = () => dispatch({ type: 'OPEN_UPDATE_DESCRIPTION_MODAL' });
  const closeUpdateDescriptionModal = () => dispatch({ type: 'CLOSE_UPDATE_DESCRIPTION_MODAL' });
  const openDonateModal = () => dispatch({ type: 'OPEN_DONATE_MODAL' });
  const closeDonateModal = () => dispatch({ type: 'CLOSE_DONATE_MODAL' });
  const openSubscribeModal = (tier: CardTierName) =>
    dispatch({ type: 'OPEN_SUBSCRIBE_MODAL', payload: { tier } });
  const closeSubscribeModal = () => dispatch({ type: 'CLOSE_SUBSCRIBE_MODAL' });
  return {
    state,
    openCreatePostModal,
    closeCreatePostModal,
    openUpdateDescriptionModal,
    closeUpdateDescriptionModal,
    openDonateModal,
    closeDonateModal,
    openSubscribeModal,
    closeSubscribeModal,
  };
};

export default Hook;
