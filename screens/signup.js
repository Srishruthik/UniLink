
import React, { Component,useState,useEffect } from 'react';
import {View, Text,StyleSheet, TextInput,TouchableOpacity,Alert} from 'react-native';
import { auth,storage,firebase,firestore } from "../firebase";
export default function SignUp(props){
 
    const [Phone, setPhone] = useState("2145183169");
  const [Password, setPassword] = useState("Test@123");
  const [db, setDb] = useState([]);

  const checkAcc = () => {
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
        Alert.alert('Account already exists');
      } else {
        // If the loop didn't find a matching account, create one
        createAcc();
      }
    });
  };

  const createAcc = () => {
    if (Phone.length !== 10 || Password.trim().length < 5) {
      Alert.alert("Phone is not 10 digits or Password is less than 5 characters");
      return;
    } else {
      firestore.collection('users').doc(Phone).set({
        Phone: Phone,
        Password: Password,
      })
      .then(() => {
        Alert.alert("Success");
        props.navigation.navigate("SignIn");
      })
      .catch((error) => {
        Alert.alert("Error creating account: " + error.message);
      });
    }
  };

  
        return (
        <View style={styles.container}> 
           <View style={{flex:2}}></View>
           <View style={styles.btmContainer}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.headTxt}>Create Account</Text>
            </View>
            <View style={{flex:5,}}>
                <TextInput style={styles.txtInput} value={Phone}  maxLength={10} keyboardType = 'number-pad' onChangeText= {(phone) => setPhone(phone)} placeholder="Phone Number" />
                <TextInput style={styles.txtInput} value={Password}  maxLength={20}  onChangeText= {((pass) => setPassword(pass))} placeholder="Create Password" />
                
                <TouchableOpacity onPress={checkAcc}>
                    <View style={styles.btnBox}>
                        <Text style={{fontSize:20}}>Sign Up</Text>
                    </View>
                </TouchableOpacity>
                
                   
                        <Text style={{fontSize:15,textAlign:'center',marginTop:30}}>Already have an account? <Text style={{color:"#344e41"}} onPress={() => props.navigation.navigate("SignIn")}>Sign In!</Text></Text>
                   
                   
            </View>
           </View>
        </View>
        );
        
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3a5a40',
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