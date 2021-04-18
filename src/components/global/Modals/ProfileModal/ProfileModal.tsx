import React, { useState } from 'react';
import { TProfileView } from './types/profileTypes';
import { ProfileMain } from './ProfileMain/ProfileMain';
import { useActions } from '@/hooks/useActions';
import { ProfileChangePassword } from './ProfileChangePassword/ProfileChangePassword';
import { IPropsModalComponent } from '@/types/Modal';

export const ProfileModal: React.FC<IPropsModalComponent> = () => {
  const [profileView, setProfileView] = useState<TProfileView>('view');
  const { SignOutAuth } = useActions();
  const profileModalList = {
    view: <ProfileMain onClickSignOut={SignOutAuth} setProfileView={setProfileView} />,
    passwordChange: <ProfileChangePassword setProfileView={setProfileView} />,
  };

  return profileModalList[profileView];
};
