
import React, { Component,useState,useEffect } from 'react';
import {View, Text,StyleSheet, TextInput,TouchableOpacity,Alert} from 'react-native';
import { auth,storage,firebase,firestore } from "../firebase";
import { useRoute } from "@react-navigation/native"
export default function SignIn(props)  {
    const [Phone, setPhone] = useState("");
    const [Password, setPassword] = useState("");
    const [db, setDb] = useState([]);
    const logIn = () => {
        const firestore = firebase.firestore();
        const usersCollection = firestore.collection('users');
      
        usersCollection.get().then((querySnapshot) => {
          const newData = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            newData.push(data);
          });
      
          // Set the newData array to the state variable db
          setDb(newData);
      
          let accountExists = false;
      
          // Check if the account already exists
          newData.forEach((item) => {
            if (item.Phone === Phone) {
              accountExists = true;
              return; // Exit the loop if an account already exists
            }
          });
      
          if (accountExists) {
            props.navigation.navigate("Home", {Phone: Phone});
          } else {
            // If the loop didn't find a matching account, create one
            Alert.alert('Account does not exist');
          }
        });
      };
    
        return (
        <View style={styles.container}> 
           <View style={{flex:2}}></View>
           <View style={styles.btmContainer}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.headTxt}>Welcome!</Text>
            </View>
            <View style={{flex:5,}}>
            <TextInput style={styles.txtInput} value={Phone}  maxLength={10} keyboardType = 'number-pad' onChangeText= {(phone) => setPhone(phone)} placeholder="Phone Number" />
                <TextInput style={styles.txtInput} value={Password}  maxLength={20}  onChangeText= {((pass) => setPassword(pass))} placeholder="Create Password" />
                
                <TouchableOpacity onPress={logIn}>
                    <View style={styles.btnBox}>
                        <Text style={{fontSize:20}}>Sign In</Text>
                    </View>
                </TouchableOpacity>
                
                   
                        <Text style={{fontSize:15,textAlign:'center',marginTop:30}}>Don't have an account? <Text style={{color:"#344e41"}} onPress={() => props.navigation.navigate("SignUp")}>Sign Up</Text></Text>
                   
                   
            </View>
           </View>
        </View>
        );
        
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#588157',
    },
    btmContainer:{
        flex:6,backgroundColor:'#dad7cd',borderTopLeftRadius:70,borderTopRightRadius:70, shadowColor: '#171717',
        elevation: 30,
        alignItems:'center',
     
     
    },
    headTxt:{
        fontSize:30,
        fontWeight:'bold',
        color:'black',
        marginBottom:20,
        
    },
    btnBox:{
        height:50,
        width:150,
        backgroundColor:'#a3b18a',
        alignSelf:'center',
        justifyContent: 'center',
        alignItems:'center',
        
    },
    txtInput:{borderBottomWidth:1,borderBottomColor:'black',width:300,margin:30}
});