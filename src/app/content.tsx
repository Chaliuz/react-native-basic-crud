import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "react-native-modal";

const initial_data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ item, list, setList, setModal, setText, setSelectedItem }) => (
  <View className="flex flex-row items-center justify-between m-2">
    <Text >{item.title}</Text>
    <View className="flex flex-row">
      <Button action={() => {
        console.log("pressed", item.id)
        setModal(true)
        setText(item.title)
        setSelectedItem(item)
      }}
        text="editar"
      />
      <Button action={() => {
        // remove item selected
        const new_list = list.filter(el => el.id !== item.id)
        setList(new_list)
      }}
        text="x"
      />

    </View>
  </View>
);

function ModalComponent({ isVisible, setModal, list, setList, text, setText, selectedItem, setSelectedItem }) {
  const [error, setError] = useState("")
  return (
    <Modal className="h-[50px]" isVisible={isVisible} >
      <View className="flex flex-col justify-center align-center px-5 bg-white p-[2rem] rounded">
        <Text className="text-black text-center text-xl font-bold">{selectedItem != null ? "Actualizar" : "Crear"} elemento</Text>
        <TextInput
          onChangeText={data => setText(data)}
          value={text}
          className="border-[1px] border-black px-2 mx-[2rem] mt-5 text-black"
          placeholder="Ingrese un dato"

        />
        <Text className="text-center text-red-600 font-bold mb-5">{error}</Text>
        <View className="flex flex-row justify-center">
          <Button action={() => {
            if (selectedItem != null) {
              // updating selected element
              if (text == "") {
                setError("Ingrese un dato")
                return
              }
              const changeTodos = list.map((el: any) => (
                el.id === selectedItem.id ? { id: el.id, title: text } : el
              ))
              setList(changeTodos);

            } else {
              // creating new element
              if (text == "") {
                setError("Ingrese un dato")
                return
              }
              const new_element = {
                id: Date.now(),
                title: text
              }
              setList([...list, new_element])
            }
            setText("")
            setModal(false)
            setSelectedItem(null)
            setError("")
          }}
            text="Guardar"
          />
          <Button action={() => {
            setText("")
            setModal(false)
            setSelectedItem(null)
            setError("")
          }}
            text="Cancelar"
          />
        </View>
      </View>
    </Modal>
  );
}

const Button = ({ action, text }) => (
  <View className="flex items-center justify-center m-2">
    <TouchableOpacity className="bg-blue-500 px-5 py-3 rounded-md" onPress={action}>
      <Text className="text-white">{text}</Text>
    </TouchableOpacity>
  </View>
);

export default function Content() {
  const [modal, setModal] = useState(false)
  const [list, setList] = useState(initial_data)
  const [text, setText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View className="flex-1 px-5">
      <ModalComponent
        isVisible={modal}
        setModal={setModal}
        list={list}
        setList={setList}
        text={text}
        setText={setText}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <Text className="text-center font-bold text-xl">CRUD EXAMPLE</Text>
      <Button action={() => setModal(true)} text="Añadir elemento" />
      <FlatList
        data={list}
        renderItem={({ item }) =>
          <Item
            item={item}
            list={list}
            setList={setList}
            setModal={setModal}
            setText={setText}
            setSelectedItem={setSelectedItem}
          />
        }
        keyExtractor={item => item.id}
      />
    </View>
  );
}
