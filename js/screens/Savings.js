import { StackNavigator } from 'react-navigation';

import SavingsIndex from '@screens/Savings/SavingsIndex';
import SavingsSaving from '@screens/Savings/SavingsSaving';
import CreateNew from '@screens/Savings/SavingsCreateNew';

export default StackNavigator(
  {
    SavingsIndex: {
      screen: SavingsIndex,
    },
    CreateNew: {
      screen: CreateNew,
    },
    SavingsSaving: {
      screen: SavingsSaving,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);
