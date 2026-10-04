import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const chats = [
  {
    id: "1",
    name: "Ananya",
    message: "Hello ❤️",
    time: "10:42",
    online: true,
  },
  {
    id: "2",
    name: "Nexora Group",
    message: "Welcome to Nexora 👋",
    time: "09:18",
    online: false,
  },
];

export default function App() {
  const [tab, setTab] = useState("Chats");
  const [selectedChat, setSelectedChat] = useState<any>(null);

  if (selectedChat) {
    return (
      <ChatScreen
        chat={selectedChat}
        goBack={() => setSelectedChat(null)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Nexora</Text>

        <View style={styles.headerIcons}>
          <Ionicons name="search" size={24} color="#fff" />
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Chats", "Status", "Calls"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.tab,
              tab === item && styles.activeTab,
            ]}
            onPress={() => setTab(item)}
          >
            <Text style={styles.tabText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chats */}
      {tab === "Chats" && (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatRow}
              onPress={() => setSelectedChat(item)}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name.charAt(0)}
                </Text>
              </View>

              <View style={styles.chatInfo}>
                <View style={styles.chatTop}>
                  <Text style={styles.chatName}>
                    {item.name}
                  </Text>

                  <Text style={styles.time}>
                    {item.time}
                  </Text>
                </View>

                <Text style={styles.lastMessage}>
                  {item.message}
                </Text>

                {item.online && (
                  <Text style={styles.online}>
                    ● Online
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Status */}
      {tab === "Status" && (
        <View style={styles.center}>
          <Text style={styles.emoji}>📸</Text>

          <Text style={styles.title}>
            Nexora Status
          </Text>

          <Text style={styles.description}>
            Photo और video status यहाँ दिखाई देंगे।
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Alert.alert(
                "Status Download",
                "Status Download feature यहाँ से आगे connect किया जाएगा।"
              )
            }
          >
            <Ionicons
              name="download"
              size={20}
              color="#fff"
            />

            <Text style={styles.buttonText}>
              Status Download
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Calls */}
      {tab === "Calls" && (
        <View style={styles.center}>
          <Text style={styles.emoji}>📞</Text>

          <Text style={styles.title}>
            Nexora Calls
          </Text>

          <Text style={styles.description}>
            Voice और video calling यहाँ जोड़ी जाएगी।
          </Text>
        </View>
      )}

      {/* New Chat Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          Alert.alert(
            "New Chat",
            "Nexora contact system जल्द connect किया जाएगा।"
          )
        }
      >
        <Ionicons
          name="chatbubble"
          size={25}
          color="#fff"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* Chat Screen */

function ChatScreen({
  chat,
  goBack,
}: {
  chat: any;
  goBack: () => void;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    "Welcome to Nexora 👋",
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, message.trim()]);
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons
            name="arrow-back"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.smallAvatar}>
          <Text style={styles.avatarText}>
            {chat.name.charAt(0)}
          </Text>
        </View>

        <View>
          <Text style={styles.chatHeaderName}>
            {chat.name}
          </Text>

          <Text style={styles.online}>
            ● Online
          </Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        style={styles.messages}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>
              {item}
            </Text>
          </View>
        )}
      />

      {/* Message Box */}
      <View style={styles.messageBox}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Message"
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Ionicons
            name="send"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* Styles */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
  },

  header: {
    height: 65,
    backgroundColor: "#111827",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 20,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#111827",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },

  activeTab: {
    borderBottomColor: "#38bdf8",
  },

  tabText: {
    color: "#fff",
    fontWeight: "700",
  },

  chatRow: {
    flexDirection: "row",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  smallAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },

  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  chatInfo: {
    flex: 1,
  },

  chatTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  chatName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  time: {
    color: "#9ca3af",
  },

  lastMessage: {
    color: "#9ca3af",
    marginTop: 5,
  },

  online: {
    color: "#4ade80",
    fontSize: 12,
    marginTop: 3,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },

  emoji: {
    fontSize: 60,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 10,
  },

  description: {
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 8,
  },

  button: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 25,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  chatHeader: {
    height: 65,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  chatHeaderName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  messages: {
    padding: 14,
  },

  messageBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#2563eb",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 8,
    maxWidth: "80%",
  },

  messageText: {
    color: "#fff",
    fontSize: 16,
  },

  messageBox: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#111827",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "#1f2937",
    color: "#fff",
    borderRadius: 22,
    paddingHorizontal: 17,
    paddingVertical: 10,
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
