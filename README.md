git clone https://github.com/phantu820/sepApp.git

cd sepApp

Configure project with EAS to run project in development build

-> eas build -p android --profile development

-> Download file apk from expo dashboard

------------------------------------------------
HOW TO CREATE A REACT NATIVE PROJECT WITH EXPO
This page will help you install and build your first React Native app.

If you are new to mobile development, the easiest way to get started is with Expo Go. Expo is a set of tools and services built around React Native and, while it has many features, the most relevant feature for us right now is that it can get you writing a React Native app within minutes. You will only need a recent version of Node.js and a phone or emulator. If you'd like to try out React Native directly in your web browser before installing any tools, you can try out Snack.

If you are already familiar with mobile development, you may want to use React Native CLI. It requires Xcode or Android Studio to get started. If you already have one of these tools installed, you should be able to get up and running within a few minutes. If they are not installed, you should expect to spend about an hour installing and configuring them.

Run the following command to create a new React Native project called "AwesomeProject":

npx create-expo-app AwesomeProject

cd AwesomeProject
npx expo start

This will start a development server for you.

Running your React Native application
Install the Expo Go app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the Expo Go app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the default iOS Camera app.

Modifying your app
Now that you have successfully run the app, let's modify it. Open App.js in your text editor of choice and edit some lines. The application should reload automatically once you save your changes.

That's it!
Congratulations! You've successfully run and modified your first React Native app.


Now what?
Expo also has docs you can reference if you have questions specific to the tool. You can also ask for help on the Expo Discord.

If you have a problem with Expo, before creating a new issue, please see if there's an existing issue about it in the Expo issues.

If you're curious to learn more about React Native, check out the Introduction to React Native.

Running your app on a simulator or virtual device
Expo Go allows you to run your React Native app on a physical device without installing iOS and Android native SDKs. If you want to run your app on the iOS Simulator or an Android Virtual Device, please refer to the instructions for "React Native CLI Quickstart" to learn how to install Xcode or set up your Android development environment.

Once you've set these up, you can launch your app on an Android Virtual Device by running npm run android, or on the iOS Simulator by running npm run ios (macOS only).

Caveats
The Expo Go app is a great tool to get started — it exists to help developers quickly get projects off the ground, to experiment with ideas (such as on Snack) and share their work with minimal friction. Expo Go makes this possible by including a feature-rich native runtime made up of every module in the Expo SDK, so all you need to do to use a module is install the package with npx expo install and reload your app.

The tradeoff is that the Expo Go app does not allow you to add custom native code — you can only use native modules built into the Expo SDK. There are many great libraries available outside of the Expo SDK, and you may even want to build your own native library. You can leverage these libraries with development builds, or by using "prebuild" to generate the native projects, or both. Learn more about adding native code to projects created with create-expo-app.

create-expo-app configures your project to use the most recent React Native version that is supported by the Expo SDK. The Expo Go app usually gains support for a given React Native version with new SDK versions (released quarterly). You can check this document to find out what versions are supported.

If you're integrating React Native into an existing project, you can use the Expo SDK and development builds, but you will need to set up a native development environment. Select "React Native CLI Quickstart" above for instructions on configuring a native build environment for React Native.
