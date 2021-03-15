import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details', {
            otherParam: 'anything you want here',
          });
        }}
      />
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate('Profile', {
            name: 'User Profile'
          });
        }}
      />
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder={`What's on your mind?`}
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title='Done'
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', { post: postText });
        }}
      />
    </>
  );
}

function DetailsScreen({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title='Go to Details... again'
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
      <Button title='Go back' onPress={() => navigation.goBack()} />
      <Button
        title='Go back to first screen in stack'
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function ProfileScreen({ navigation, route }) {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Overview' }}
        />
        <Stack.Screen
          name='Details'
          component={DetailsScreen}
          initialParams={{ itemId: 42 }}
        />
        <Stack.Screen
          name='CreatePost'
          component={CreatePostScreen}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
