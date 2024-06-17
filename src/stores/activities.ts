import { defineStore, storeToRefs } from 'pinia'
import { ref, Ref } from 'vue'
import UserActivitiesDB from '@/plugins/firebase/user-activities-db'
import { useAuthenticationStore } from '@/stores/authentication'
import { Activity } from '@/interfaces/activities.interface'

export const useActivitiesStore = defineStore('activities', () => {
  const activities: Ref<Activity[]> = ref([])
  // action
  /**
   * Fetch user activity
   * @return Array
   */
  async function fetchUserActivity() {
    if (activities.value.length) return
    const { user } = storeToRefs(useAuthenticationStore())
    if (user.value) {
      const userActivitiesDb = new UserActivitiesDB(user.value?.id)
      activities.value = await userActivitiesDb.readAll(null, 'createTimestamp', 'desc', 20)
    }
  }
  /**
   * Add a new workout for the user
   * @param workout
   * @return {Promise<void>}
   */
  async function createUserActivity(activity: Activity) {
    const { user } = storeToRefs(useAuthenticationStore())
    if (user.value) {
      const userActivitiesDb = new UserActivitiesDB(user.value.id)

      const createdActivity = await userActivitiesDb.create(activity)

      // push to beginning of  workouts
      activities.value.unshift(createdActivity)
    }
  }

  return {
    activities,
    createUserActivity,
    fetchUserActivity
  }
})