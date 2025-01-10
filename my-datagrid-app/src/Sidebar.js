import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';

function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': {
          width: 90,
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          backgroundColor: '#0B416E',
          color: 'white',
          padding: '12px',
        },
      }}
    >
      <div className="sidebar-top">
        <List>
          <ListItem 
            button 
            component={Link} 
            to="/" 
            selected={location.pathname === '/'}
            sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <HomeIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  style={{
                    color: 'white',
                    fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                    textAlign: 'center',
                  }}
                >
                  Home
                </Typography>
              }
            />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to="/documenti" 
            selected={location.pathname === '/documenti'}
            sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <DescriptionIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  style={{
                    color: 'white',
                    fontWeight: location.pathname === '/documenti' ? 'bold' : 'normal',
                    textAlign: 'center',
                  }}
                >
                  Documenti
                </Typography>
              }
            />
          </ListItem>
        </List>
      </div>
      <div className="sidebar-bottom">
        <List>
          <ListItem 
            button 
            component={Link} 
            to="/settings" 
            selected={location.pathname === '/settings'}
            sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <SettingsIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  style={{
                    color: 'white',
                    fontWeight: location.pathname === '/settings' ? 'bold' : 'normal',
                    textAlign: 'center',
                  }}
                >
                  Gestione
                </Typography>
              }
            />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default Sidebar; 