import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      setCurrentTime(formattedTime);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quran</Text>
        <Text style={styles.clock}>{currentTime}</Text>
        <Image
          style={styles.quranImage}
          source={{ uri: 'https://parspng.com/wp-content/uploads/2022/09/quranpng.parspng.com-12.png' }}
        />
        <View style={styles.lastReadContainer}>
          <Text style={styles.lastReadTitle}>Last Read</Text>
          <Text style={styles.surahName}>Al-Faatiha</Text>
          <Text style={styles.verseNumber}>Verse No. 7</Text>
        </View>
      </View>
      
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Features</Text>
        <View style={styles.featuresGrid}>
          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => navigation.navigate('Read Quran')}
          >
            <Image 
              style={styles.featureIcon}
              source={{ uri: 'https://static.vecteezy.com/system/resources/previews/021/886/069/non_2x/illustration-of-the-holy-quran-book-book-islamic-icons-can-be-used-for-the-month-of-ramadan-eid-and-eid-al-adha-for-logo-website-and-poster-designs-free-vector.jpg' }}
            />
            <Text style={styles.featureText}>Read Quran</Text>
          </TouchableOpacity>
          
          <View style={styles.featureItem}>
            <FontAwesome name="search" size={50} color="#4A4A4A" />
            <Text style={styles.featureText}>Search</Text>
          </View>
          
          <View style={styles.featureItem}>
            <FontAwesome name="bookmark" size={50} color="#4A4A4A" />
            <Text style={styles.featureText}>Bookmark</Text>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f9ea0', // Light decent blue
  },
  header: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  clock: {
    color: 'white',
    fontSize: 18,
    marginTop: 5,
  },
  quranImage: {
    height: 100,
    width: 100,
    marginVertical: 10,
  },
  lastReadContainer: {
    alignItems: 'center',
    marginTop: -10, // Moves the Last Read section slightly up
  },
  lastReadTitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  surahName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  verseNumber: {
    color: 'white',
    fontSize: 16,
  },
  featuresContainer: {
    flex: 0.5,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingVertical: 20,
  },
  featuresTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  featureItem: {
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  featureIcon: {
    height: 50,
    width: 50,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
  },
});
