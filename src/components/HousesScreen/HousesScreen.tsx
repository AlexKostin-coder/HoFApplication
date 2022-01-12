import {
  Button,
  Divider,
  FormControl,
  Input,
  Modal
} from 'native-base';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  FC,
  useState
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Header from '../widgets/Header/Header';
import { createHouse } from '../../core/houses/houses.actions';
import { housesSelector } from '../../core/houses/houses.selectors';
import { styles } from './HousesScreen.style';

const HousesScreen: FC = props => {

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [nameHouse, setNameHouse] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const houses = useSelector(housesSelector);

  const addNewHouse = async () => {
    setIsLoading(true);
    try {
      if (!nameHouse.length) {
        setIsLoading(false);
        setShowError(true);
        return false;
      }
      await dispatch(createHouse(nameHouse));
      setNameHouse("");
      setOpenModal(false);
    } catch (e) {
      console.log({ e });
    }
    setIsLoading(false);
  }

  const housesData = Object.keys(houses).length
    ? Object.keys(houses)
      .filter((house_id) => house_id !== "")
      .map((house_id) => ({ ...houses[house_id] }))
    : [];

  return (
    <View style={styles.container}>
      <Header
        title="Будинки"
      />
      <FlatList
        data={housesData}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item, index }) => {
          const {
            _id,
            name,
            count_rooms,
          } = item;
          return (
            <>
              <TouchableOpacity style={styles.house_item}>
                <Text style={styles.house_item_title}>{name}</Text>
                <Text style={styles.house_info}>{count_rooms} кімнат \ {0} пристроїв</Text>
              </TouchableOpacity>
              <Divider />
            </>
          )
        }}
      />
      <TouchableOpacity
        style={styles.add_house_item}
        onPress={() => setOpenModal((prev) => !prev)}
      >
        <Text style={styles.add_house_item_title}>Додати будинок</Text>
      </TouchableOpacity>
      <Modal size={"full"} isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Content
          marginBottom={0}
          marginTop={"auto"}
        >
          <Modal.Header>Додавання будинку</Modal.Header>
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
                placeholder="Вкажіть ім'я будинку..."
                onChangeText={(text) => setNameHouse(text)}
              />
              <FormControl.ErrorMessage>
                Ім'я не може бути пустим!
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group >
              <Button
                variant="unstyled"
                onPress={() => {
                  setOpenModal(false);
                  setShowError(false);
                }}
              >
                Відмінити
              </Button>
              <Button
                variant="unstyled"
                backgroundColor={"green.700"}
                isLoading={isLoading}
                onPress={addNewHouse}
              >
                Додати
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View >
  )
}

export default HousesScreen;

