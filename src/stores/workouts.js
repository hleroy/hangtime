import { reactive } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useAuthentication } from '@/stores/authentication'
import { useUser } from '@/stores/user'
import i18n from '@/plugins/i18n'
import UsersWorkoutsDB from '@/plugins/firebase/users-workouts-db'
import UserWorkoutsDB from '@/plugins/firebase/user-workouts-db'
import UsersDB from '@/plugins/firebase/users-db'

export const useWorkouts = defineStore('workouts', {
  state: () => ({
    workouts: null,
    workoutsCommunity: null,
    leaderboards: []
  }),
  actions: {
    /**
     * Fetch user workouts
     * @return Array
     */
    async fetchUserWorkouts() {
      if (this.workouts?.length) return
      const { user } = storeToRefs(useAuthentication())
      const usersWorkoutsDb = new UsersWorkoutsDB(user.value.id)
      this.workouts = await usersWorkoutsDb.readAll(
        [['subscribers', 'array-contains', user.value.id]],
        null,
        100
      )
    },
    /**
     * Fetch community workouts
     * @return Array
     */
    async fetchCommunityWorkouts() {
      // if (this.workoutsCommunity?.length) return
      const authentication = useAuthentication()
      const user = useUser()
      const usersWorkoutsDb = new UsersWorkoutsDB(authentication.user.id)
      this.workoutsCommunity = await usersWorkoutsDb.readAll(
        [
          ['share', '==', true],
          ['company', '==', user.getUserHangboardCompany.id],
          ['hangboard', '==', user.getUserHangboard.id]
        ],
        null,
        100
      )
    },
    /**
     * Fetch leaderboard
     * @param rank
     * @return {Promise<void>}
     */
    async fetchLeaderboard(rank = 'completed.amount') {
      if (this.leaderboards.find((leaderboard) => leaderboard.rank === rank))
        return
      const usersDb = new UsersDB()
      const leaderboard = await usersDb.readAll([[rank, '>', 0]], rank, 15)
      this.leaderboards.push({ rank, leaderboard })
    },
    /**
     * Add a new workout for the user
     * @param workout
     * @return {Promise<void>}
     */
    async createUserWorkout(workout) {
      const { user } = storeToRefs(useAuthentication())
      const userWorkoutDb = new UserWorkoutsDB(user.value.id)

      const createdWorkout = await userWorkoutDb.create(workout)

      // push to beginning of  workouts
      this.workouts.unshift(createdWorkout)

      // also add the workout as a community workout
      if (createdWorkout.share === true) {
        this.workoutsCommunity.unshift(createdWorkout)
      }
    },
    /**
     * Update a users workout
     * @param payload
     * @return {Promise<void>}
     */
    async updateUserWorkout(payload) {
      const { user } = storeToRefs(useAuthentication())
      const userWorkoutsDb = new UserWorkoutsDB(user.value.id)
      await userWorkoutsDb.update(payload)
    },
    /**
     * Delete a user workout by ID
     * @param id
     * @return {Promise<void>}
     */
    async removeUserWorkoutById(id) {
      const { user } = storeToRefs(useAuthentication())
      const userWorkoutsDb = new UserWorkoutsDB(user.value.id)

      await userWorkoutsDb.delete(id)

      const index = this.workouts.findIndex((workout) => workout.id === id)

      this.workouts.splice(index, 1)
    }
  },
  getters: {
    /**
     * Get workout Id
     * @return Object
     */
    getWorkoutById: (state) => (id) => {
      // eslint-disable-next-line no-shadow
      let workout = state.workouts?.find((workout) => workout.id === id)
      if (!workout)
        // eslint-disable-next-line no-shadow
        workout = state.workoutsCommunity?.find((workout) => workout.id === id)
      if (id === 'new') {
        const authentication = useAuthentication()
        const user = useUser()
        workout = reactive({
          name: i18n.global.t('New workout'),
          description: '',
          level: 1,
          hangboard: user.getUserHangboard.id,
          company: user.getUserHangboardCompany.id,
          exercises: [],
          time: 0,
          share: false,
          video: '',
          subscribers: [authentication.user.id],
          user: {
            displayName: authentication.user.displayName,
            grade: authentication.user.settings.grade,
            id: authentication.user.id,
            photoURL: authentication.user.photoURL
          }
        })
      }
      return workout
    },
    /**
     * Get workouts for the currently selected hangboard
     */
    getWorkoutsBySelectedHangboard(state) {
      const user = useUser()
      if (state.workouts === null) return []
      const limit = 999
      const items =
        state.workouts.length > limit ? limit : state.workouts.length
      return state.workouts
        ?.filter(
          (workout) =>
            workout?.company === user.getUserHangboardCompany.id &&
            workout?.hangboard === user.getUserHangboard.id
        )
        ?.sort((a, b) => (a.updateTimestamp > b.updateTimestamp ? -1 : 1))
        ?.slice(0, items)
    },
    getWorkoutsByCommunity(state) {
      if (state.workoutsCommunity === null) return []
      const limit = 999
      const items =
        state.workoutsCommunity.length > limit
          ? limit
          : state.workoutsCommunity.length
      return state.workoutsCommunity
        ?.sort((a, b) => (a.updateTimestamp > b.updateTimestamp ? -1 : 1))
        ?.slice(0, items)
    },
    getLeaderboard: (state) => (rank) =>
      state.leaderboards.find((leaderboard) => leaderboard.rank === rank)
  }
})