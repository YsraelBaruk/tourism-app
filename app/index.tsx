import { Text, View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 50,
  }
})

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Israel</Text>
      <Image
        style={styles.img}
        source={{uri: 'https://blog.autocompara.com.br/wp-content/uploads/2024/06/carros-esportivos.jpeg'}}
      />
    </View>
  );
}