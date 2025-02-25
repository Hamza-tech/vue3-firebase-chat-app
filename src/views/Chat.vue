<template>
  <div class="flex h-screen">
    <div class="w-1/4 bg-gray-100 p-4 border-r">
      <h2 class="text-lg font-semibold mb-4">Active Users</h2>
      <ul>
        <li v-for="user in users" :key="user.uid" @click="selectUser(user)"
          class="p-3 cursor-pointer rounded-md flex items-center transition-all duration-300"
          :class="selectedUser?.uid === user.uid ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-200'">
          <span class="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full mr-3">
            {{ user.name.charAt(0).toUpperCase() }}
          </span>
          {{ user.name }}
        </li>
      </ul>
    </div>

    <div class="flex flex-col flex-1">
      <div v-if="selectedUser" class="bg-gray-200 p-4 font-semibold border-b text-lg">
        Chat with {{ selectedUser?.name }}
      </div>
      <div v-else class="bg-gray-200 p-4 font-semibold border-b text-lg">Select a user to chat</div>

      <div class="flex-1 p-4 overflow-y-auto bg-white">
        <div v-for="msg in messages" :key="msg.id" class="mb-3 flex items-start" 
             :class="msg.senderId === store.user.uid ? 'flex-row' : 'flex-row-reverse'">
          <span class="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-3">
            {{ msg.senderName.charAt(0).toUpperCase() }}
          </span>
          <div>
            <span class="text-xs font-semibold block" :class="msg.senderId === store.user.uid ? 'text-blue-500 text-right' : 'text-green-500 text-left'">
              {{ msg.senderName }}
            </span>
            <div class="inline-block p-3 mt-1 rounded-lg text-white shadow-md" 
                 :class="msg.senderId === store.user.uid ? 'bg-blue-500 rounded-bl-none' : 'bg-gray-500 rounded-tr-none'">
              {{ msg.text }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedUser" class="p-4 border-t bg-gray-100 flex items-center">
        <input v-model="newMessage" type="text" placeholder="Type a message..."
               class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
               @keyup.enter="sendMessage" />
        <button @click="sendMessage" 
                class="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md">
          Send
        </button>
      </div>
    </div>
  </div>
</template>



<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import { useAppStore } from "@/stores/store";
import { getLoggedInUsers } from "@/firebase/usersService";
import { sendMessage, listenForMessages } from "@/firebase/messagesService";


export default defineComponent({
  setup() {
    const store = useAppStore();
    const users = ref([]);
    const selectedUser = ref(null);
    const messages = ref([]);
    const newMessage = ref("");

    onMounted(() => {
      getLoggedInUsers((fetchedUsers) => {
        users.value = fetchedUsers;
      });
    });

    const selectUser = (user) => {
      selectedUser.value = user;
    };

    watch(selectedUser, (newUser, oldUser, onCleanup) => {
    if (!newUser) return;

    const unsubscribe = listenForMessages(store.user.uid, newUser.uid, (msgs) => {
        messages.value = msgs;
    });
    
    onCleanup(() => unsubscribe());
});


    const handleSendMessage = async () => {
      if (!newMessage.value.trim()) return;

      const currentUser = store.user;
      if (!currentUser) {
        console.error("Error: Logged-in user not found!");
        return;
      }

      if (!selectedUser.value?.uid) {
        console.error("Error: No recipient selected!");
        return;
      }

      try {
        await sendMessage(
          currentUser.uid,
          currentUser.email,
          selectedUser.value.uid,
          newMessage.value
        );
        newMessage.value = "";
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };

    return {
      store,
      users,
      selectedUser,
      messages,
      newMessage,
      selectUser,
      sendMessage: handleSendMessage,
    };
  },
});
</script>
<!-- 
<style>
.chat-container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.users-list {
  width: 25%;
  background: #f1f1f1;
  padding: 15px;
  border-right: 1px solid #ccc;
}

.users-list ul {
  list-style: none;
  padding: 0;
}

.users-list li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.users-list li:hover {
  background: #ddd;
}

.chat-box {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background: #ddd;
  padding: 15px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #fff;
}

.message {
  background: grey;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 12px;
  color: white;
}
.mine-message {
  display: flex;
  justify-content: left;
  border-bottom-left-radius: 0px;
  /* width: fit-content; */
}
.his-message {
  /* width: fit-content; */
  display: flex;
  justify-content: right;
  border-top-right-radius: 0px;
}

.my-message {
  color: blue;
  font-weight: bold;
}

.their-message {
  color: green;
  font-weight: bold;
}

.message-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background: #f9f9f9;
}

.message-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.message-input button {
  margin-left: 10px;
  padding: 8px 15px;
  background: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.message-input button:hover {
  background: darkblue;
}
</style> -->