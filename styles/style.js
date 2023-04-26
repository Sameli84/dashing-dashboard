import { StyleSheet } from 'react-native';

// adjust as you need, just placeholders for now, no need to use all :)
export const constants = {
  // for spacing things out and changing later (padding, margin, gap, etc.)
  SPACER_1: 5,
  SPACER_2: 10,
  SPACER_3: 20,
  SPACER_4: 30,
  SPACER_5: 40,
  SPACER_6: 60,
  BORDER_WIDTH: 2,
  INPUT_BORDER_RADIUS: 15,
  // colors
  COLOR_WHITE: '#ffffff',
  COLOR_BLACK: '#333333',
  COLOR_BORDER: '#bababa',
  COLOR_ACTION: '#10de81', // eg. primary button background color, maybe useless because of Native Paper
  COLOR_TEXT_PLACEHOLDER: '#aaaaaa',
};

export default StyleSheet.create({
  containerCenterAligned: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: constants.COLOR_WHITE,
    padding: constants.SPACER_2,
  },
  containerLeftAligned: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: constants.COLOR_WHITE,
    padding: constants.SPACER_2,
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: constants.SPACER_2,
  },
  link: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
