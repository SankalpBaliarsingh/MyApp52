import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Feather from '@expo/vector-icons/Feather';

import * as Updates from 'expo-updates';
import * as SplashScreen from 'expo-splash-screen';  
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [iconName, setIconName] = useState('camera');
    const [ready, setReady] = useState(false);
    const icons = [
        { label: 'Camera', value: 'camera' },
        { label: 'Heart', value: 'heart' },
        { label: 'Star', value: 'star' },
        { label: 'User', value: 'user' },
        { label: 'Folder', value: 'folder' },
        { label: 'Home', value: 'home' },
        { label: 'Search', value: 'search' },
        { label: 'Settings', value: 'settings' },
        { label: 'Bell', value: 'bell' },
        { label: 'Mail', value: 'mail' },
        { label: 'Edit', value: 'edit' },
        { label: 'Plus', value: 'plus' },
        { label: 'X', value: 'x' },
        { label: 'Phone', value: 'phone' },
        { label: 'Lock', value: 'lock' },        
        { label: 'check-circle', value: 'check-circle' },
        { label: 'circle', value: 'circle' },
        { label: 'chevron-right', value: 'chevron-right' },
        { label: 'log-out', value: 'log-out' },
        { label: 'Save', value: 'save' },
    ];
    useEffect(() => {
        async function checkForUpdates() {
            try {
                const update = await Updates.checkForUpdateAsync();
                if (update.isAvailable) {       // ✅ Expo automatically caches the update, no need for manual persistence
                    Alert.alert("Update available", "The app will now reload to apply the update.");
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                }
            } catch (error) {
                console.warn("⚠️ Update check failed:", error);
            }
        }
        async function startup() {
            try {
                if (!__DEV__) checkForUpdates();  // 1. Start checking for updates (without awaiting)
            } finally {
                await SplashScreen.hideAsync();   // 2. Hide splash screen once DB is done
                setReady(true);
            }
        }
        startup();
    }, []);
    if (!ready) return null;
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select a Feather Icon</Text>

            <RNPickerSelect
                onValueChange={(value) => setIconName(value)}
                items={icons}
                placeholder={{ label: 'Choose an icon...', value: null }}
                style={pickerSelectStyles}
            />

            <View style={styles.iconContainer}>
                <Feather name={iconName} size={100} color="#42076F" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 18, marginBottom: 20 },
    iconContainer: { marginTop: 40 },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30
    },
});
