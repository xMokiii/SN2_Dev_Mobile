import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TextInput, Button, Chip, Menu, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DreamForm({ selectedDream, onFormSubmit }) {
    const [dreamText, setDreamText] = useState('');
    const [dreamType, setDreamType] = useState('Non Lucide'); // Initialisation de dreamType
    const [tonaliteType, setTonaliteType] = useState('Neutre'); // Initialisation de tonaliteType
    const [showDropDown, setShowDropDown] = useState(false);
    const [showDropDown2, setShowDropDown2] = useState(true); 
    const [hashtags, setHashtags] = useState([]);
    const [newHashtag, setNewHashtag] = useState('');
    const isEditing = !!selectedDream;

    useEffect(() => {
        if (selectedDream) {
            setDreamText(selectedDream.dreamText);
            setDreamType(selectedDream.dreamType || 'Non Lucide'); // Récupérer le type de rêve
            setTonaliteType(selectedDream.tonaliteType || 'Neutre'); // Récupérer la tonalité
            setHashtags(selectedDream.hashtags || []);
        }
    }, [selectedDream]);

    const handleDreamSubmission = async () => {
        try {
            const existingData = await AsyncStorage.getItem('dreamFormDataArray');
            const formDataArray = existingData ? JSON.parse(existingData) : [];

            const newDream = {
                dreamText,
                dreamType,
                tonaliteType, // Utilisation de tonaliteType
                hashtags,
                todayDate: new Date().toISOString(),
            };

            if (isEditing) {
                const index = selectedDream.index;
                formDataArray[index] = newDream;
            } else {
                formDataArray.push(newDream);
            }

            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
            resetForm();
            onFormSubmit();
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
    };

    const resetForm = () => {
        setDreamText('');
        setDreamType('Non Lucide'); // Réinitialiser également dreamType
        setTonaliteType('Neutre'); // Réinitialiser tonaliteType
        setHashtags([]);
        setNewHashtag('');
    };

    const addHashtag = () => {
        if (newHashtag.trim() !== '' && !hashtags.includes(newHashtag.trim())) {
            setHashtags([...hashtags, newHashtag.trim()]);
            setNewHashtag('');
        }
    };

    const removeHashtag = (hashtagToRemove) => {
        setHashtags(hashtags.filter((hashtag) => hashtag !== hashtagToRemove));
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Mon rêve du jour :</Text>
                <TextInput
                    label="Rêve"
                    value={dreamText}
                    onChangeText={setDreamText}
                    mode="outlined"
                    multiline
                    numberOfLines={6}
                    style={styles.input}
                />
                <Menu
                    visible={showDropDown}
                    onDismiss={() => setShowDropDown(false)}
                    anchor={
                        <Button icon="menu-down" onPress={() => setShowDropDown(true)} style={styles.menuButton} >
                            {dreamType}
                        </Button>
                    }
                >
                    <Menu.Item onPress={() => { setDreamType('Lucide'); setShowDropDown(false); }} title="Lucide" />
                    <Menu.Item onPress={() => { setDreamType('Non Lucide'); setShowDropDown(false); }} title="Non Lucide" />
                    <Menu.Item onPress={() => { setDreamType('Prémonitoire'); setShowDropDown(false); }} title="Prémonitoire" />
                    <Menu.Item onPress={() => { setDreamType('Cauchemar'); setShowDropDown(false); }} title="Cauchemar" />
                    <Menu.Item onPress={() => { setDreamType('Récurrents'); setShowDropDown(false); }} title="Récurrents" />
                </Menu>
                <Menu
                    visible={showDropDown2}
                    onDismiss={() => setShowDropDown2(false)}
                    anchor={
                        <Button icon="menu-down" onPress={() => setShowDropDown2(true)} style={styles.menuButton}>
                            {tonaliteType}
                        </Button>
                    }
                >
                    <Menu.Item onPress={() => { setTonaliteType('Positive'); setShowDropDown2(false); }} title="Positive" />
                    <Menu.Item onPress={() => { setTonaliteType('Neutre'); setShowDropDown2(false); }} title="Neutre" />
                    <Menu.Item onPress={() => { setTonaliteType('Négative'); setShowDropDown2(false); }} title="Négative" />
                </Menu>
                <TextInput
                    label="Ajouter un hashtag"
                    value={newHashtag}
                    onChangeText={setNewHashtag}
                    onSubmitEditing={addHashtag}
                    mode="outlined"
                    style={styles.input}
                />
                <View style={styles.hashtagsContainer}>
                    {hashtags.map((hashtag) => (
                        <Chip
                            key={hashtag}
                            onClose={() => removeHashtag(hashtag)}
                            style={styles.hashtagChip}
                        >
                            {hashtag}
                        </Chip>
                    ))}
                </View>
                <Button mode="contained" onPress={handleDreamSubmission} style={styles.submitButton}>
                    {isEditing ? 'Modifier le rêve' : 'Ajouter le rêve'}
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: width - 40,
        alignSelf: 'center',
        backgroundColor: '#FCFCFC',
        borderWidth: 1,
        borderColor: '#D1C4E9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6A5ACD',
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderColor: '#a984ff',
        borderRadius: 8,
    },
    menuButton: {
        marginBottom: 10,
        color: '#FFFFF' ,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#a984ff',

    },
    hashtagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        borderColor: '#D1C4E9',
    },
    hashtagChip: {
        backgroundColor: '#D1C4E9',
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 16,
    },
    submitButton: {
        marginTop: 20,
        borderRadius: 8,
    },
});