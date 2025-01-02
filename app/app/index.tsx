import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Import useRouter from expo-router
import { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter(); // useRouter hook to handle navigation
  
  const [activeEmergency, setActiveEmergency] = useState(null);

  // Emergency service options with their details
  const emergencyServices = [
    { id: 1, title: 'Medical', icon: '🏥', color: '#FF6B6B' },
    { id: 2, title: 'Fire', icon: '🚒', color: '#FF9F43' },
    { id: 3, title: 'Police', icon: '🚔', color: '#54A0FF' },
    { id: 4, title: 'Disaster', icon: '⚡', color: '#5F27CD' },
  ];

  useEffect(() => {
    // Initial fade-in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();

    // Continuous pulse animation for SOS button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <Animated.View 
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Back Button */}
      

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Emergency</Text>
          <Text style={styles.subHeaderText}>Quick Response System</Text>
        </View>

        {/* Animated SOS Button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity style={styles.sosButton}>
            <LinearGradient
              colors={['#FF416C', '#FF4B2B']}
              style={styles.sosGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.sosButtonText}>SOS</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          {emergencyServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                { backgroundColor: service.color + '15' }, // Adding transparency
                activeEmergency === service.id && styles.activeCard,
              ]}
              onPress={() => setActiveEmergency(service.id)}
            >
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <Text style={[styles.serviceTitle, { color: service.color }]}>
                {service.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {['Contacts', 'First Aid', 'Facilities'].map((action, index) => (
            <Link 
              key={action} 
              href={`/${action.toLowerCase()}`}
              style={[styles.actionButton, { backgroundColor: '#ffffff10' }]}
            >
              <Text style={styles.actionButtonText}>{action}</Text>
            </Link>
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 60,
  },
  headerText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#ffffff80',
    marginTop: 8,
  },
  sosButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 40,
    elevation: 10,
    shadowColor: '#FF416C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  sosGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  serviceCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffffff10',
  },
  activeCard: {
    borderColor: '#ffffff40',
    transform: [{ scale: 0.98 }],
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  quickActions: {
    width: '100%',
    gap: 12,
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff15',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
