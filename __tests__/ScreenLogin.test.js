import React from 'react';
import renderer from 'react-test-renderer';
import ScreenLogin from '../components/screens/ScreenLogin';

// hides warning about Animations missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// keyboard aware scrolling causes errors by default because it doesn't return children in a correct way
jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = require('react-native').ScrollView;
  return { KeyboardAwareScrollView };
});

// import mock auth and mock the auth that <ScreenLogin /> uses
jest.mock('../config/firebase', () => ({
  auth: require('../config/firebase.mock').auth,
}));

// check for rendered element
// causes logging warnings which are caused by React Native Paper components
// found some solutions but they seemed gimmicky
// tests pass so I think it's okay
describe('<ScreenLogin />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<ScreenLogin />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
