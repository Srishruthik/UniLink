import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { doc, updateDoc, serverTimestamp, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth,storage,firestore,firebase } from "../firebase";

import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function Home(props) {
  const route = useRoute();
  const [image, setImage] = useState("");
  const userData = route.params;
  const [db, setData] = useState([]);
  const usersCollection = firestore.collection("users");
  const [friendsPhone, setFriendsPhone] = useState("");




  const inboxScreen = () => {
    props.navigation.navigate("Inbox", { userPhone: userData.Phone });
  }


  const firestoreDB = (uploadURL,friendsPhone) => {
    // upload to user level
    // to its specific user
    firestore
      .collection("posts")
      .doc(friendsPhone)
      .collection("posts")
      .doc()
      .set({
        post: uploadURL,
        sentBy: userData.Phone,
        date: firebase.firestore.FieldValue.serverTimestamp(),

      });
      setFriendsPhone(friendsPhone)
  };


  const uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    try{
      const storageRef = ref(storage, 'images/' + userData.Phone+"/"+  Date.now());
      const result =  await uploadBytes(storageRef, blob);
        blob.close();
        return await getDownloadURL(storageRef);
    }catch(error){
      alert(error.message)
    }
}

  const sentImage = async (friendsPhone) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uploadURL = await uploadImage(result.assets[0].uri);
      setImage(uploadURL);
      firestoreDB(uploadURL,friendsPhone);
      setInterval(() => {}, 2000);
    } else {
    alert("You canceled ")
      setInterval(() => {}, 2000);
    }
    console.log(image);
  };

  // compomentn did mount thing the fucntion thata it calls after it updates lol
  useEffect(() => {
    usersCollection.get().then((querySnapshot) => {
      const newData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.Phone !== userData.Phone) {
          newData.push(data);
        }
      });
      setData(newData);
    });
  }, [userData]); // Include userData as a dependency for useEffect

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ alignSelf: "center", fontSize: 30 }}>
          Hello {userData?.Phone}
        </Text>
      </View>
      <View style={{ flex: 3 }}>
        <FlatList
          data={db}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => sentImage(item?.Phone)}
              style={styles.accContainer}
            >
              <Text style={styles.textCenter}>{item?.Phone}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.btnBox}
          onPress={() => props.navigation.navigate("SignIn")}
        >
          <Text style={{ fontSize: 20, color: "#cad2c5" }}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={inboxScreen} style={styles.btnBox}>
          <Text style={{ fontSize: 20, color: "#cad2c5" }}>Check Inbox</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dad7cd",
  },
  accContainer: {
    flex: 3,
    margin: 10,
    padding: 10,
    backgroundColor: "#a3b18a",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBox: {
    flex: 3,
    margin: 10,
    padding: 10,
    backgroundColor: "#354f52",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
