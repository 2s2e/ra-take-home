import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';


export default function App() {

  //using state for name, email, whether to display login or logout page, the logins array, and total number of logins
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loginPageDisplay, setLoginPageDisplay] = useState('flex');
  const [logoutPageDisplay, setLogoutPageDisplay] = useState('none');
  const [logins, setLogins] = useState([]);
  const [numLogins, setNumLogins] = useState(0);

  //when logging in, switch to the correct page, add to the login count, add to the logins array, and reset the name and email fields
  const handleLogin = () => {
    if(name === '' || email === '') {
      alert('Please enter a name and email');
      return;
    }
    setLogins([...logins, {name: name, email: email, numLogins: numLogins+1}]);
    setNumLogins(numLogins + 1);
    setLoginPageDisplay('none');
    setLogoutPageDisplay('flex');
    setName('');
    setEmail('');
  }

  //when logging out, simply switch back to the login page 
  const handleLogout = () => {
    setLoginPageDisplay('flex');
    setLogoutPageDisplay('none');
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* login page */}
      <View style={[styles.screen, {display: loginPageDisplay}]}>
        <Text style={{fontSize: 30, flex: 0.2}}>Login</Text>
        
        <View style={styles.inputContainer}>
          <Text style={{fontSize: 20}}>Name</Text>
          <TextInput 
            style={styles.input}
            onChangeText={text => setName(text)}
          ></TextInput>
        </View>

        <View style={styles.inputContainer}>
          <Text style={{fontSize: 20}}>Email</Text>
          <TextInput 
            style={styles.input}
            onChangeText={text => setEmail(text)}
          ></TextInput>
        </View>

        <Button
          title="Login"
          style={styles.bluebutton}
          onPress={() => handleLogin()}
        ></Button>
      </View>

      {/* logout page */}
      <View style={[styles.screen, {display: logoutPageDisplay }]}>        
      <Text style={{fontSize: 30, flex: 0.2}}>Logout</Text>
        <Text style={styles.welcome}>Hello {name}, 
        You have logged in {logins.length} times.</Text>

        <View style={styles.logonscroller}>
          <ScrollView>
            {logins.map((login, index) => {
              return (
                <View key={index}>
                  <Text style={styles.scrollItem}> Logged in at: {login.numLogins}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <Button
          title="Logout"
          style={styles.bluebutton}
          onPress={() => handleLogout()}
        ></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  bluebutton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    minWidth: "80%",
    height: "10%",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  inputContainer: {
    padding: 10,
    flex: 0.2,
    width: "80%",
  },

  welcome: {
    fontSize: 20,
    flex: 0.1,
    width: "80%",
    textAlign: 'center',
  },

  logonscroller: {
    flex: 0.3,
    width: "80%",
    padding: 20
  },

  scrollItem: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'black',
    padding: 3,
    margin: 3,
    borderRadius: 16,
  } 

});
