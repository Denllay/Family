import React, { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AddBudgetModal } from './AddBudgetModal/AddBudgetModal';
import { BudgetItem } from './BudgetItem/BudgetItem';
import styles from './Main.module.scss';
import { PreLoaderBudget } from './PreLoaderBudget/PreLoaderBudget';
interface IProps {}
export const Main: React.FC<IProps> = () => {
  const budget = useTypedSelector((state) => state?.budget || []);
  const { GetDataBudget } = useActions();
  useEffect(() => {
    if (!budget.budgets) {
      console.log(budget);
      GetDataBudget();
    } else {
      console.log(budget);
    }
  }, [budget.budgets]);

  const graphBudgets = (budget.budgets &&
    budget.budgets.map((el, index) => {
      return <BudgetItem key={index} data={el.category} budgetId={el.budgetId} />;
    })) || <h1 className={styles.title}>Add a new budget!</h1>;

  return (
    <div className={styles.wrapper}>
      {budget.loadStatus === 'LOADING' ? <PreLoaderBudget /> : graphBudgets}

      {budget.showAddMenu ? <AddBudgetModal /> : null}
    </div>
  );
};
