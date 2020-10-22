import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'tabone',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'tabtwo',
            },
          },
          TabThree: {
            screens: {
              TabThreeScreen: 'tabthree',
            },
          },
          MenuOne: {
            screens: {
              TabOneScreen: 'menuone',
            },
          },
          MenuTwo: {
            screens: {
              TabTwoScreen: 'menutwo',
            },
          },
          MenuThree: {
            screens: {
              TabThreeScreen: 'menuthree',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
