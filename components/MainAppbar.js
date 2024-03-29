import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { getHeaderTitle } from '@react-navigation/elements';

export default function MainAppbar(props) {

    const title = getHeaderTitle(props.options, props.route.name);

    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleMenuItemPress = (menuItem) => {
        closeMenu();
        if (menuItem === 'Favorites') {
            props.navigation.navigate('Favorites'); //nämä tulee propsina App.js:stä
        } else if (menuItem === 'Settings') {
            props.navigation.navigate('Settings');  //nämä tulee propsina App.js:stä
        }
    };

    return (
        <Appbar.Header style={{ backgroundColor: props.backgroundColor, color: props.color }}
            mode='center-aligned'
            elevated={true}
            >
               
            {props.back ? <Appbar.BackAction color={props.color} onPress={() => props.navigation.goBack()} /> : null}

            <Appbar.Content title={title}
                titleStyle={{ fontFamily: props.fontFamily, fontSize: props.fontSize, }} color={props.color} />

            <Menu visible={menuVisible}
                onDismiss={closeMenu}
                anchor={<Appbar.Action icon={props.icon} color={props.color} onPress={openMenu} />}>

                <Menu.Item
                    style={styles.menuStyle}
                    onPress={() => handleMenuItemPress('Favorites')} title="Favorites"
                    titleStyle={styles.menuItemTitle} />
                <Menu.Item
                    style={styles.menuStyle}
                    onPress={() => handleMenuItemPress('Settings')} title="Settings"
                    titleStyle={styles.menuItemTitle} />
            </Menu>

        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    menuStyle: {
        backgroundColor: '#EAEAEA',

    },
    menuItemTitle: {
        // color: '#8E8A92',
        fontFamily: 'Comfortaa',
        fontSize: 16,
    }
})