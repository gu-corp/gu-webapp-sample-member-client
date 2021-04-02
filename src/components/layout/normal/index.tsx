import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from './style';
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import HeaderBar from './header-bar';
import SideBar from './side-bar';

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { children } = props;
  const user = useAuthUser(); 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar isDrawerOpen={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <SideBar isDrawerOpen={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
