<template>
  <div class="h-full w-full">
    <h3 class="font-semibold text-lg mb-3">Recent Activities</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-left border">
        <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-4 py-2">Profile</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">No. of Products</th>
            <th class="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in activities"
            :key="index"
            class="border-t"
          >
            <td class="px-4 py-2">
              <img
                :src="entry.avatar"
                alt="Profile"
                class="w-8 h-8 rounded-full object-cover"
              />
            </td>
            <td class="px-4 py-2 font-medium">{{ entry.name }}</td>
            <td class="px-4 py-2">{{ entry.products }}</td>
            <td class="px-4 py-2 text-green-600">{{ entry.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const activities = [
  {
    name: 'George',
    avatar: 'https://i.pravatar.cc/40?img=3',
    products: 12,
    time: '9 mins ago'
  },
  {
    name: 'Paula',
    avatar: 'https://i.pravatar.cc/40?img=5',
    products: 7,
    time: '25 mins ago'
  },
  {
    name: 'Marcus',
    avatar: 'https://i.pravatar.cc/40?img=8',
    products: 18,
    time: '1 hour ago'
  },
  {
    name: 'Aisha',
    avatar: 'https://i.pravatar.cc/40?img=11',
    products: 4,
    time: '2 hours ago'
  }
]
</script>
