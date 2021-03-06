import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  ChevronRightIcon,
  Divider,
  FormControl,
  Input,
  Modal
} from 'native-base';
import React, {
  FC,
  useState
} from 'react';
import {
  createHouse,
  deleteHouse,
  editHouse,
  getHouses,
  setCurrentHouse,
} from '../../core/houses/houses.actions';
import {
  currentHouseIdSelector,
  housesSelector,
} from '../../core/houses/houses.selectors';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import DeleteIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import Header from '../widgets/Header/Header';
import { SwipeListView } from 'react-native-swipe-list-view';
import { declOfNum } from '../../core/tools/declOfNum';
import { getRooms } from '../../core/rooms/rooms.actions';
import { styles } from './HousesScreen.style';
import { userDevicesSelector } from '../../core/devices/devices.selectors';

const HousesScreen: FC = props => {

  const [modal, setModal] = useState<{ show: boolean, type: "add" | "edit" }>({
    show: false,
    type: "add",
  });
  const [nameHouse, setNameHouse] = useState<string>("");
  const [currentHouseEdit, setCurrentHouseEdit] = useState<{ name: string, house_id: string }>({
    name: "",
    house_id: ""
  });
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const houses = useSelector(housesSelector);
  const currentHouseId = useSelector(currentHouseIdSelector);
  const userDevices = useSelector(userDevicesSelector);

  const getData = async () => {
    setIsLoading(true);
    try {
      await dispatch(getHouses());
      await dispatch(getRooms());
    } catch (e) {
      console.log({ e });
    }
    setIsLoading(false);
  }

  const handleChangeHouse = async () => {
    setIsLoading(true);
    try {
      if (!nameHouse.length) {
        setIsLoading(false);
        setShowError(true);
        return false;
      }

      const action = modal.type === "add"
        ? createHouse(nameHouse)
        : editHouse(currentHouseEdit.house_id, nameHouse);

      await dispatch(action);
      await getData();

      setNameHouse("");
      setModal((prev) => ({
        show: false,
        type: prev.type,
      }));
    } catch (e) {
      console.log({ e });
    }
    setIsLoading(false);
  };

  const handleEditHouse = (house_id: string, name: string) => {
    setModal((prev) => ({ show: !prev.show, type: "edit" }));
    setCurrentHouseEdit({ name, house_id });
    setNameHouse(name);
  }

  const removeHouse = async (rowMap: any, rowKey: string) => {
    setIsLoading(true);
    const elem = rowMap[rowKey];
    try {
      if (elem) {
        rowMap[rowKey].closeRow();
        await dispatch(deleteHouse(rowKey));
        await getData();
        if (currentHouseId === rowKey) {
          const house = Object.keys(houses).find((house, index) => index == 1) || "";
          dispatch(setCurrentHouse(house));
        }
      }
    } catch (e) {
      console.log({ e });
    }
    setIsLoading(false);
  }

  const confirmRemove = (rowMap: any, rowKey: string, name: string) => {
    Alert.alert(
      `???? ???????????? ???????????? ???????????????? ?????????????? ${name}?`,
      `?????????????? ???????? ???????????????? ?????????? ???? ?????????? ?????????????????? ?? ??????????!`,
      [
        {
          text: "??????????????????",
          style: "cancel"
        },
        {
          text: "??????",
          onPress: async () => await removeHouse(rowMap, rowKey)
        }
      ]
    );
  }

  const housesData = Object.keys(houses).length
    ? Object.keys(houses)
      .filter((house_id) => house_id !== "")
      .map((house_id) => ({ ...houses[house_id] }))
    : [];

  return (
    <View style={styles.container}>
      <Header
        title="?????????????????? ??????????????????"
      />
      <SwipeListView
        style={styles.house_list}
        data={housesData}
        keyExtractor={(item, index) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={async () => await getData()}
          />
        }
        renderItem={({ item, index }) => {
          const {
            _id,
            name = "",
            rooms = [],
            temperature_sensors = [],
            segment_clocks = []
          } = item;

          const count_rooms = rooms.length
          const count_devices = temperature_sensors.length + segment_clocks.length

          return (
            <>
              <View style={styles.house_item}>
                <Text style={styles.house_item_title}>{name}</Text>
                <View style={styles.wrapper_house_info}>
                  <Text style={styles.house_info}>{count_rooms} {declOfNum(count_rooms, ['??????????????', '??????????????', '????????????'])} \ {count_devices} {declOfNum(count_devices, ['????????????????', '????????????????', '??????????????????'])}</Text>
                  <ChevronRightIcon size="5" />
                </View>
              </View>
              <Divider />
            </>
          )
        }}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.house_item}>
            <TouchableOpacity
              onPress={() => {
                handleEditHouse(data.item._id, data.item.name);
                rowMap[data.item._id].closeRow();
              }}
            >
              <EditIcon
                width={24}
                height={24}
                fill={'grey'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmRemove(rowMap, data.item._id, data.item.name)}>
              <DeleteIcon
                width={24}
                height={24}
                fill={'#C52233'}
              />
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={60}
        rightOpenValue={-60}
      />
      <TouchableOpacity
        style={styles.add_house_item}
        onPress={() => setModal((prev) => ({ show: !prev.show, type: "add" }))}
      >
        <Text style={styles.add_house_item_title}>???????????? ??????????????</Text>
      </TouchableOpacity>
      <Modal size={"full"} isOpen={modal.show} onClose={() => setModal({ show: false, type: "add", })}>
        <Modal.Content
          marginBottom={0}
          marginTop={"auto"}
        >
          <Modal.Header>{`${modal.type === "add" ? '?????????????????? ??????????????' : `?????????????????????? ?????????????? ${currentHouseEdit.name}`}`}</Modal.Header>
          <Modal.Body>
            <FormControl
              isInvalid={showError && !nameHouse.length}
            >
              <Input
                m="0"
                p="0"
                value={nameHouse}
                variant={"unstyled"}
                size="lg"
                placeholder="?????????????? ????'?? ??????????????..."
                onChangeText={(text) => setNameHouse(text)}
              />
              <FormControl.ErrorMessage>
                ????'?? ???? ???????? ???????? ????????????!
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group >
              <Button
                variant="unstyled"
                onPress={() => {
                  setModal((prev) => ({ show: false, type: prev.type, }));
                  setShowError(false);
                }}
              >
                ??????????????????
              </Button>
              <Button
                variant="unstyled"
                backgroundColor={"green.700"}
                isLoading={isLoading}
                onPress={handleChangeHouse}
              >
                {`${modal.type === "add" ? '????????????' : '????????????????????'}`}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View >
  )
}

export default HousesScreen;

