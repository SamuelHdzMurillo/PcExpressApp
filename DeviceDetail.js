import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const DeviceDetailComponent = () => {
  const route = useRoute();
  const { id } = route.params;
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Para controlar la visibilidad del modal
  const [showUpdates, setShowUpdates] = useState(false);

  useEffect(() => {
    const fetchDeviceDetail = async () => {
      try {
        const response = await fetch(
          `https://www.pcexpressbcs.com.mx/api/devices/${id}`
        );
        const data = await response.json();
        setDevice(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching device details:", error);
        setLoading(false);
      }
    };

    fetchDeviceDetail();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const renderUpdates = () => {
    return device.updates.map((update) => (
      <TouchableOpacity
        key={update.id}
        style={styles.updateItem}
        onPress={() => handleUpdateClick(update)}
      >
        <Text>{update.title}</Text>
      </TouchableOpacity>
    ));
  };

  const handleUpdateClick = (update) => {
    console.log("Update seleccionado:", update);
    // Aquí puedes definir la lógica para mostrar la información detallada del update seleccionado
    // Por ejemplo, abrir un modal con la información del update
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!device) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>No se encontraron detalles para el dispositivo con ID: {id}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={{ uri: device.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Image
                source={{ uri: device.imageUrl }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </View>
          </Modal>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>ID:</Text>
              <Text style={styles.text}>{device.id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Nombre Propietario:</Text>
              <Text style={styles.text}>{device.owner.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Tipo de dispositivo:</Text>
              <Text style={styles.text}>{device.device_type}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Model:</Text>
              <Text style={styles.text}>{device.model}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Serial:</Text>
              <Text style={styles.text}>{device.serial}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Observaciones:</Text>
              <Text style={styles.text}>{device.observations}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Fecha de llegada:</Text>
              <Text style={styles.text}>{formatDate(device.created_at)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Marca:</Text>
              <Text style={styles.text}>{device.brand}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Daño:</Text>
              <Text style={styles.text}>{device.damage}</Text>
            </View>
            <TouchableOpacity
              style={styles.showUpdatesButton}
              onPress={() => setShowUpdates(!showUpdates)}
            >
              <Text style={styles.showUpdatesText}>
                {showUpdates
                  ? "Ocultar Actualizaciones"
                  : "Mostrar Actualizaciones"}
              </Text>
            </TouchableOpacity>
            {showUpdates && (
              <View style={styles.updatesContainer}>
                <Text style={styles.updatesTitle}>Actualizaciones:</Text>
                {device.updates.map((update) => (
                  <TouchableOpacity
                    key={update.id}
                    style={styles.updateItem}
                    onPress={() => handleUpdateClick(update)}
                  >
                    <Text style={styles.updateTitle}>{update.title}</Text>
                    <Text style={styles.updateDescription}>
                      {update.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {/* Otros detalles del dispositivo según la estructura de datos */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Estilos anteriores
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  details: {
    padding: 15,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  modalImage: {
    width: "90%",
    height: "90%",
  },
  showUpdatesButton: {
    backgroundColor: "#eee",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  showUpdatesText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  updatesContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  updatesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  updateDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default DeviceDetailComponent;
