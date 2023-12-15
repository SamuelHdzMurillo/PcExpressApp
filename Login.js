import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };

    const loginUrl = "https://www.pcexpressbcs.com.mx/api/login"; // Tu URL de inicio de sesión

    axios
      .post(loginUrl, userData)
      .then((response) => {
        // Manejar la respuesta exitosa aquí
        console.log("Inicio de sesión exitoso:", response.data);
        setMessage("¡Inicio de sesión exitoso!");
        navigation.navigate("Inicio");
        // Aquí podrías navegar a la pantalla principal de tu aplicación o realizar otras acciones
      })
      .catch((error) => {
        // Manejar errores de inicio de sesión
        console.error("Error de inicio de sesión:", error);
        setMessage(
          "El correo electrónico o la contraseña son incorrectos. Por favor, inténtalo de nuevo."
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    marginTop: 10,
    color: "green", // Cambia a tu color preferido
    fontWeight: "bold",
  },
});
