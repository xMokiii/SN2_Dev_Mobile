import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Button } from 'react-native-paper';
import DreamForm from './DreamForm';
import { MaterialIcons } from '@expo/vector-icons';

export default function DreamList() {
    const [dreams, setDreams] = useState([]);
    const [selectedDream, setSelectedDream] = useState(null);

    const fetchData = async () => {
        try {
            const data = await AsyncStorage.getItem('dreamFormDataArray');
            const dreamFormDataArray = data ? JSON.parse(data) : [];
            const validDreams = dreamFormDataArray.filter(dream => dream && dream.dreamText);
            setDreams(validDreams);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
            return () => {
                console.log('Cette route est maintenant désactivée.');
            };
        }, [])
    );

    const handleDeleteDream = async (index) => {
        try {
            const updatedDreams = dreams.filter((_, i) => i !== index);
            setDreams(updatedDreams);
            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams));
        } catch (error) {
            console.error('Erreur lors de la suppression du rêve:', error);
        }
    };

    const handleDeleteAllDreams = async () => {
        try {
            await AsyncStorage.removeItem('dreamFormDataArray');
            setDreams([]);
        } catch (error) {
            console.error('Erreur lors de la suppression de tous les rêves:', error);
        }
    };

    const handleEditDream = (dream, index) => {
        setSelectedDream({ ...dream, index });
    };

    const handleFormSubmit = () => {
        setSelectedDream(null);
        fetchData();
    };

    

    return (
        <ScrollView>
            <Text style={styles.title}>Liste des Rêves🌙</Text>
            <Button onPress={handleDeleteAllDreams} mode="contained" color="red" style={styles.deleteAllButton}>
                Supprimer tous les rêves
            </Button>
            {dreams.length > 0 ? (
                dreams.map((dream, index) => (
                    <View key={index} style={styles.dreamContainer}>
                        <Text style={styles.dreamText}>
                            <MaterialIcons name="bedtime" size={18} color="#6A5ACD" /> Rêve : {dream.dreamText} {'\n'}
                            <MaterialIcons name="emoji-emotions" size={18} color="#6A5ACD" /> Etat émotionnel : {dream.dreamText2} {'\n'}
                            <MaterialIcons name="category" size={18} color="#6A5ACD" /> Type : {dream.dreamType} {'\n'}
                            <MaterialIcons name="mood" size={18} color="#6A5ACD" /> Tonalité : {dream.tonaliteType} {'\n'}
                            <MaterialIcons name="filter" size={18} color="#6A5ACD" /> Intensité : {dream.intensite_emotion} {'\n'}
                            <MaterialIcons name="bed" size={18} color="#6A5ACD" /> Qualité sommeil : {dream.qualite_sommeil} {'\n'}
                            <MaterialIcons name="announcement" size={18} color="#6A5ACD" /> Clarté : {dream.clarte} {'\n'}
                            <MaterialIcons name="event" size={18} color="#6A5ACD" /> Date : {new Date(dream.todayDate).toLocaleString('fr-FR')}
                        </Text>
                        {dream.hashtags && dream.hashtags.length > 0 && (
                            <Text style={styles.hashtagsText}>
                                <MaterialIcons name="label" size={18} color="#6A5ACD" /> Hashtags : {dream.hashtags.join(', ')}
                            </Text>
                        )}
                        <Button onPress={() => handleEditDream(dream, index)} mode="outlined" style={styles.editButton}>
                            <MaterialIcons name="edit" size={16} /> Modifier
                        </Button>
                        <Button onPress={() => handleDeleteDream(index)} mode="contained" color="red" style={styles.deleteButton}>
                            <MaterialIcons name="delete" size={16} /> Supprimer
                        </Button>
                    </View>
                ))
            ) : (
                <Text style={styles.noDreamsText}>Aucun rêve enregistré.</Text>
            )}
            {selectedDream && <DreamForm selectedDream={selectedDream} onFormSubmit={handleFormSubmit} />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6A5ACD',
    },
    dreamContainer: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#D1C4E9',
        borderRadius: 10,
        backgroundColor: '#FCFCFC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    dreamText: {
        fontSize: 16,
        color: '#4A4A4A',
        lineHeight: 24,
    },
    hashtagsText: {
        fontSize: 14,
        color: '#FCFCFC',
        fontStyle: 'italic',
        marginTop: 5,
    },
    deleteButton: {
        marginTop: 10,
        borderRadius: 8,
    },
    editButton: {
        marginTop: 10,
        borderRadius: 8,
        borderColor: '#6A5ACD',
    },
    deleteAllButton: {
        marginVertical: 15,
        alignSelf: 'center',
        borderRadius: 8,
    },
    noDreamsText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FCFCFC',
        marginTop: 20,
    },
});