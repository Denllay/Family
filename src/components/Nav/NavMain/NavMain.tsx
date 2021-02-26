import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavMain.module.scss';
import { auth } from '@/Firebase/config';
import { Route, Switch } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
export const NavMain: React.FC = () => {
  const { ChangeViewProfModal, ChangeViewAddBudgetModal } = useActions();
  const email = auth.currentUser && auth.currentUser.email;
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <Link to="/main">Main</Link>
        </li>
        <Switch>
          <Route path="/main">
            <li className={styles.list_item} onClick={ChangeViewAddBudgetModal}>
              <span>Add budget</span>
            </li>
          </Route>
        </Switch>
      </ul>
      <div className={styles.email_block} onClick={ChangeViewProfModal}>
        {email}
      </div>
    </div>
  );
};
