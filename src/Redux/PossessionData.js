import {firebase} from '@react-native-firebase/firestore';
import {createSlice} from '@reduxjs/toolkit';
import {Keyboard} from 'react-native';
const PossessionData = createSlice({
  name: 'PossessionData',
  initialState: [],
  reducers: {
    addPossession: (state, action) => {
      const newPossession = {
        key: action.payload.key,
        name: action.payload.name,
        value: action.payload.value,
        note: action.payload.note,
        showNote: false,
      };
      state.push(newPossession);
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('PossessionData')
        .doc(newPossession.key)
        .set(newPossession, {merge: true})
        .then(() => {
          Keyboard.dismiss();
        });
    },
    removePossession: (state, action) => {
      state.splice(action.payload, 1);
      firebase
        .firestore()
        .collection('Accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('PossessionData')
        .doc(action.payload.key)
        .delete()
        .then(() => {
          console.log('Xóa thành công');
        })
        .catch(error => {
          console.log('Xóa thất bại');
        });
    },
    setShowNote: (state, action) => {
      state[action.payload].showNote = !state[action.payload].showNote;
    },
  },
});

export const {addPossession, removePossession, setShowNote} =
  PossessionData.actions;
export default PossessionData.reducer;
