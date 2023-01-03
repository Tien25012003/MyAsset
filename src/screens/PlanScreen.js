import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Animated,
  Alert,
} from 'react-native';
import HeaderDrawer from '../components/Header_Drawer';
import scale from '../constants/scale';
import CustomButton from '../components/CustomButton';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {
  addPlan,
  IncreaseCurrentUse,
  removePlan,
  updatePlan,
} from '../Redux/PlanData';
import generateUUID from '../constants/generateUUID';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PlanScreen({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateSelect, setDateSelect] = useState('');
  const [isDatePickerFinishVisible, setDatePickerFinishVisibility] =
    useState(false);
  const [dateFinish, setDateFinish] = useState('');
  const [budget, setBudget] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const planData = useSelector(state => state.planData);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [newData, setNewData] = useState({});

  //console.log(planData);
  //console.log(percentage);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    //console.warn("A date has been picked: ", date);
    setDateSelect(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const showDatePicker_Finish = () => {
    setDatePickerFinishVisibility(true);
  };

  const hideDatePicker_Finish = () => {
    setDatePickerFinishVisibility(false);
  };

  const handleConfirm_Finish = date => {
    //console.warn("A date has been picked: ", date);
    setDateFinish(moment(date).format('YYYY-MM-DD'));
    hideDatePicker_Finish(); //
  };

  const onConfirmPlan = () => {
    if (dateSelect !== '' && dateFinish !== '' && budget !== '') {
      let d = new Date(moment(currentDate).format('YYYY-MM-DD'));
      let d1 = new Date(dateSelect);
      let d2 = new Date(dateFinish);

      if (d1.getTime() > d2.getTime()) {
        Alert.alert(
          'Warning',
          'Ngày bắt đầu lớn hơn ngày kết thúc! Vui lòng nhập lại dữ liệu!',
        );
      } else if (d.getTime() > d1.getTime()) {
        Alert.alert(
          'Warning',
          'Ngày bắt đầu bé hơn ngày hiện tại! Vui lòng nhập lại dữ liệu!',
        );
      } else {
        if (flag === false) {
          dispatch(
            addPlan({
              key: generateUUID(),
              dateStart: dateSelect,
              dateFinish: dateFinish,
              budget: budget,
              currentuse: 0,
              percentage_of_use: 0,
              isExceed: false,
            }),
          );
        } else {
          dispatch(
            updatePlan({
              index: newData.index,
              dateStart: dateSelect,
              dateFinish: dateFinish,
              budget: budget,
              currentuse: newData.newCurrentuse,
              percentage_of_use: newData.newPercent,
              isExceed: newData.newIsexceed,
            }),
          );
          dispatch(
            IncreaseCurrentUse({
              index: newData.index,
              value: 0,
            }),
          );
          setFlag(false);
        }
        setDateSelect('');
        setDateFinish('');
        setBudget('');
      }
    }
  };
  //console.log(newData);
  const onChangePlan = (index, item) => {
    //console.log(index,item);
    setFlag(true);
    setShowModal(true);
    setDateSelect(item.dateStart);
    setDateFinish(item.dateFinish);
    setBudget(item.budget);
    //onConfirmPlan(index,item.currentuse, item.percentage_of_use, item.isExceed);
    onConfirmPlan();
    //console.log(item.isExceed);
    setNewData({
      index: index,
      newCurrentuse: item.currentuse,
      newPercent: item.percentage_of_use,
      newIsexceed: item.isExceed,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.view}>
      <ScrollView>
        <HeaderDrawer
          onPress={() => navigation.openDrawer('HomeScreen')}
          fontSize={scale(30)}
          title="KẾ HOẠCH"
          style={{color: 'black', fontWeight: 'bold'}}
        />

        {planData.length === 0 ? (
          <View style={[styles.big_row, {alignItems: 'center'}]}>
            <Text
              style={{
                fontSize: scale(50),
                color: '#CDCACA',
                fontFamily: 'Itim-Regular',
              }}>
              Chưa có dữ liệu
            </Text>
          </View>
        ) : (
          <>
            {planData.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.big_row}>
                    <View style={styles.slider_view}>
                      <View style={[styles.figure_view, {paddingBottom: 3}]}>
                        <Text style={styles.text}>
                          {moment(item.dateStart).format('DD/MM/YYYY')} -{' '}
                          {moment(item.dateFinish).format('DD/MM/YYYY')}
                        </Text>
                        <View style={styles.updatebox}>
                          <Pressable
                            android_ripple={{color: '#bbbbbb'}}
                            style={{marginRight: 7}}
                            onPress={() => onChangePlan(index, item)}>
                            <MaterialCommunityIcons
                              name="pencil-outline"
                              size={20}
                              color={'#1C1B1F'}
                            />
                          </Pressable>
                          <Pressable
                            android_ripple={{color: '#bbbbbb'}}
                            onPress={() => dispatch(removePlan(index))}>
                            <AntDesign
                              name="delete"
                              size={20}
                              color={'#1C1B1F'}
                            />
                          </Pressable>
                        </View>
                      </View>
                      <View style={styles.progressBar}>
                        <Animated.View
                          style={
                            ([StyleSheet.absoluteFill],
                            {
                              backgroundColor:
                                item.isExceed === true
                                  ? 'hsl(0,74%,52%)'
                                  : 'hsl(111,84%,36%)',
                              width: String(item.percentage_of_use) + '%',
                              borderRadius: 5,
                            })
                          }
                        />
                      </View>
                      <View style={styles.figure_view}>
                        <Text
                          style={[
                            styles.text,
                            {
                              color: item.isExceed
                                ? 'hsl(0,74%,52%)'
                                : 'hsl(111,84%,36%)',
                            },
                          ]}>
                          {item.currentuse}
                        </Text>
                        <Text style={[styles.text, {color: 'rgb(255,153,0)'}]}>
                          {item.budget} VND
                        </Text>
                      </View>

                      <View style={{alignItems: 'center'}}>
                        {item.isExceed ? (
                          <Text
                            style={[
                              styles.text,
                              {color: 'hsl(0,74%,52%)', fontSize: scale(18)},
                            ]}>
                            Vượt định mức: {item.currentuse - item.budget}
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>

      <View style={styles.floatingbutton}>
        <Pressable
          onPress={() => {
            setShowModal(true);
            setFlag(false);
            setDateSelect('');
            setDateFinish('');
            setBudget('');
          }}
          style={({pressed}) => [
            {backgroundColor: pressed ? '#0099FF' : 'white'},
            {...styles.wrapper},
            {...styles.shadow},
          ]}>
          <Image
            source={require('../assets/images/pen.png')}
            resizeMode="stretch"
            style={{
              height: scale(30),
              width: scale(30),
              borderRadius: scale(30),
            }}
            //style = {styles.circle}
          />
        </Pressable>
      </View>

      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent
        statusBarTranslucent
        animationType="fade">
        <Pressable
          style={styles.modal_view}
          onPress={() => setShowModal(false)}
        />

        <View style={styles.modal_view}>
          <View style={styles.modal_box}>
            <ScrollView>
              <KeyboardAvoidingView style={styles.modal_bigrow}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: scale(25),
                    fontWeight: 'bold',
                  }}>
                  Kế hoạch mới
                </Text>
                <View style={styles.modal_row}>
                  <Text style={styles.text_modal}>1. Ngày bắt đầu : </Text>
                  <TextInput
                    style={styles.textInput_style}
                    onChangeText={setDateSelect}
                    placeholderTextColor={'black'}
                    textColor="blue"
                    activeUnderlineColor="black"
                    editable={false}
                    value={dateSelect}
                    right={
                      <TextInput.Icon
                        icon={{
                          uri: 'https://img.icons8.com/ios/50/null/calendar--v1.png',
                        }}
                        onPress={showDatePicker}
                      />
                    }
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>

                <View style={styles.modal_row}>
                  <Text style={styles.text_modal}>2. Ngày kết thúc: </Text>
                  <TextInput
                    style={styles.textInput_style}
                    onChangeText={setDateFinish}
                    placeholderTextColor="black"
                    textColor="blue"
                    editable={false}
                    activeUnderlineColor="black"
                    value={dateFinish}
                    right={
                      <TextInput.Icon
                        icon={{
                          uri: 'https://img.icons8.com/ios/50/null/calendar--v1.png',
                        }}
                        onPress={showDatePicker_Finish}
                      />
                    }
                  />

                  <DateTimePickerModal
                    isVisible={isDatePickerFinishVisible}
                    mode="date"
                    onConfirm={handleConfirm_Finish}
                    onCancel={hideDatePicker_Finish}
                  />
                </View>

                <View style={styles.modal_row}>
                  <Text style={styles.text_modal}>3.Định mức : </Text>
                  <TextInput
                    style={styles.textInput_style}
                    onChangeText={setBudget}
                    value={budget}
                    placeholderTextColor="black"
                    underlineStyle={{borderWidth: 0}}
                    textColor="blue"
                    activeUnderlineColor="black"
                  />
                </View>

                <CustomButton
                  style={{
                    height: scale(40),
                    width: '30%',
                    borderColor: 'orange',
                  }}
                  colorPress={'#FFC700'}
                  colorUnpress={'#ffeba3'}
                  text_style={styles.text_style}
                  title={'LƯU'}
                  onPressFunction={onConfirmPlan}
                />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  text: {
    fontSize: scale(15),
    color: '#000000',
    fontFamily: 'Itim-Regular',
  },

  floatingbutton: {
    position: 'absolute',
    zIndex: 999,
    right: scale(30),
    bottom: scale(150),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(70),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
  },

  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },

  big_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: scale(30),
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },

  slider_view: {
    alignItems: 'center',
    justifyContent: 'center',

    width: '90%',
  },

  figure_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'green',
    width: '100%',
    alignItems: 'flex-end',
    //alignItems: 'center',
  },

  updatebox: {
    flexDirection: 'row',
  },

  progressBar: {
    height: scale(10),
    width: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: scale(5),
    flexDirection: 'row',
  },

  ///Modal of input plan
  modal_view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modal_box: {
    width: '100%',
    height: '120%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  modal_bigrow: {
    alignItems: 'center',
    //flexDirection: 'column',
    paddingVertical: 20,
    justifyContent: 'center',
  },

  modal_row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 15,
    width: '100%',
    justifyContent: 'center',
  },
  textInput_style: {
    //paddingHorizontal: scale(10),
    //padding: scale(2),
    //paddingLeft: 0,
    fontSize: scale(18),
    borderBottomWidth: 0.5,
    //borderBottomColor: 'black',
    width: '50%',
    backgroundColor: '#ffffff',
    height: scale(30),
  },

  text_modal: {
    fontSize: scale(20),
    color: '#000000',
    fontFamily: 'Itim-Regular',
  },

  text_style: {
    color: 'black',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});
