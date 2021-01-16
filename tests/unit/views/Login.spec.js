import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import LoginView from '@/views/authentication/Login.vue'

const defaultStoreStructure = {
  modules: {
    app: {
      namespaced: true,
      state: {
        networkOnLine: true
      }
    },
    authentication: {
      namespaced: true,
      state: {
        user: undefined
      },
      mutations: {
        setUser: jest.fn()
      }
    }
  }
}

const localVue = createLocalVue()
localVue.use(Vuex)

// const $router = {
//   push: jest.fn()
// }

const $t = () => {}

describe('LoginView', () => {
  describe('when user is defined', () => {
    let storeStructure

    beforeEach(() => {
      storeStructure = cloneDeep(defaultStoreStructure)
      storeStructure.modules.authentication.state.user = 'Evan'
    })

    describe('and redirectUrl is defined', () => {
      it('should redirect to redirectUrl', () => {
        // const store = new Vuex.Store(storeStructure)
        // const redirectUrl = '/redirectUrl'
        // shallowMount(LoginView, {
        //   store,
        //   localVue,
        //   mocks: {
        //     $t,
        //     $route: {
        //       query: {
        //         redirectUrl
        //       }
        //     },
        //     $router
        //   }
        // })
        // expect($router.push).toHaveBeenCalledWith(redirectUrl)
      })
    })

    describe('but redirectUrl not defined', () => {
      it('should redirect to /workouts', () => {
        // const store = new Vuex.Store(storeStructure)
        // shallowMount(LoginView, {
        //   store,
        //   localVue,
        //   mocks: {
        //     $t,
        //     $route: {
        //       query: {}
        //     },
        //     $router
        //   }
        // })
        // expect($router.push).toHaveBeenCalledWith('/workouts')
      })
    })
  })

  describe('when user is null', () => {
    let storeStructure
    beforeEach(() => {
      storeStructure = cloneDeep(defaultStoreStructure)
      storeStructure.modules.authentication.state.user = null
    })

    it('should not display loader if user is null', () => {
      const store = new Vuex.Store(storeStructure)
      const wrapper = shallowMount(LoginView, {
        store,
        localVue,
        mocks: { $t }
      })
      const loader = wrapper.find('[data-test="loader"]')
      expect(loader.isVisible()).toBeFalsy()
    })

    it('should display login button', () => {
      const store = new Vuex.Store(storeStructure)
      const wrapper = shallowMount(LoginView, {
        store,
        localVue,
        mocks: { $t }
      })
      const loginButton = wrapper.find('[data-test="login-btn"]')
      expect(loginButton.isVisible()).toBeTruthy()
    })

    it('should not display offline message', () => {
      const store = new Vuex.Store(storeStructure)
      const wrapper = shallowMount(LoginView, {
        store,
        localVue,
        mocks: { $t }
      })
      const offlineInstruction = wrapper.find(
        '[data-test="offline-instruction"]'
      )
      expect(offlineInstruction.isVisible()).toBeFalsy()
    })

    describe('when app is offline', () => {
      beforeEach(() => {
        storeStructure.modules.app.state.networkOnLine = false
      })

      it('should not display login button if app is offline', () => {
        const store = new Vuex.Store(storeStructure)
        const wrapper = shallowMount(LoginView, {
          store,
          localVue,
          mocks: { $t }
        })
        const loginButton = wrapper.find('[data-test="login-btn"]')
        expect(loginButton.isVisible()).toBeFalsy()
      })

      it('should display offline message', () => {
        const store = new Vuex.Store(storeStructure)
        const wrapper = shallowMount(LoginView, {
          store,
          localVue,
          mocks: { $t }
        })
        const offlineInstruction = wrapper.find(
          '[data-test="offline-instruction"]'
        )
        expect(offlineInstruction.isVisible()).toBeTruthy()
      })
    })
  })

  describe('when user is undefined', () => {
    it('should display loader', () => {
      const store = new Vuex.Store(defaultStoreStructure)
      const wrapper = shallowMount(LoginView, {
        store,
        localVue,
        mocks: { $t }
      })
      const loader = wrapper.find('[data-test="loader"]')
      expect(loader.isVisible()).toBeTruthy()
    })

    it('should not display login button', () => {
      const store = new Vuex.Store(defaultStoreStructure)
      const wrapper = shallowMount(LoginView, {
        store,
        localVue,
        mocks: { $t }
      })
      const loginButton = wrapper.find('[data-test="login-btn"]')
      expect(loginButton.isVisible()).toBeFalsy()
    })

    it('should not display offline message', () => {
      const store = new Vuex.Store(defaultStoreStructure)
      const wrapper = shallowMount(LoginView, {
        store,
        localVue,
        mocks: { $t }
      })
      const offlineInstruction = wrapper.find(
        '[data-test="offline-instruction"]'
      )
      expect(offlineInstruction.isVisible()).toBeFalsy()
    })
  })
})
