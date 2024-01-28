# https://www.color-hex.com/color-palette/389

Color
#3c2f2f
#be9b7b
#fff4e6

# https://www.svgrepo.com/

    Go to Terminal and write cd ~
    Press Enter.
    Write vi .netrc . It will open the empty file in the terminal.
    Press i here to insert data here. When you enter i it will open in insert mode.
    Now paste

    machine api.mapbox.com
    login mapbox
    password sk.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Note: Don't put < braces in password >

    Press Esc Key from keyboard.
    Write :w to write all data on file.
    Now write :q to quit from file.
    You successfully save the file.
    Run Pod install

# https://reactnative.dev/docs/flexbox?language=typescript

options={{ headerShown: false }}
\

<Stack.Screen
name="Home"
component={HomeScreen}
options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}
/>

<Image
style={styles.imageIcon}
source={{
                uri: `https://api.multiavatar.com/${user.username}.png`,
              }}
/>
