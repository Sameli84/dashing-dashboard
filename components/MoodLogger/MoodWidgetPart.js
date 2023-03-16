import React from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

const MoodWidgetPart = ({ navigation, route }) => {
  return (
    <View style={{ flex: 3 }}>
      <Text
        style={{ flex: 1, textAlignVertical: 'center', paddingLeft: 7 }}
        variant='headlineLarge'
        onPress={() => {
          if (route.name == 'Dashboard') {            
            navigation.navigate('Mood');
          }
        }}
      >
        My Mood
      </Text>
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <View style={{ flex: 2, padding: 5, justifyContent: 'center', overflow: 'hidden' }}>
          <Image style={styles.smiley} source={require('../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
        <View style={{ flex: 3, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', overflow: 'hidden' }}>
            <View style={{ flex: 1, padding: 5 }}>
              <Image style={styles.smiley} source={require('../../assets/acid_smiley_free_png_tomroberts101.png')} />
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Image style={styles.smiley} source={require('../../assets/acid_smiley_free_png_tomroberts101.png')} />
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Image style={styles.smiley} source={require('../../assets/acid_smiley_free_png_tomroberts101.png')} />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', overflow: 'hidden' }}>
            <View style={{ flex: 1, padding: 5 }}>
              <Image style={styles.smiley} source={require('../../assets/acid_smiley_free_png_tomroberts101.png')} />
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Image style={styles.smiley} source={require('../../assets/acid_smiley_free_png_tomroberts101.png')} />
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Image style={styles.smiley} source={require('../../assets/acid_smiley_free_png_tomroberts101.png')} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  smiley: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#333333',
  },
});

export default MoodWidgetPart;
