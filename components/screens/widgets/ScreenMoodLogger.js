import React from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import MoodWidgetPart from '../../MoodLogger/MoodWidgetPart';

// screens get 'navigation' as prop from context
const ScreenMoodLogger = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#def9f4' }}>
      <MoodWidgetPart navigation={navigation} route={route}></MoodWidgetPart>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text style={{ flex: 5, textAlignVertical: 'center', padding: 5 }} variant='headlineMedium'>
          Today
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          100 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text style={{ flex: 5, textAlignVertical: 'center', padding: 5 }} variant='headlineMedium'>
          Yesterday
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          85 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text style={{ flex: 5, textAlignVertical: 'center', padding: 5 }} variant='headlineMedium'>
          This week
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          60 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text style={{ flex: 5, textAlignVertical: 'center', padding: 5 }} variant='headlineMedium'>
          Last week
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          65 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text style={{ flex: 5, textAlignVertical: 'center', padding: 5 }} variant='headlineMedium'>
          This month
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          48 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text style={{ flex: 5, textAlignVertical: 'center', padding: 5 }} variant='headlineMedium'>
          This year
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          38 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#85d3c5', margin: 5, borderRadius: 10 }}>
        <Text style={{ flex: 5, textAlignVertical: 'center', padding: 5 }} variant='headlineMedium'>
          Last year
        </Text>
        <Text style={{ flex: 3, textAlignVertical: 'center' }} variant='headlineMedium'>
          42 %
        </Text>
        <View style={{ flex: 2, justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
          <Image style={styles.smiley} source={require('../../../assets/acid_smiley_free_png_tomroberts101.png')} />
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

export default ScreenMoodLogger;