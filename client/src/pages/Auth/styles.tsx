import { StyleSheet } from 'react-native';
import appThemeCoolors from '../../styles/ThemePalette6';

const styles = StyleSheet.create({
    avatar: {
        margin: 12,
    },

    card: {
        borderRadius: 20,
        alignItems: 'center',
        overflow: "hidden",
        backgroundColor: appThemeCoolors.colors.primary,
    },

    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appThemeCoolors.colors.background,
    },

    input: {
        width: 250,
        height: 40,
        borderWidth: 3,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: appThemeCoolors.colors.input,
    },

    select: {
        marginTop: 10,
        marginBottom: 10,     
    },

    selectLabel: {
        color: appThemeCoolors.colors.accent,
        marginBottom: 1,
    },

    button: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: appThemeCoolors.colors.accent,
    },

    text: {
        alignSelf: 'center',
        color: appThemeCoolors.colors.accent,
        
    },

    toggle: {
        position: 'absolute',
        top: 10,
        right: 25,
    },

    buttonText: {
        color: appThemeCoolors.colors.text3,
    },
})


export default styles;