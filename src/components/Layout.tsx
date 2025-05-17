import '@fontsource/roboto/500.css';

import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { MAIN_MENU_ITEMS } from '../constants';
import LogoutItemButton from './LogoutItemButton';

const drawerWidth = 240;

type LayoutProp = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProp) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {MAIN_MENU_ITEMS.map(({ name, icon, route }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton component={RouterLink} to={route}>
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItem disablePadding>
              <LogoutItemButton />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
