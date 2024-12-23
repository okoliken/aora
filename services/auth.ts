import { account, ID } from "../lib/appwrite";



async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    getUser()
  }

export const createAccountWithEmail = async (email: string, password: string, name: string) => {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
    getUser()
}

export const getUser = async () => {
    return await account.get();
}

export const logout = async () => {
    await account.deleteSession('current');
}