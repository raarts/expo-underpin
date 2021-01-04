import { AnyObject } from '@raarts/react-native-extended-stylesheet';

const WHITE = 'rgb(255,255,255)';

const DARKSKYBLUE = 'rgb(47,149,220)';
const LIGHTDODGERBLUE = 'rgb(10,132,255)';

const VERYDARKGREY = 'rgb(39, 39, 41)';
const DIMGREY = 'rgb(105,105,105)';
const LIGHTSILVERGREY = 'rgb(204,204,204)';
const ALMOSTLIGHTGREY = 'rgb(224,244,224)';
const LIGHTGREY = 'rgb(229,229,231)';
const PRETTYLIGHTGREY = 'rgb(238,238,238)';
const VERYLIGHTGREY = 'rgb(242,242,242)';

const BLACK = 'rgb(0,0,0)';
const NEARLYBLACK = 'rgb(18, 18, 18)';
const ALMOSTBLACK = 'rgb(18,18,18)';

const themes: AnyObject = {
  default: {
    light: {
      $textColor: BLACK,
      $backgroundColor: WHITE,
      $tintColor: DARKSKYBLUE,
      $sepColor: PRETTYLIGHTGREY,

      // Navigation theming
      $navPrimary: LIGHTDODGERBLUE,
      $navBackground: VERYLIGHTGREY,
      $navCard: WHITE,
      $navText: ALMOSTBLACK,
      $navBorder: ALMOSTLIGHTGREY,

      // Menubar
      $menuBarColor: DARKSKYBLUE,
      $menuTextColor: NEARLYBLACK,
      $menuBrightTextColor: BLACK,
      $menuBackgroundColor: DARKSKYBLUE,
      $menuSelectedTextColor: NEARLYBLACK,
      $menuSelectedBrightTextColor: BLACK,
      $menuSelectedBackgroundColor: WHITE,

      // Tabbar
      $tabIconDefaultColor: LIGHTSILVERGREY,
      $tabIconSelectedColor: DARKSKYBLUE,
    },
    dark: {
      $textColor: WHITE,
      $backgroundColor: BLACK,
      $tintColor: WHITE,
      $sepColor: 'rgba(255,255,255,0.1)',

      // Navigation theming
      $navPrimary: LIGHTDODGERBLUE,
      $navBackground: BLACK,
      $navCard: NEARLYBLACK,
      $navText: LIGHTGREY,
      $navBorder: VERYDARKGREY,

      // Menubar
      $menuBarColor: BLACK,
      $menuTextColor: NEARLYBLACK,
      $menuBrightTextColor: BLACK,
      $menuBackgroundColor: DARKSKYBLUE,
      $menuSelectedTextColor: BLACK,
      $menuSelectedBrightTextColor: BLACK,
      $menuSelectedBackgroundColor: LIGHTSILVERGREY,

      // Tabbar
      $tabIconDefaultColor: DIMGREY,
      $tabIconSelectedColor: WHITE,
    },
  },
};

export default themes;
