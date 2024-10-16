import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useState } from "react";

export function LoginForm() {

    //TO DO: add import to index.tsx
    //TO DO: write validation functions with regex 


    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View style={styles.form}>
            <ThemedText type="subtitle">Login</ThemedText>
            <Text>Enter your email and password to log in</Text>
            <TextInput 
                style={{height: 25}}
                placeholder="Email"
                onChangeText={(newText) => setUserName(newText)}
                defaultValue={username}>
            </TextInput>
            <TextInput 
                style={{height: 25}}
                placeholder="Password"
                onChangeText={(newText) => setPassword(newText)}
                defaultValue={password}>
            </TextInput>
            <Button title="Submit" onPress={() => {}}></Button>
        </View>



    )}

    const styles = StyleSheet.create({
        form: {
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            width: "35%",

        }


    })
