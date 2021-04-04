import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from './style';
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import HeaderBar from './header-bar';
import SideBar from './side-bar';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState }　from '@store/configure-store';
import { toggleSidebarOpenStateAction } from '@store/actions/window-state-actions';

const useWindowState = () => {
  return useSelector(
    (state: RootState) => {
      return {
        isSidebarOpened: state.windowState.isSidebarOpened
      }
    },
    shallowEqual
  )
}

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { children } = props;
  const user = useAuthUser(); 
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(toggleSidebarOpenStateAction())
  };

  const handleDrawerClose = () => {
    dispatch(toggleSidebarOpenStateAction())
  };

  const windowState = useWindowState();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar isDrawerOpen={windowState.isSidebarOpened} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <SideBar isDrawerOpen={windowState.isSidebarOpened} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
