import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

// RN styling elements
import { FAB } from '@rneui/themed'

// Snackbar
import Snackbar from 'react-native-snackbar'

// Context API
import { AppwriteContext } from '../appwrite/AppwriteContext'

type UserObj = {
  name: String;
  email: String;
}


const Home = () => {

  const [userData, setUserData] = useState<UserObj>();

  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)

  const handleLogout = () => {
    appwrite.logout()
    .then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logout Successful!',
        duration: Snackbar.LENGTH_SHORT
      })
    })
  }

  useEffect(() => {
    appwrite.getCurrentUser()
    .then(response => {
      if(response)
      {
        const user: UserObj ={
          name: response.name,
          email: response.email
        }
        setUserData(user)
      }
    })
  }, [appwrite])
  

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1332104709/photo/shot-of-a-young-male-engineer-using-his-laptop-in-a-server-room.jpg?s=1024x1024&w=is&k=20&c=MAhJL---c2n8Ei5oWHADXb-5rVtjvHtAsYzxXfpVUe4=',
              width: 400,
              height: 300,
              cache: 'default',
            }}
            resizeMode="contain"
          />
          <Text style={styles.message}>
            Build Fast. Scale Big. All in One Place.
          </Text>
          {userData && (
            <View style={styles.userContainer}>
              <Text style={styles.userDetails}>Name: {userData.name}</Text>
              <Text style={styles.userDetails}>Email: {userData.email}</Text>
            </View>
          )}
        </View>
        <FAB
          placement="right"
          color="#f02e65"
          size="large"
          title="Logout"
          icon={{name: 'logout', color: '#FFFFFF'}}
          onPress={handleLogout}
        />
      </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default Home