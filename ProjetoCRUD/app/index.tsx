import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import firebase from "../firebase"

const App = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");

  const router = useRouter()

  const handle = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const novoUsuarioRef = await firebase.firestore().collection("Pessoas").add({
      nome: nome,
      sobrenome: sobrenome,
      cpf: cpf
    })

    alert("Usuário criado com sucesso! ID: " + novoUsuarioRef.id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Criar usuário</Text>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          onChangeText={text => setNome(text)}
          value={nome}
        />
        <TextInput
          style={styles.input}
          placeholder='Sobrenome'
          onChangeText={text => setSobrenome(text)}
          value={sobrenome}
        />
        <TextInput
          style={styles.input}
          placeholder='CPF'
          onChangeText={text => setCpf(text)}
          value={cpf}
        />
      </View>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={handle}>
          <Text style={styles.buttonText}>Criar</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push("./pagina")}>
          <Text style={styles.buttonText}>Ver lista</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    gap: 40
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '65%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttons: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007AFF',
    justifyContent: "center",
    borderRadius: 5,
    alignItems: 'center',
    width: "35%",
    aspectRatio: 2.10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default App;
