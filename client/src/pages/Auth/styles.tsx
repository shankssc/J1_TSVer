import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    avatar: {
        margin: 12,
        
    },

    card: {
        borderRadius: 20,
        alignItems: 'stretch',
        overflow: "hidden",
        
    },

    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    input: {
        width: 250,
        height: 40,
        borderWidth: 3,
        borderRadius: 30,
        marginTop: 12,
        marginBottom: 12,
        paddingBottom: 10
    },

    select: {
        marginTop: 12,
        marginBottom: 12,
        paddingBottom: 10
    },

    button: {
        marginTop: 12,
        marginBottom: 12,
        paddingBottom: 10 
    }
})

export default styles;