import React, { useState } from 'react';
import styles from './ProfModule.module.scss';
import Modal from 'react-modal';
import { TProfileView } from './types/profileMainTypes';
import { ProfModuleShow } from './ProfModuleShow/ProfModuleShow';
import { ProfModuleSettings } from './ProfModuleSettings/ProfModuleSettings';
import { ProfileContext } from '@/context/ProfileContext';
import { useActions } from '@/hooks/useActions';
import { auth } from '@/firebase/config';

export const ProfModule: React.FC = () => {
  const [profileView, setProfileView] = useState<TProfileView>('view');
  const { CloseModal, SignOutAuth } = useActions();
  const onCloseModal = () => CloseModal();
  const onClickSignOut = () => {
    SignOutAuth();
    CloseModal();
    //
  };
  const styleWidth = profileView === 'view' ? '140px' : '300px';
  const styleHeight = profileView === 'view' ? '' : '250px';
  //
  const email = !!auth.currentUser ? (auth.currentUser.email as string) : 'null';
  Modal.setAppElement('#root');
  return (
    <div className={styles.wrapper}>
      <Modal
        closeTimeoutMS={500}
        isOpen={true}
        onRequestClose={onCloseModal}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 100,
          },
          content: {
            border: 'none',
            width: styleWidth,
            height: styleHeight,
            overflow: 'hidden',
            top: '10%',
            right: '1%',
            left: 'auto',
            bottom: 'auto',
            padding: '15px 0px 0px 0px',
            borderRadius: '5px 5px 5px 5px',
          },
        }}
      >
        {profileView === 'view' ? (
          <ProfModuleShow onClickSignOut={onClickSignOut} email={email} setProfileView={setProfileView} />
        ) : (
          <ProfileContext.Provider value={{ setProfileView, onCloseModal }}>
            <ProfModuleSettings profileView={profileView} />
          </ProfileContext.Provider>
        )}
      </Modal>
    </div>
  );
};
