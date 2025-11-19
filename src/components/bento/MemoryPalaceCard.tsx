/**
 * 🏰 MEMORY PALACE CARD
 *
 * Visual spatial memory system interface
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from '../native-compat';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';
import { useMemoryPalaceStore } from '../../store/slices/memoryPalaceSlice';
import { Room, MemoryItem } from '../../../types/memoryPalace';

interface MemoryPalaceCardProps {
  deviceType: DeviceType;
}

export const MemoryPalaceCard: React.FC<MemoryPalaceCardProps> = ({ deviceType }) => {
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
      color: Colors.purple.primary,
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
      color: Colors.cyan.primary,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  subtitle: {
    color: Colors.textSecondary,
  },
  badge: {
    backgroundColor: Colors.green.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.sm,
  },
  roomsContainer: {
    flex: 1,
  },
  roomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  roomCard: {
    width: 90,
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  roomCardSelected: {
    borderColor: Colors.purple.primary,
    backgroundColor: Colors.purple.light,
  },
  itemCount: {
    color: Colors.textSecondary,
  },
  addRoomButton: {
    width: 90,
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    borderStyle: 'dashed',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  itemsSection: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  itemContent: {
    flex: 1,
  },
  addItemButton: {
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  createForm: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.background.primary,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderRadius: Spacing.xs,
    padding: Spacing.sm,
    color: Colors.text.primary,
    fontSize: 14,
    marginBottom: Spacing.sm,
  },
  formButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.xs,
  },
  createButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.purple.primary,
    borderRadius: Spacing.xs,
  },
});
