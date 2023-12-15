import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const CustomTag = ({ color, label }) => (
  <View style={[styles.tag, { backgroundColor: color }]}>
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

const YourComponent = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.pcexpressbcs.com.mx/api/devices"
      );
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = data.filter(
      (item) =>
        item.brand.toLowerCase().includes(text.toLowerCase()) ||
        item.owner.name.toLowerCase().includes(text.toLowerCase()) ||
        item.device_type.toLowerCase().includes(text.toLowerCase()) ||
        item.created_at.toLowerCase().includes(text.toLowerCase()) ||
        item.damage.toLowerCase().includes(text.toLowerCase()) ||
        item.state.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const stateOrder = ["Recibido", "En Proceso", "Terminado", "Entregado"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const handleItemClick = (id) => {
    // Aquí puedes hacer lo que necesites con el ID del componente seleccionado
    console.log("ID del componente seleccionado:", id);
    // También puedes realizar alguna navegación o lógica específica aquí
    // En algún lugar de tu componente LoginScreen o HomeScreen
    navigation.navigate("DeviceDetail", { id: id }); // Cambia '123' por el ID deseado
  };

  const renderStateTag = (state) => {
    let color;
    switch (state) {
      case "Recibido":
        color = "#ff4d4f"; // Tono similar a 'tomato'
        break;
      case "En Proceso":
        color = "#fbac14"; // Tono similar a amarillo claro
        break;
      case "Terminado":
        color = "#52c51b"; // Tono similar a verde claro
        break;
      case "Entregado":
        color = "#0167ff"; // Tono similar a azul claro
        break;
      default:
        color = "#c0c0c0"; // Por ejemplo, gris más suave
        break;
    }

    return <CustomTag color={color} label={state} />;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleItemClick(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.brand}>{`${item.brand} - ${item.owner.name}`}</Text>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceType}>{`${item.device_type} - ${formatDate(
            item.created_at
          )} - ${item.damage}`}</Text>
          {renderStateTag(item.state)}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        onChangeText={handleSearch}
        value={search}
      />
      <FlatList
        data={filteredData
          .slice()
          .sort(
            (a, b) => stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state)
          )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          // Lógica al presionar el botón flotante
          // Por ejemplo, mostrar un mensaje al presionar el botón
          console.log("Botón flotante presionado");
          navigation.navigate("Alta de Dispositivo");
        }}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "#0167ff",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    elevation: 5,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    position: "relative", // Asegura que el contenedor tenga una posición relativa
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  item: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  brand: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deviceType: {
    fontSize: 14,
    color: "#666",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tagText: {
    color: "white",
  },
});

export default YourComponent;
