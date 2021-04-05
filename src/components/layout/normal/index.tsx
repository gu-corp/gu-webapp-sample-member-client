// React, Redux
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

// Material UI
import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Redux Store
import { RootState }　from '@store/configure-store';
import { openDrawer, closeDrawer } from '@store/actions/window-state-actions';

// Components
import { useStyles } from './style';
import HeaderBar from './header-bar';
import SideBar from './side-bar';

const useWindowState = () => {
  return useSelector(
    (state: RootState) => {
      return {
        isSidebarOpen: state.windowState.isDrawerOpen
      }
    },
    shallowEqual
  )
}

export const LayoutContext = React.createContext({
  isDrawerOpen: true,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export default function MiniDrawer(props) {
  const classes = useStyles();
  const { children } = props;
  const dispatch = useDispatch();
  const windowState = useWindowState();

  return (
    <div className={classes.root}>
      <LayoutContext.Provider value={{ 
        isDrawerOpen: windowState.isSidebarOpen,
        openDrawer: () => dispatch(openDrawer()),
        closeDrawer: () => dispatch(closeDrawer())
      }}>   
        <CssBaseline />
        <HeaderBar />
        <SideBar/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </LayoutContext.Provider>   
    </div>
  );
}
