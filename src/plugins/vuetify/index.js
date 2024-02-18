import './settings.scss'
// Vuetify
import { createVuetify } from 'vuetify'
// Material Design 3
import { md3 } from 'vuetify/blueprints'
// Material Design Icons
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
// Used Icons
import {
  mdiAccount,
  mdiAccountBox,
  mdiAccountGroup,
  mdiAccountMultiple,
  mdiAccountVoice,
  mdiApple,
  mdiArrowLeft,
  mdiBellOutline,
  mdiBluetooth,
  mdiBluetoothOff,
  mdiCardMultiple,
  mdiCashMultiple,
  mdiChartGantt,
  mdiChartLine,
  mdiChartTimelineVariant,
  mdiChevronDown,
  mdiChevronUp,
  mdiClipboardTextClock,
  mdiClipboardTextMultiple,
  mdiClockOutline,
  mdiClose,
  mdiCog,
  mdiContentCopy,
  mdiContentSaveOutline,
  mdiDelete,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiDrag,
  mdiEmail,
  mdiExportVariant,
  mdiEye,
  mdiEyeOff,
  mdiFacebook,
  mdiFormatRotate90,
  mdiGenderMaleFemale,
  mdiGithub,
  mdiGoogle,
  mdiHandFrontRight,
  mdiHeart,
  mdiHeartOutline,
  mdiHelpCircle,
  mdiHelpCircleOutline,
  mdiIdentifier,
  mdiIncognito,
  mdiInformation,
  mdiInstagram,
  mdiKey,
  mdiKeyboard,
  mdiKeyboardOutline,
  mdiLogout,
  mdiMapMarker,
  mdiMinus,
  mdiNumeric1Box,
  mdiNumeric1BoxOutline,
  mdiNumeric2Box,
  mdiNumeric2BoxOutline,
  mdiNumeric3BoxOutline,
  mdiNumeric4BoxOutline,
  mdiNumeric5BoxOutline,
  mdiOpenInNew,
  mdiPause,
  mdiPencil,
  mdiPlay,
  mdiPlus,
  mdiPodiumGold,
  mdiReload,
  mdiRepeat,
  mdiScaleBathroom,
  mdiShareVariant,
  mdiSkipForward,
  mdiSkipNext,
  mdiSkipPrevious,
  mdiThemeLightDark,
  mdiTimer,
  mdiTimerCheckOutline,
  mdiTimerPlayOutline,
  mdiTranslate,
  mdiTrophy,
  mdiTuneVariant,
  mdiUndo,
  mdiVibrate,
  mdiVideo,
  mdiVideoOff,
  mdiVolumeHigh,
  mdiWeb,
  mdiWeight
} from '@mdi/js'

export default createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      account: mdiAccount,
      accountBox: mdiAccountBox,
      accountGroup: mdiAccountGroup,
      accountMultiple: mdiAccountMultiple,
      accountVoice: mdiAccountVoice,
      apple: mdiApple,
      arrowLeft: mdiArrowLeft,
      bellOutline: mdiBellOutline,
      bluetooth: mdiBluetooth,
      bluetoothOff: mdiBluetoothOff,
      cardMultiple: mdiCardMultiple,
      cashMultiple: mdiCashMultiple,
      chartGantt: mdiChartGantt,
      chartLine: mdiChartLine,
      chartTimelineVariant: mdiChartTimelineVariant,
      chevronDown: mdiChevronDown,
      chevronUp: mdiChevronUp,
      clipboardTextClock: mdiClipboardTextClock,
      clipboardTextMultiple: mdiClipboardTextMultiple,
      clockOutline: mdiClockOutline,
      close: mdiClose,
      cog: mdiCog,
      contentCopy: mdiContentCopy,
      contentSaveOutline: mdiContentSaveOutline,
      delete: mdiDelete,
      deleteOutline: mdiDeleteOutline,
      dotsVertical: mdiDotsVertical,
      drag: mdiDrag,
      email: mdiEmail,
      exportVariant: mdiExportVariant,
      eye: mdiEye,
      eyeOff: mdiEyeOff,
      facebook: mdiFacebook,
      formatRotate90: mdiFormatRotate90,
      genderMaleFemale: mdiGenderMaleFemale,
      github: mdiGithub,
      google: mdiGoogle,
      handFrontRight: mdiHandFrontRight,
      heart: mdiHeart,
      heartOutline: mdiHeartOutline,
      helpCircle: mdiHelpCircle,
      helpCircleOutline: mdiHelpCircleOutline,
      identifier: mdiIdentifier,
      incognito: mdiIncognito,
      information: mdiInformation,
      instagram: mdiInstagram,
      key: mdiKey,
      keyboard: mdiKeyboard,
      keyboardOutline: mdiKeyboardOutline,
      logout: mdiLogout,
      mapMarker: mdiMapMarker,
      minus: mdiMinus,
      numeric1Box: mdiNumeric1Box,
      numeric1BoxOutline: mdiNumeric1BoxOutline,
      numeric2Box: mdiNumeric2Box,
      numeric2BoxOutline: mdiNumeric2BoxOutline,
      numeric3BoxOutline: mdiNumeric3BoxOutline,
      numeric4BoxOutline: mdiNumeric4BoxOutline,
      numeric5BoxOutline: mdiNumeric5BoxOutline,
      openInNew: mdiOpenInNew,
      pause: mdiPause,
      pencil: mdiPencil,
      play: mdiPlay,
      plus: mdiPlus,
      podiumGold: mdiPodiumGold,
      reload: mdiReload,
      repeat: mdiRepeat,
      scaleBathroom: mdiScaleBathroom,
      shareVariant: mdiShareVariant,
      skipForward: mdiSkipForward,
      skipNext: mdiSkipNext,
      skipPrevious: mdiSkipPrevious,
      themeLightDark: mdiThemeLightDark,
      timer: mdiTimer,
      timerCheckOutline: mdiTimerCheckOutline,
      timerPlayOutline: mdiTimerPlayOutline,
      translate: mdiTranslate,
      trophy: mdiTrophy,
      tuneVariant: mdiTuneVariant,
      undo: mdiUndo,
      vibrate: mdiVibrate,
      video: mdiVideo,
      videoOff: mdiVideoOff,
      volumeHigh: mdiVolumeHigh,
      web: mdiWeb,
      weight: mdiWeight
    },
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#012E40',
          secondary: '#366D73',
          tertiary: '#5A8C8C',
          accent: '#BCBFA4'
        }
      },
      dark: {
        colors: {
          primary: '#BCBFA4',
          secondary: '#BCBFA4',
          tertiary: '#BCBFA4',
          accent: '#BCBFA4'
        }
      }
    }
  }
})
