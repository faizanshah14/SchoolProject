import firebase from "firebase/app";
import "firebase/auth";


export const AuthService = {
	
    loginWithGoogle: async () => {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
        const provider = new firebase.auth.GoogleAuthProvider();
        try{
            const result = await firebase.auth().signInWithPopup(provider)
            return {
                user: result.user,
            }
        } catch(e){
            return {
                error: e.message
            }
        }
       
    },
    logout : async () => {
        await firebase.auth().signOut();
    },
    createUserWithEmailAndPassword: async (email, password) => {
		try {
			const userCred = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);
			await userCred.user.sendEmailVerification({
				url: "http://localhost:3000",
			});
			return {
				user: userCred.user,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	},
	signInUserWithEmailAndPassword: async (email, password) => {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
		try {
			const userCred = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
			return {
				user: userCred.user,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	},
	resetPassword: async (email) => {
		try {
			await firebase
				.auth()
				.sendPasswordResetEmail(email, { url: "http://localhost:3000/login" });
		} catch (e) {
			return e.message;
		}
	},
	updatePassword: async (newPassword) => {
		try {
			await firebase.auth().currentUser.updatePassword(newPassword);
			return "Update successfully";
		} catch (e) {
			return e.message;
		}
	},
}