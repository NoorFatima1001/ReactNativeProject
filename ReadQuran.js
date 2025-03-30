import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving data', error);
    }
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error reading data', error);
    }
};

const ReadQuran = ({ navigation }) => {
    const [data, setData] = useState([]);

    const getQuranFromApiAsync = async () => {
        try {
            const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad');
            const json = await response.json();
            await storeData("Surahs", json);
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const storedData = await getData("Surahs");
            if (storedData) {
                setData(storedData.data.surahs);
            } else {
                const newData = await getQuranFromApiAsync();
                if (newData) {
                    setData(newData.data.surahs);
                }
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quran Surahs</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} navigation={navigation} />}
                keyExtractor={item => item.number.toString()}
            />
        </View>
    );
};

export default ReadQuran;

const Item = ({ item, navigation }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Surah Screen', { selectedSurah: item })}>
        <View style={styles.item}>
            <View style={styles.surahInfo}>
                <Text style={styles.surahName}>{item.englishName}</Text>
                <Text style={styles.surahArabic}>{item.name}</Text>
            </View>
            <View style={styles.surahNumberContainer}>
                <Text style={styles.surahNumber}>Surah {item.number}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#333',
    },
    itemContainer: {
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    surahInfo: {
        flex: 1,
    },
    surahName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    surahArabic: {
        fontSize: 16,
        color: '#5f9ea0',
    },
    surahNumberContainer: {
        backgroundColor: '#5f9ea0',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    surahNumber: {
        color: 'white',
        fontSize: 16,
    },
});
