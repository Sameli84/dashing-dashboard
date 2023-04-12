import { React, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { constants } from '../../styles/style';

const Aphorisms = () => {
  const [aphorism, setAphorism] = useState({ q: 'Inspiration incoming...', a: '' });

  const options = {
    method: 'GET',
  };

  useEffect(() => {
    const asyncToday = async () => {
      fetch('https://zenquotes.io/api/quotes/', options)
        .then((response) => response.json())
        .then((response) => {
          setAphorism(response[Math.floor(Math.random() * 50)]);
        })
        .catch((err) => console.error(err));
    };
    asyncToday();
  }, []);
  
  return (
    <View style={{ marginTop: constants.SPACER_2, flex: 3 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlignVertical: 'center', paddingLeft: 7 }} variant='headlineLarge'>
          Inspiration of the Day
        </Text>
      </View>
      <View style={{ flex: 3 }}>
        <Text style={{ textAlignVertical: 'center', paddingLeft: 7, fontFamily: 'MorrisRoman', fontSize: 30}} >
          {aphorism['q']}
        </Text>
        <Text style={{ textAlignVertical: 'center', paddingLeft: 7, fontFamily: 'MorrisRoman', fontSize: 24 }}>- {aphorism['a']}</Text>
      </View>
    </View>
  );
};

export default Aphorisms;
