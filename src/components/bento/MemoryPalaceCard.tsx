/**
 * 🏰 MEMORY PALACE CARD
 *
 * Visual spatial memory system interface
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from '../native-compat';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { useMemoryPalaceStore } from '../../store/slices/memoryPalaceSlice';
import { Room, MemoryItem } from '../../../types/memoryPalace';

interface MemoryPalaceCardProps {
  deviceType?: string;
}

export const MemoryPalaceCard: React.FC<MemoryPalaceCardProps> = ({ deviceType = 'desktop' }) => {
  const {
    currentPalace,
    addRoom,
    addItem,
    updateItem,
    createPalace,
  } = useMemoryPalaceStore();

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newItemContent, setNewItemContent] = useState('');

  // Initialize palace if none exists
  React.useEffect(() => {
    if (!currentPalace) {
      createPalace({
        userId: 'demo-user',
        name: 'My First Palace',
        emoji: '🏰',
        structure: {
          rooms: [],
          paths: [],
        },
        metadata: {
          totalItems: 0,
          lastVisited: new Date(),
          retentionScore: 100,
        },
      });
    }
  }, [currentPalace, createPalace]);

  const handleCreateRoom = () => {
    if (!currentPalace || !newRoomName.trim()) return;

    const roomEmojis = ['📚', '🎨', '💻', '🎮', '🎵', '🏋️', '🍳', '🌱'];
    const randomEmoji = roomEmojis[Math.floor(Math.random() * roomEmojis.length)];

    addRoom(currentPalace.id, {
      name: newRoomName,
      emoji: randomEmoji,
      position: {
        x: Math.random() * 300,
        y: Math.random() * 300,
      },
      items: [],
      color: '#7C3AED',
    });

    setNewRoomName('');
    setIsCreatingRoom(false);
  };

  const handleCreateItem = () => {
    if (!currentPalace || !selectedRoom || !newItemContent.trim()) return;

    addItem(currentPalace.id, selectedRoom.id, {
      content: newItemContent,
      type: 'text',
      position: {
        x: Math.random() * 200,
        y: Math.random() * 200,
      },
      associations: [],
      color: '#00D4E7',
      emoji: '📝',
    });

    setNewItemContent('');
    setIsCreatingItem(false);
  };

  const rooms = currentPalace?.structure.rooms || [];
  const totalItems = currentPalace?.metadata.totalItems || 0;

  return (
    <Card>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text size="3xl">🏰</Text>
            <View>
              <Text variant="heading" size="lg" weight="bold">
                Memory Palace
              </Text>
              <Text size="sm" style={styles.subtitle}>
                {rooms.length} rooms · {totalItems} items
              </Text>
            </View>
          </View>
          <View style={styles.badge}>
            <Text size="xs" weight="semibold">
              {currentPalace?.metadata.retentionScore || 0}%
            </Text>
          </View>
        </View>

        {/* Rooms Grid */}
        <ScrollView style={styles.roomsContainer}>
          <View style={styles.roomsGrid}>
            {rooms.map((room: Room) => (
              <TouchableOpacity
                key={room.id}
                style={[
                  styles.roomCard,
                  selectedRoom?.id === room.id && styles.roomCardSelected,
                ]}
                onPress={() => setSelectedRoom(room)}
              >
                <Text size="3xl">{room.emoji}</Text>
                <Text size="sm" weight="semibold">
                  {room.name}
                </Text>
                <Text size="xs" style={styles.itemCount}>
                  {room.items.length} items
                </Text>
              </TouchableOpacity>
            ))}

            {/* Add Room Button */}
            {!isCreatingRoom && (
              <TouchableOpacity
                style={styles.addRoomButton}
                onPress={() => setIsCreatingRoom(true)}
              >
                <Text size="3xl">➕</Text>
                <Text size="sm" weight="semibold">
                  Add Room
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Create Room Form */}
          {isCreatingRoom && (
            <View style={styles.createForm}>
              <TextInput
                style={styles.input}
                placeholder="Room name..."
               
                value={newRoomName}
                onChangeText={setNewRoomName}
                autoFocus
              />
              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsCreatingRoom(false);
                    setNewRoomName('');
                  }}
                >
                  <Text size="sm">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={handleCreateRoom}
                >
                  <Text size="sm" weight="semibold">
                    Create
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Selected Room Items */}
          {selectedRoom && (
            <View style={styles.itemsSection}>
              <Text variant="heading" size="base" weight="bold" style={styles.sectionTitle}>
                {selectedRoom.emoji} {selectedRoom.name}
              </Text>

              {selectedRoom.items.map((item: MemoryItem) => (
                <View key={item.id} style={styles.itemCard}>
                  <Text size="lg">{item.emoji}</Text>
                  <Text size="sm" style={styles.itemContent}>
                    {item.content}
                  </Text>
                </View>
              ))}

              {/* Add Item Form */}
              {!isCreatingItem && (
                <TouchableOpacity
                  style={styles.addItemButton}
                  onPress={() => setIsCreatingItem(true)}
                >
                  <Text size="sm">➕ Add Item</Text>
                </TouchableOpacity>
              )}

              {isCreatingItem && (
                <View style={styles.createForm}>
                  <TextInput
                    style={styles.input}
                    placeholder="Memory item..."
                   
                    value={newItemContent}
                    onChangeText={setNewItemContent}
                    autoFocus
                    multiline
                  />
                  <View style={styles.formButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        setIsCreatingItem(false);
                        setNewItemContent('');
                      }}
                    >
                      <Text size="sm">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.createButton}
                      onPress={handleCreateItem}
                    >
                      <Text size="sm" weight="semibold">
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  subtitle: {
    color: 'var(--color-text-secondary)',
  },
  badge: {
    backgroundColor: 'var(--green-primary)',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 8,
  },
  roomsContainer: {
    flex: 1,
  },
  roomsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 8,
    marginBottom: 16,
  },
  roomCard: {
    width: 90,
    padding: 8,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'var(--color-text-secondary)',
    alignItems: 'center' as const,
    gap: 4,
  },
  roomCardSelected: {
    borderColor: 'var(--purple-primary)',
    backgroundColor: 'var(--purple-light)',
  },
  itemCount: {
    color: 'var(--color-text-secondary)',
  },
  addRoomButton: {
    width: 90,
    padding: 8,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'var(--color-text-secondary)',
    borderStyle: 'dashed' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  itemsSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  itemCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    padding: 8,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 4,
    marginBottom: 8,
  },
  itemContent: {
    flex: 1,
  },
  addItemButton: {
    padding: 8,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'var(--color-text-secondary)',
    borderStyle: 'dashed' as const,
    alignItems: 'center' as const,
  },
  createForm: {
    padding: 16,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'var(--color-background)',
    borderWidth: 1,
    borderColor: 'var(--color-text-secondary)',
    borderRadius: 4,
    padding: 8,
    color: 'var(--color-text)',
    fontSize: 14,
    marginBottom: 8,
  },
  formButtons: {
    flexDirection: 'row' as const,
    gap: 8,
    justifyContent: 'flex-end' as const,
  },
  cancelButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 4,
  },
  createButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'var(--purple-primary)',
    borderRadius: 4,
  },
});
