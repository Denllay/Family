import React, { useEffect } from 'react';
import styles from './BottomMenu.module.scss';
import { useActions } from '@/hooks/useActions';
import { EnumCurrency, TCurrency } from '@/types/Budget';
import { ICategoryFormatData } from '@/store/types/Budget/Budget';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useForm, SubmitHandler } from 'react-hook-form';
interface IProps {
  data: ICategoryFormatData[];
  budgetId: string;
}
type TInputs = {
  nameCategory: string;
  valueCategory: string;
  currency: TCurrency;
};

export const BottomMenu: React.FC<IProps> = ({ data, budgetId }) => {
  const onClickRemove = () => RemoveBudget(budgetId);
  //
  const { register, handleSubmit, setValue } = useForm<TInputs>();
  const { AddCategoryBudget, RemoveBudget } = useActions();
  //
  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setValue('currency', e.target.value);
  //
  const { RUB: currencyRub }: { RUB: number } = useTypedSelector((state) => state?.budget.currencyData || []);
  const indexFreeCategory = data.findIndex((el) => el.name === 'free');
  //
  const onSubmit: SubmitHandler<TInputs> = (dataForm) => {
    const { nameCategory, valueCategory, currency } = dataForm;
    const numValueCategory = Number.parseInt(valueCategory);
    ///
    const { value: valueFree, currency: currencyFree }: { value: number; currency: TCurrency } = data[
      indexFreeCategory
    ];

    const newCategoryValue: number =
      currencyFree === currency
        ? numValueCategory
        : currencyFree === EnumCurrency.RUB
        ? numValueCategory * currencyRub
        : numValueCategory / currencyRub;
    ///
    const sucsess =
      nameCategory.trim().length >= 3 &&
      valueCategory.length > 0 &&
      numValueCategory !== 0 &&
      newCategoryValue <= valueFree;

    sucsess &&
      AddCategoryBudget(
        budgetId,
        nameCategory.trim(),
        Math.round(newCategoryValue),
        Math.round(valueFree - newCategoryValue)
      );
  };

  return (
    <div className={styles.bottom_container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_title}>
          <h2>Add new Category</h2>
        </div>
        <input
          type="text"
          placeholder="Name of category"
          name="nameCategory"
          className={styles.input}
          ref={register({ required: true, minLength: 3, maxLength: 9 })}
        />
        <div className={styles.block_input_number}>
          <input
            type="number"
            placeholder="Category budget"
            name="valueCategory"
            className={`${styles.input} ${styles.input_number}`}
            ref={register({ required: true, minLength: 1, maxLength: 13 })}
          />
          <select className={styles.select} name="currency" onChange={selectChange} ref={register}>
            <option className={styles.option}>{EnumCurrency.RUB}</option>
            <option className={styles.option}>{EnumCurrency.USD}</option>
          </select>
        </div>
        <input type="submit" value="Add" className={styles.submit} />
      </form>

      <div className={styles.icon_block}>
        <div className={styles.icon_item} onClick={onClickRemove}>
          <div className={styles.icon_remove}></div>
        </div>
      </div>
    </div>
  );
};
