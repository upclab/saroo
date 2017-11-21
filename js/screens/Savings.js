import { StackNavigator } from 'react-navigation';

import SavingsIndex from '@screens/Savings/SavingsIndex';
import CreateNew from '@screens/Savings/SavingsCreateNew';

export default StackNavigator(
  {
    SavingsIndex: {
      screen: SavingsIndex,
    },
    CreateNew: {
      screen: CreateNew,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);
