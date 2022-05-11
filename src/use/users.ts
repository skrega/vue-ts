import {ref, Ref} from "vue"
import {useFetch} from "@/use/fetch";

interface User {
    id: number
    name: string
    email: string
}

type UsableUsers =  Promise<{ users: Ref<User[] | undefined> }>

export async function useUsers(): UsableUsers { // Автоматически делать запрос на нужный url и получать список пользователей
    const loading: Ref<boolean> = ref(false) // Ref<boolean> писать тут не обязательно, для примера
    const {response: users, request } =  useFetch<User[]>('https://jsonplaceholder.typicode.com/users')

    if(!loading.value){
        await request()
        loading.value =  true
    }

    return { users }
}
