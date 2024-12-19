const BASE_URL = 'https://dog.ceo/api'

export const dogApi = {
  getAllBreeds: async () => {
    const response = await fetch(`${BASE_URL}/breeds/list/all`)
    return response.json()
  },
  
  getRandomDogByBreed: async (breed) => {
    const response = await fetch(`${BASE_URL}/breed/${breed}/images/random`)
    return response.json()
  }
}

export const mockDogData = {
  getDogDetails: (id) => ({
    price: Math.floor(Math.random() * 2000) + 500,
    behavior: ['Friendly', 'Active', 'Loyal'][Math.floor(Math.random() * 3)],
    comments: [
      { user: 'dog_lover', text: 'Such a cute puppy!' },
      { user: 'pet_expert', text: 'Great family dog!' }
    ]
  })
} 