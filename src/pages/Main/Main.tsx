import React, { useEffect, memo } from 'react';
import { useActions } from '@/hooks/useActions';
import { BudgetItem } from './BudgetItem/BudgetItem';
import { PreLoader } from '../../components/PreLoader/PreLoader';
import styles from './Main.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IBudgetFormatData } from '@/types/Budget/Budget';

export const Main: React.FC = memo(() => {
  const { budgetsData, budgetsLoadingStatus } = useTypedSelector((state) => state.budgets);

  const { GetDataBudget } = useActions();
  const budgetItems = (budgetsData as IBudgetFormatData[]).map((dataItem, index) => (
    <BudgetItem key={dataItem.budgetId} data={dataItem} budgetIndex={index} />
  ));

  const budgetList = budgetItems.length ? budgetItems : <h1 className={styles.title}>No budgets</h1>;

  useEffect(() => {
    GetDataBudget();
  }, [useActions]);

  return (
    <div className={styles.wrapper}>
      {budgetsLoadingStatus === 'LOADED' ? budgetList : <PreLoader preloaderStatus="budget" />}
    </div>
  );
});