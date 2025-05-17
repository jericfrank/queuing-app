import { Home, BackupTable } from '@mui/icons-material';

import HomePage from '../pages/Home';
import FormBuilderPage from '../pages/FormBuilder';

export const MAIN_MENU_ITEMS = [
  {
    name: 'Home',
    icon: <Home />,
    route: '/home',
    component: <HomePage />,
  },
  {
    name: 'Form Builder',
    icon: <BackupTable />,
    route: '/form-builder',
    component: <FormBuilderPage />,
  }
];
