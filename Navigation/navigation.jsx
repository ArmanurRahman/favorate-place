import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlaceListScreen from "../screens/PlaceListScreen";
import { Platform } from "react-native";
import Color from "../contants/color";

const defaultNavigationHeader = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Color.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
};
const PlaceNavigator = createStackNavigator(
    {
        placeList: PlaceListScreen,
        newPlace: NewPlaceScreen,
        placeDetails: PlaceDetailScreen,
        map: MapScreen,
    },
    {
        defaultNavigationOptions: defaultNavigationHeader,
    }
);

export default createAppContainer(PlaceNavigator);
