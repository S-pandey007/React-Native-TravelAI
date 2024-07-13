import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import LoadingScreen from './LoadingScreen';

const API_KEY = "AIzaSyA43A4orUeH9Rk28-ZlodPmo2nfnxDk3HY";
const MODEL_NAME = "gemini-1.5-pro";

const Home = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
      });

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 12000,
        responseMimeType: "text/plain",
      };

      const prompt = `
        Name: ${data.name}
        Starting place: ${data.startingPlace}
        Destination: ${data.destination}
        Duration: ${data.duration} days
        Budget: ${data.budget} INR

        Please provide a day-wise itinerary for visiting the famous and popular places, as well as locally famous places, including why they are famous and what local food to try. Also, recommend hotels, how to reach them, and any cautions to be taken care of. Please note that the budget does not include flight, trains, and hotels. The hotel and flight prices may vary, and the provided information is just an estimate.
      `;

      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      const response = result.response;
      console.log(response.text());
      navigation.navigate('Detail', { itinerary: response.text() });

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Text style={styles.heading}>AI Travel Itinerary Generator</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your Name"
                placeholderTextColor="gray"
              />
            )}
            name="name"
          />
          {errors.name && <Text style={styles.error}>This is required</Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter starting place"
                placeholderTextColor="gray"
              />
            )}
            name="startingPlace"
          />
          {errors.startingPlace && <Text style={styles.error}>Starting place is required</Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter Destination"
                placeholderTextColor="gray"
              />
            )}
            name="destination"
          />
          {errors.destination && <Text style={styles.error}>Destination is required</Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter Duration in Days"
                placeholderTextColor="gray"
                keyboardType="numeric"
              />
            )}
            name="duration"
          />
          {errors.duration && <Text style={styles.error}>Duration must be a valid number</Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter Budget in INR"
                placeholderTextColor="gray"
                keyboardType="numeric"
              />
            )}
            name="budget"
          />
          {errors.budget && <Text style={styles.error}>Budget must be a valid number</Text>}

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Generate Itinerary</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'white',
  },
  textInput: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 7,
    paddingHorizontal: 10,
    fontSize: 15,
    borderRadius: 15,
    color: 'white',
  },
  error: {
    color: 'red',
    fontSize: 15,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff6347',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
