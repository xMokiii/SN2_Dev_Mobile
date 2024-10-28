import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TextInput, Button, Chip, Menu, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DreamForm({ selectedDream, onFormSubmit }) {
    const [dreamText, setDreamText] = useState('');
    const [dreamText2, setDreamText2] = useState('');
    const [dreamType, setDreamType] = useState('Non Lucide');
    const [tonaliteType, setTonaliteType] = useState('Tonalité');
    const [intensite_emotion, setIntensite_emotion] = useState('Intensité');
    const [qualite_sommeil, setQualite_sommeil] = useState('Qualité');
    const [clarte, setClarte] = useState('Clarté');
    const [showDropDown, setShowDropDown] = useState(false);
    const [showDropDown2, setShowDropDown2] = useState(false); 
    const [showDropDown3, setShowDropDown3] = useState(false);
    const [showDropDown4, setShowDropDown4] = useState(false);
    const [showDropDown5, setShowDropDown5] = useState(false);
    const [hashtags, setHashtags] = useState([]);
    const [newHashtag, setNewHashtag] = useState('');
    const [hashtags2, setHashtags2] = useState([]);
    const [newHashtag2, setNewHashtag2] = useState('');
    const [hashtags3, setHashtags3] = useState([]);
    const [newHashtag3, setNewHashtag3] = useState('');
    const [hashtags4, setHashtags4] = useState([]);
    const [newHashtag4, setNewHashtag4] = useState('');
    const isEditing = !!selectedDream;

    useEffect(() => {
        if (selectedDream) {
            setDreamText(selectedDream.dreamText);
            setDreamText2(selectedDream.dreamText2);
            setDreamType(selectedDream.dreamType || 'Non Lucide');
            setTonaliteType(selectedDream.tonaliteType || 'Tonalité');
            setIntensite_emotion(selectedDream.intensite_emotion || 'Intensité');
            setQualite_sommeil(selectedDream.qualite_sommeil || 'Qualité');
            setClarte(selectedDream.clarte || 'Clarté');
            setHashtags(selectedDream.hashtags || []);
            setHashtags2(selectedDream.hashtags2 || []);
            setHashtags3(selectedDream.hashtags3 || []);
            setHashtags4(selectedDream.hashtags4 || []);
        }
    }, [selectedDream]);

    const handleDreamSubmission = async () => {
        try {
            const existingData = await AsyncStorage.getItem('dreamFormDataArray');
            const formDataArray = existingData ? JSON.parse(existingData) : [];

            const newDream = {
                dreamText,
                dreamText2,
                dreamType,
                tonaliteType,
                intensite_emotion,
                qualite_sommeil,
                clarte,
                hashtags : [...hashtags, ...hashtags2, ...hashtags3, ...hashtags4],
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
        setDreamText2('');
        setDreamType('Non Lucide');
        setTonaliteType('Tonalité');
        setIntensite_emotion('Intensité');
        setQualite_sommeil('Qualité');
        setClarte('Clarté');
        setHashtags([]);
        setNewHashtag('');
        setHashtags2([]);
        setNewHashtag2('');
        setHashtags3([]);
        setNewHashtag3('');
        setHashtags4([]);
        setNewHashtag4('');
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

    const addHashtag2 = () => {
        if (newHashtag2.trim() !== '' && !hashtags2.includes(newHashtag2.trim())) {
            setHashtags2([...hashtags2, newHashtag2.trim()]);
            setNewHashtag2('');
        }
    };

    const removeHashtag2 = (hashtag2ToRemove) => {
        setHashtags2(hashtags2.filter((hashtag2) => hashtag2 !== hashtag2ToRemove));
    };

    const addHashtag3 = () => {
        if (newHashtag3.trim() !== '' && !hashtags3.includes(newHashtag3.trim())) {
            setHashtags3([...hashtags3, newHashtag3.trim()]);
            setNewHashtag3('');
        }
    };

    const removeHashtag3 = (hashtag3ToRemove) => {
        setHashtags3(hashtags3.filter((hashtag3) => hashtag3 !== hashtag3ToRemove));
    };

    const addHashtag4 = () => {
        if (newHashtag4.trim() !== '' && !hashtags4.includes(newHashtag4.trim())) {
            setHashtags4([...hashtags4, newHashtag4.trim()]);
            setNewHashtag4('');
        }
    };

    const removeHashtag4 = (hashtag4ToRemove) => {
        setHashtags4(hashtags4.filter((hashtag4) => hashtag4 !== hashtag4ToRemove));
    };

    const submitDream = () => {
        const newDream = {
            hashtags: [...hashtags, ...hashtags2, ...hashtags3, ...hashtags4],
        };
        onSubmit(newDream);
        setHashtags([]);
        setHashtags2([]);
        setHashtags3([]);
        setHashtags4([]);
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
                <Text style={styles.title}>Etat émotionnel avant et après le rêve</Text>
                <TextInput
                    label="Etat émotionnel"
                    value={dreamText2}
                    onChangeText={setDreamText2}
                    mode="outlined"
                    multiline
                    numberOfLines={6}
                    style={styles.input}
                />
                <Menu
                    visible={showDropDown}
                    onDismiss={() => setShowDropDown(false)}
                    anchor={
                        <Button icon="menu-down" onPress={() => setShowDropDown(true)} style={styles.menuButton}>
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
                <Menu
                    visible={showDropDown3}
                    onDismiss={() => setShowDropDown3(false)}
                    anchor={
                        <Button icon="menu-down" onPress={() => setShowDropDown3(true)} style={styles.menuButton}>
                            {intensite_emotion}
                        </Button>
                    }
                >
                    <Menu.Item onPress={() => { setIntensite_emotion('Forte'); setShowDropDown3(false); }} title="Forte" />
                    <Menu.Item onPress={() => { setIntensite_emotion('Neutre'); setShowDropDown3(false); }} title="Neutre" />
                    <Menu.Item onPress={() => { setIntensite_emotion('Faible'); setShowDropDown3(false); }} title="Faible" />
                </Menu>
                <Menu
                    visible={showDropDown4}
                    onDismiss={() => setShowDropDown4(false)}
                    anchor={
                        <Button icon="menu-down" onPress={() => setShowDropDown4(true)} style={styles.menuButton}>
                            {qualite_sommeil}
                        </Button>
                    }
                >
                    <Menu.Item onPress={() => { setQualite_sommeil('Positive'); setShowDropDown4(false); }} title="Positive" />
                    <Menu.Item onPress={() => { setQualite_sommeil('Neutre'); setShowDropDown4(false); }} title="Neutre" />
                    <Menu.Item onPress={() => { setQualite_sommeil('Négative'); setShowDropDown4(false); }} title="Négative" />
                </Menu>
                <Menu
                    visible={showDropDown5}
                    onDismiss={() => setShowDropDown5(false)}
                    anchor={
                        <Button icon="menu-down" onPress={() => setShowDropDown5(true)} style={styles.menuButton}>
                            {clarte}
                        </Button>
                    }
                >
                    <Menu.Item onPress={() => { setClarte('Positive'); setShowDropDown5(false); }} title="Positive" />
                    <Menu.Item onPress={() => { setClarte('Neutre'); setShowDropDown5(false); }} title="Neutre" />
                    <Menu.Item onPress={() => { setClarte('Négative'); setShowDropDown5(false); }} title="Négative" />
                </Menu>
                <TextInput
                    label="Ajouter un hashtag"
                    value={newHashtag}
                    onChangeText={setNewHashtag}
                    onSubmitEditing={addHashtag}
                    mode="outlined"
                    style={styles.input}
                />
                <View style={styles.chipContainer}>
                    {hashtags.map((hashtag, index) => (
                        <Chip key={index} onClose={() => removeHashtag(hashtag)} style={styles.chip}>
                            {hashtag}
                        </Chip>
                    ))}
                </View>
                <TextInput
                    label="Ajouter une personne associée"
                    value={newHashtag2}
                    onChangeText={setNewHashtag2}
                    onSubmitEditing={addHashtag2}
                    mode="outlined"
                    style={styles.input}
                />
                <View style={styles.chipContainer}>
                    {hashtags2.map((hashtag2, index) => (
                        <Chip key={index} onClose={() => removeHashtag2(hashtag2)} style={styles.chip}>
                            {hashtag2}
                        </Chip>
                    ))}
                </View>
                <TextInput
                    label="Ajouter un lieu associé"
                    value={newHashtag3}
                    onChangeText={setNewHashtag3}
                    onSubmitEditing={addHashtag3}
                    mode="outlined"
                    style={styles.input}
                />
                <View style={styles.chipContainer}>
                    {hashtags3.map((hashtag3, index) => (
                        <Chip key={index} onClose={() => removeHashtag3(hashtag3)} style={styles.chip}>
                            {hashtag3}
                        </Chip>
                    ))}
                </View>
                <TextInput
                    label="Ajouter un signification personnel du rêve"
                    value={newHashtag4}
                    onChangeText={setNewHashtag4}
                    onSubmitEditing={addHashtag4}
                    mode="outlined"
                    style={styles.input}
                />
                <View style={styles.chipContainer}>
                    {hashtags4.map((hashtag4, index) => (
                        <Chip key={index} onClose={() => removeHashtag4(hashtag4)} style={styles.chip}>
                            {hashtag4}
                        </Chip>
                    ))}
                </View>
                <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
                    {isEditing ? 'Modifier' : 'Enregistrer'}
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        marginBottom: 12,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 8,
    },
    chip: {
        margin: 4,
    },
    menuButton: {
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
    },
});
