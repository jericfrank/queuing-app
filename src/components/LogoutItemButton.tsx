import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Logout } from '@mui/icons-material';

function LogoutItemButton() {
  return (
    <ListItemButton>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  );
}

export default LogoutItemButton;
