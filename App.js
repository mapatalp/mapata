import "./ignoreWarnings";
import "react-native-gesture-handler";

import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import Toast from "react-native-toast-message";

import Navigation from "./src/navigation/Navigation";
import { theme } from "./src/ui";
import { store } from "./src/redux";
import { getItemFromLS } from "./src/utils/StorageHelper";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // make any API calls you need to do here

        loadUser();

        return true;
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const loadUser = async () => {
    const user = getItemFromLS("user");
    
    if(user){
    }
  };

  const onReady = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <Navigation onReady={onReady} />
        <Toast />
      </PaperProvider>
    </ReduxProvider>
  );
}
