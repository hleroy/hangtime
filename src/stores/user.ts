import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthentication } from '@/stores/authentication'
import hangboardBrands from '@/helpers/hangboards'
import { Company, Hangboard } from '@/interfaces/user.interface'

export const useUser = defineStore('user', () => {
  const { user } = useAuthentication()
  const userRef = ref(user)

  /**
   * Get a hangboard object by company & hangboard ID
   * @param companyId - The ID of the company
   * @param hangboardId - The ID of the hangboard
   * @return The hangboard object
   */
  const getHangboardByIds = (companyId: number, hangboardId: number): Hangboard | undefined => {
    const company = hangboardBrands.find((company: Company) => company.id === companyId)
    return company?.hangboards.find((hangboard: Hangboard) => hangboard.id === hangboardId)
  }

  /**
   * Get a company object by ID
   * @param companyId - The ID of the company
   * @return The company object
   */
  const getCompanyById = (companyId: number): Company | undefined => {
    return hangboardBrands.find((company: Company) => company.id === companyId)
  }

  /**
   * Get a hangboard name by company & hangboard ID
   * @param companyId - The ID of the company
   * @param hangboardId - The ID of the hangboard
   * @return The name of the hangboard
   */
  const getHangboardNameByIds = (companyId: number, hangboardId: number): string => {
    const company = getCompanyById(companyId)
    const hangboard = getHangboardByIds(companyId, hangboardId)
    return `${company?.name} - ${hangboard?.name}`
  }

  /**
   * Get all companies sorted by name
   * @return An array of companies sorted by name
   */
  const getCompanies = (): Company[] => {
    return [...hangboardBrands].sort((a: Company, b: Company) => a.name.localeCompare(b.name))
  }

  /**
   * Get all hangboards
   * @return An array of all hangboards
   */
  const getHangboards = (): Hangboard[] => {
    const allHangboards: Hangboard[] = []
    for (const brand of hangboardBrands) {
      if (brand.hangboards && Array.isArray(brand.hangboards)) {
        allHangboards.push(...brand.hangboards)
      }
    }
    return allHangboards
  }

  /**
   * Get a company by its URL key
   * @param url - The URL key of the company
   * @return The company object
   */
  const getCompanyByUrlKey = (url: string): Company | undefined => {
    return hangboardBrands.find(
      (company: Company) => company.name.replace(/\s+/g, '-').toLowerCase() === url
    )
  }

  /**
   * Get the user's hangboards from the authentication store
   * @return An array of the user's hangboards
   */
  const getUserHangboards = computed(() => {
    return userRef.value?.settings?.hangboards || []
  })

  /**
   * Get the selected hangboard ID of the user
   * @return The ID of the selected hangboard
   */
  const getUserHangboardSelectedId = computed(() => {
    return userRef.value?.settings?.selected
  })

  /**
   * Get the selected hangboard company of the user
   * @return The company object of the selected hangboard
   */
  const getUserHangboardCompany = computed((): Company | null => {
    const hangboards = getUserHangboards.value
    const selectedId = getUserHangboardSelectedId.value
    if (!hangboards || selectedId === undefined) return null
    const selectedHangboard = hangboards[selectedId]
    if (!selectedHangboard) return null
    return hangboardBrands[selectedHangboard.company] || null
  })

  /**
   * Get the selected hangboard of the user
   * @return The hangboard object
   */
  const getUserHangboard = computed((): Hangboard | null => {
    const company = getUserHangboardCompany.value
    const selectedId = getUserHangboardSelectedId.value
    if (!company || selectedId === undefined) return null
    const userHangboards = getUserHangboards.value
    if (!userHangboards || !userHangboards[selectedId]) return null
    return (
      company.hangboards.find(
        (hangboard: Hangboard) => hangboard.id === userHangboards[selectedId].hangboard
      ) || null
    )
  })

  return {
    getHangboardByIds,
    getCompanyById,
    getHangboardNameByIds,
    getCompanies,
    getHangboards,
    getCompanyByUrlKey,
    getUserHangboards,
    getUserHangboardSelectedId,
    getUserHangboardCompany,
    getUserHangboard
  }
})
