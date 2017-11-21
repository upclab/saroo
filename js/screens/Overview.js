import { StackNavigator } from 'react-navigation';

import OverviewIndex from '@screens/Overview/OverviewIndex';
import CreateNewIncome from '@screens/Overview/OverviewCreateIncome';
import CreateNewOutlay from '@screens/Overview/OverviewCreateOutlay';

export default StackNavigator(
  {
    OverviewCreateIncome: {
      screen: OverviewIndex,
    },
    CreateNewIncome: {
      screen: CreateNewIncome,
    },
    CreateNewOutlay: {
      screen: CreateNewOutlay,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);
