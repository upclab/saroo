import { StackNavigator } from 'react-navigation';

import GroupsIndex from '@screens/Groups/GroupsIndex';
import CreateNew from '@screens/Groups/GroupsCreateNew';

export default StackNavigator(
  {
    GroupsIndex: {
      screen: GroupsIndex,
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
