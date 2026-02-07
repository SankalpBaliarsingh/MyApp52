import AsyncStorage from "@react-native-async-storage/async-storage";
import { Variables, Screen_Names } from "./Common_Configs"; 

let Navigation_Ref = null;
export function Set_Navigation_Ref(ref) {
    Navigation_Ref = ref;
}

export async function Force_Logout() {
    try {
        await AsyncStorage.multiRemove([
            Variables.JWT_Token,
            Variables.User_Info,
            Variables.Stores_List,
            Variables.Current_Store
        ]);    
    } catch (error) {
        console.error("Logout clear failed:", error);
    }
    
    if (Navigation_Ref?.reset) {
        Navigation_Ref.reset({ 
            index: 0, 
            routes: [{ name: Screen_Names.Screen_Login }] 
        });
    }
}
