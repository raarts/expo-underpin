import { AnyObject } from '@raarts/react-native-extended-stylesheet';

const WHITE = 'rgb(255,255,255)';
const BLACK = 'rgb(0,0,0)';
const NEARLYBLACK = 'rgb(18, 18, 18)';
const ALMOSTBLACK = 'rgb(18, 18, 18)';
const VERYDARKGREY = 'rgb(39, 39, 41)';
const DARKSKYBLUE = 'rgb(47,149,220)';
const LIGHTSILVERGREY = 'rgb(204,204,204)';
const LIGHTGREY = 'rgb(229,229,231)';
const ALMOSTLIGHTGREY = 'rgb(224,244,224)';
const VERYLIGHTGREY = 'rgb(242, 242, 242)';
const LIGHTDODGERBLUE = 'rgb(10,132,255)';

const themes: AnyObject = {
  default: {
    light: {
      $textColor: BLACK,
      $backgroundColor: WHITE,
      $tintColor: DARKSKYBLUE,
      $tabIconDefaultColor: LIGHTSILVERGREY,
      $tabIconSelectedColor: DARKSKYBLUE,

      // Navigation theming
      $navPrimary: LIGHTDODGERBLUE,
      $navBackground: VERYLIGHTGREY,
      $navCard: WHITE,
      $navText: ALMOSTBLACK,
      $navBorder: ALMOSTLIGHTGREY,
    },
    dark: {
      $textColor: WHITE,
      $backgroundColor: BLACK,
      $tintColor: WHITE,
      $tabIconDefaultColor: LIGHTSILVERGREY,
      $tabIconSelectedColor: WHITE,

      // Navigation theming
      $navPrimary: LIGHTDODGERBLUE,
      $navBackground: BLACK,
      $navCard: NEARLYBLACK,
      $navText: LIGHTGREY,
      $navBorder: VERYDARKGREY,
    },
  },
};

export default themes;
