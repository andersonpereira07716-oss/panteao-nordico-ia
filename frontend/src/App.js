import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#090d16" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Panteão Nórdico IA</Text>
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop' }} 
            style={styles.logo}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.subtitle}>Reino dos Deuses e Oráculos</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bem-vindo, Viajante</Text>
          <Text style={styles.cardText}>
            Aceda à sabedoria ancestral de Odin, Thor e Freya. O seu portal para a mitologia nórdica está pronto.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#38bdf8',
    marginBottom: 20,
    backgroundColor: '#1e293b',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 25,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#111827',
    padding: 22,
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardTitle: {
    color: '#38bdf8',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardText: {
    color: '#d1d5db',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
