// React
import React, { useContext } from 'react';

// Next 
import { useRouter } from 'next/router'

// Material UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, Inbox, Settings, AccountBalanceWallet, Person, Notifications } from '@material-ui/icons';
import { LayoutContext } from '../index';

// Utility
import clsx from 'clsx';

// Style
import { useStyles } from './style';

export default function MiniDrawer({}) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter()
  const layoutContext = useContext(LayoutContext);

  return (    
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: layoutContext.isDrawerOpen,
        [classes.drawerClose]: !layoutContext.isDrawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: layoutContext.isDrawerOpen,
          [classes.drawerClose]: !layoutContext.isDrawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={layoutContext.closeDrawer}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List> 
      <ListItem button key={'Home'} onClick={ ()=>{ router.push('/')}}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem button key={'Inbox'} onClick={ ()=>{ router.push('/inbox')}}>
          <ListItemIcon><Inbox /></ListItemIcon>
          <ListItemText primary={'Inbox'} />
        </ListItem>
        <ListItem button key={'Proifle'} onClick={ ()=>{ router.push('/profile')}}>
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary={'Profile'} />
        </ListItem>
        <ListItem button key={'Wallet'} onClick={ ()=>{ router.push('/wallet')}}>
          <ListItemIcon><AccountBalanceWallet /></ListItemIcon>
          <ListItemText primary={'Wallet'} />
        </ListItem>
      </List>
      <Divider />
      <List>
      <ListItem button key={'Notification'} onClick={ ()=>{ router.push('/notification')}}>
          <ListItemIcon><Notifications /></ListItemIcon>
          <ListItemText primary={'Notification'} />
        </ListItem>
        <ListItem button key={'Setting'} onClick={ ()=>{ router.push('/setting')}}>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary={'Setting'} />
        </ListItem>
      </List>
    </Drawer>
  );
}
