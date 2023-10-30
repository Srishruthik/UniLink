
import React, { Component,useState,useEffect } from 'react';
import {View, Text,StyleSheet, TextInput,TouchableOpacity,Alert,FlatList,Image } from 'react-native';
import { auth,storage,firebase,firestore } from "../firebase";
import { useRoute } from "@react-navigation/native";


export default function Inbox(props){
    const route = useRoute()
    const phone = route.params.userPhone;
    const [db, setData] = useState([]);
    
    useEffect(() => {
        
        const firestore = firebase.firestore();
        console.log(phone)
        const usersCollection = firestore.collection('posts').doc(phone).collection('posts');
        usersCollection.orderBy("date").onSnapshot(querySnapshot => {
           
          const newData = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            newData.push(data);
          });
          setData(newData);
          console.log(db)
        });
      
       
    }, []);

    
    return(
        <View style={styles.container}>
        
       <FlatList
          data={db}
          renderItem={({ item }) => (
            <View  style={{height:250,backgroundColor:'red'}}>
                        <Image
                    source={{ uri: item.post }}
                    style={{ resizeMode: "cover", width: "100%", height: "100%"}}
                />
                 
                
            </View>
          )}
         />
        </View>
    )

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    });