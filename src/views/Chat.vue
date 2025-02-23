<template>
  <div class="flex h-screen">

    <div class="w-1/4 bg-gray-100 p-4 border-r">
      <h2 class="text-lg font-semibold mb-4">Active Users</h2>
      <ul>
        <li v-for="user in users" :key="user.uid" @click="selectUser(user)"
          class="p-2 cursor-pointer hover:bg-gray-200 rounded">
          {{ user.name }}
        </li>
      </ul>
    </div>


    <div class="w-3/4 flex flex-col">
      <div v-if="selectedUser" class="p-4 bg-gray-200 font-bold border-b">
        Chat with {{ selectedUser.displayName }}
      </div>
      <div v-else class="p-4">Select a user to chat</div>


      <div class="flex-1 p-4 overflow-y-auto">
        <div v-for="msg in messages" :key="msg.id" class="mb-2">
          <span :class="msg.senderId === store.user.uid ? 'text-blue-500' : 'text-green-500'">
            {{ msg.senderName }}:
          </span>
          {{ msg.text }}
        </div>
      </div>


      <div v-if="selectedUser" class="p-4 border-t flex">
        <input v-model="newMessage" type="text" class="flex-1 border p-2 rounded" placeholder="Type a message..."
          @keyup.enter="sendMessage" />
        <button @click="sendMessage" class="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
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

export default defineComponent({
  setup() {
    const store = useAppStore();
    const users = ref([]);
    const selectedUser = ref(null);
    const messages = ref([]);
    const newMessage = ref("");
    console.log(store.user)

    onMounted(() => {
      getLoggedInUsers((fetchedUsers) => {
        users.value = fetchedUsers;
        console.log(users.value)
      });
    });

    const handleLogout = async () => {
      try {
        await logOut();
        store.clearUser();
        router.push("/signin");
      } catch (error) {
        console.error("Logout failed:", error.message);
      }
    };

    // Watch for selected user change & fetch messages
    // watch(selectedUser, async (user) => {
    //   if (user) {
    //     messages.value = await getMessages(store.user.uid, user.uid);
    //   }
    // });

    // Select user to chat
    // const selectUser = (user) => {
    //   selectedUser.value = user;
    // };

    // Send message
    // const sendMessage = async () => {
    //   if (!newMessage.value.trim()) return;
    //   await sendMessageToFirebase(store.user.uid, selectedUser.value.uid, newMessage.value);
    //   newMessage.value = "";
    // };

    return {
      store,
      users,
      selectedUser,
      messages,
    };
  },
});
</script>
