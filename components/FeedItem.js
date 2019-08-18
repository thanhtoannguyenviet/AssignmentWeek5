import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { white } from 'ansi-colors';
export default class FeedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onPressReadMore = () => {
        const {
            item: { url }
        } = this.props;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log(`Don't know how to open URL: ${url}`);
            }
        });
    }
    render() {
        const { item: { title, urlToImage, url, source, content, publishedAt } } = this.props
        return (
            <View style={styles.card}>
                <Text style={styles.header}>{title}</Text>
                <Image source={{ uri: urlToImage }} style={styles.image} />
                <View style={styles.row}>
                    <Text style={styles.label}>Source:</Text>
                    <Text style={styles.info}>{source.name}</Text>
                </View>
                <Text style={styles.info}>{content}</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Published:</Text>
                    <Text style={styles.info}>
                        {publishedAt}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPressReadMore}
                >
                    <Text style={styles.txtReadMe}>Read Me!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    card: {
        paddingVertical: 10,
        borderColor: 'gray',
        borderRadius: 15,
        borderWidth: 0.8,
        marginBottom: 15
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'stretch',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        paddingLeft: 10
    },
    row: {
        flexDirection: 'row'
    }, label: {
        fontSize: 16,
        color: 'black',
        marginLeft: 10,
        fontWeight: 'bold'
    },
    info: {
        marginLeft: 10,
        fontSize: 16,
        color: 'grey'
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
    }, 
    txtReadMe: {
        color: 'white'
    }

})