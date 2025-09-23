import { ScrollView, View, Text } from "react-native";
import {styles} from "@/app/screens/(auth)/register/styles"

export default function Register() {
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Text>Bom dia</Text>
            </View>
        </ScrollView>
    )
}