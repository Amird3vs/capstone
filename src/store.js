import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            user: JSON.parse(localStorage.getItem('user')) || null
        };
    },
    mutations: {
        setUser(state, userData) {
            userData.lastSignInTime = userData.lastSignInTime ? new Date(userData.lastSignInTime) : null;
            userData.createdAt = userData.createdAt ? new Date(userData.createdAt) : null;

            if (userData.displayName) {
                const names = userData.displayName.split(' ');
                userData.firstName = names[0];
                userData.lastName = names[names.length - 1];
                userData.middleName = names.slice(1, -1).join(' ');
            }

            console.log("First Name:", userData.firstName);
            console.log("Middle Name:", userData.middleName);
            console.log("Last Name:", userData.lastName);

            const serializedUserData = JSON.stringify(userData);
            localStorage.setItem('user', serializedUserData);

            state.user = userData;
        }
    }
});