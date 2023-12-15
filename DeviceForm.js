import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import ImagePicker from "react-native-image-picker";

import axios from "axios";

const DeviceForm = () => {
  const [state, setState] = useState("Recibido");
  const [deviceType, setDeviceType] = useState("");
  const [brand, setBrand] = useState("");
  const [damage, setDamage] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [observations, setObservations] = useState("");
  const [accesories, setAccesories] = useState("");
  const [technican, setTechnican] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [image, setImage] = useState(null);

  const handleImagePicker = () => {
    const options = {
      title: "Select Image",
      mediaType: "photo", // Podría ser 'video', 'mixed', dependiendo de tu necesidad
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("El usuario canceló la selección de imágenes");
      } else if (response.errorCode) {
        console.log("Error:", response.errorMessage);
      } else {
        const source = { uri: response.uri };
        setImage(source);
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("state", state);
      formData.append("device_type", deviceType);
      formData.append("brand", brand);
      formData.append("damage", damage);
      formData.append("model", model);
      formData.append("serial", serial);
      formData.append("observations", observations);
      formData.append("accesories", accesories);
      formData.append("technican", technican);
      formData.append("owner_id", ownerId);
      formData.append("img", {
        uri: image.uri,
        type: "image/jpeg",
        name: "deviceImage.jpg",
      });

      const response = await axios.post(
        "https://www.pcexpressbcs.com.mx/api/devices",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      // Realizar acciones adicionales después de enviar los datos, si es necesario
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ScrollView>
      {/* Inputs para ingresar datos */}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={state}
          onChangeText={(text) => setState(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Tipo de dispositivo"
          value={deviceType}
          onChangeText={(text) => setDeviceType(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Marca"
          value={brand}
          onChangeText={(text) => setBrand(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Daño"
          value={damage}
          onChangeText={(text) => setDamage(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={model}
          onChangeText={(text) => setModel(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Serial"
          value={serial}
          onChangeText={(text) => setSerial(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Observaciones"
          value={observations}
          onChangeText={(text) => setObservations(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Accesorios"
          value={accesories}
          onChangeText={(text) => setAccesories(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Técnico"
          value={technican}
          onChangeText={(text) => setTechnican(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="ID del propietario"
          value={ownerId}
          onChangeText={(text) => setOwnerId(text)}
        />

        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={handleImagePicker}
        >
          <Text style={styles.imagePickerText}>Seleccionar Imagen</Text>
        </TouchableOpacity>
        {image && (
          <Image
            source={image}
            style={styles.imagePreview}
            resizeMode="contain"
          />
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  imagePickerButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DeviceForm;
