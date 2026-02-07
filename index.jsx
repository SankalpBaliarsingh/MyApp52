import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);


/* 
    npx expo start --tunnel

    OTA Updates Commands:
    npx expo publish                             - To publish OTA update
    npx expo publish --release-channel preview   - To publish to specific release channel

    Native Splash Screen (fast, static)
    JS Loading Screen (Expo App Loading)
    OTA Update Check (optional)
    App.js mounts
    Initial navigator screen

    "backgroundColor": "#42076F" - Purple

        useEffect(() => {
        async function checkForUpdates() {
            try {
                const update = await Promise_Timeout(Updates.checkForUpdateAsync(), Variables.Network_Promise_Timeout_Duration);
                if (update.isAvailable) {
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                }
            } catch (e) {
                console.log("Update check failed", e);
            }
        }

        // checkForUpdates();
    }, []);

    // `icon.png` is used in splash screen too
    eas build --platform android --profile preview --clear-cache

    A preview build only sees updates that you publish to the preview channel/branch.
    A production build only sees updates that you publish to the production channel/branch.

    Push OTA update to preview channel:
    eas update --channel preview --message "Some Update Message" --runtime-version "exposdk:52.0.0"

*/