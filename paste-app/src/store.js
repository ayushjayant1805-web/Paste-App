import { configureStore } from '@reduxjs/toolkit'
import PasteReducer from './redux/PasteSLice'

export default configureStore({
  reducer: {
    paste: PasteReducer,
  },
})