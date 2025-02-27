<template>
  <div class="flex h-screen">
    <div class="w-1/4 bg-gray-100 p-4 border-r">
      <h2 class="text-lg font-semibold mb-4">Active Users</h2>
      <ul>
        <li @click="selectGeneralChat"
          class="p-3 cursor-pointer rounded-md flex items-center transition-all duration-300"
          :class="isGeneralChat ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-200'">
          <span class="w-8 h-8 flex items-center justify-center bg-gray-500 text-white rounded-full mr-3">G</span>
          General Chat Room
        </li>
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
      <div v-if="isGeneralChat" class="bg-gray-200 p-4 font-semibold border-b text-lg">
        General Chat Room
      </div>
      <div v-else-if="selectedUser" class="bg-gray-200 p-4 font-semibold border-b text-lg">
        Chat with {{ selectedUser?.name }}
      </div>
      <div v-else class="bg-gray-200 p-4 font-semibold border-b text-lg">Select a user to chat</div>


      <div class="flex-1 p-4 overflow-y-auto bg-white">
        <div v-for="msg in messages" :key="msg.id" class="mb-3 flex items-start"
          :class="msg.uid === store.user.uid ? 'justify-start' : 'justify-end'">
          <span class="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-3"
            v-if="msg.senderId !== store.user.uid">
            {{ msg.email.charAt(0).toUpperCase() }}
          </span>
          <div>
            <span class="text-xs font-semibold block text-right"
              :class="msg.senderId === store.user.uid ? 'text-blue-500' : 'text-green-500'">
              {{ msg.email }}
            </span>
            <div class="inline-block p-3 mt-1 rounded-lg text-white shadow-md max-w-xs"
              :class="msg.senderId === store.user.uid ? 'bg-blue-500 rounded-bl-none text-left' : 'bg-gray-500 rounded-tr-none text-right'">
              {{ msg.message }}
            </div>
          </div>
          <span class="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full ml-3"
            v-if="msg.senderId === store.user.uid">
            {{ msg.email.charAt(0).toUpperCase() }}
          </span>
        </div>
      </div>

      <div v-if="selectedUser || isGeneralChat" class="p-4 border-t bg-gray-100 flex items-center">
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
import { sendMessage, listenForMessages, sendGeneralMessage, listenGeneralMessage } from "@/firebase/messagesService";

export default defineComponent({
  setup() {
    const store = useAppStore();
    const users = ref([]);
    const selectedUser = ref(null);
    const messages = ref([]);
    const newMessage = ref("");
    const isGeneralChat = ref(false);

    onMounted(() => {
      getLoggedInUsers((fetchedUsers) => {
        users.value = fetchedUsers;
      });
    });

    const selectUser = (user) => {
      selectedUser.value = user;
      isGeneralChat.value = false;
      messages.value = [];

      const unsubscribe = listenForMessages(store.user.uid, user.uid, (msgs) => {
        messages.value = msgs;
      });

      watch(selectedUser, (newUser, oldUser, onCleanup) => {
        if (!newUser) return;
        onCleanup(() => unsubscribe());
      });
    };

    const selectGeneralChat = () => {
      selectedUser.value = null;
      isGeneralChat.value = true;
      messages.value = [];

      const unsubscribe = listenGeneralMessage((msgs) => {
        messages.value = msgs;
      });

      watch(isGeneralChat, (newVal, oldVal, onCleanup) => {
        if (!newVal) return;
        onCleanup(() => unsubscribe());
      });
    };

    const handleSendMessage = async () => {
      if (!newMessage.value.trim()) return;
      const currentUser = store.user;

      if (!currentUser) {
        console.error("Error: Logged-in user not found!");
        return;
      }

      try {
        if (isGeneralChat.value) {
          await sendGeneralMessage({ uid: currentUser.uid, email: currentUser.email }, newMessage.value);
        } else if (selectedUser.value?.uid) {
          await sendMessage(currentUser.uid, currentUser.email, selectedUser.value.uid, newMessage.value);
        }
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
      isGeneralChat,
      selectUser,
      selectGeneralChat,
      sendMessage: handleSendMessage,
    };
  },
});
</script>
