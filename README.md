# alkemy-fullstackChallenge-MarcoChiaro
I made two separated repositories one for the backend and the other for the front end, for a good practice perpouse.
I ended up joining them into a single repository in order to properly make the delivery of the proyect.
You can check every commit I made in each repository on my github profile ( https://github.com/marcochiaro/alkemy-challenge-front ---- https://github.com/marcochiaro/alkemy-challenge-backend)

I couldn't finished the bonus of the authentication but I could implement de authentication token with JWT as soon as the user registers within the app. 

In the next itaration I thought of implement the authenticationm with the token and join the tables in the database (Operation and User), in order to have a new field called userId inside the Operation table that refers (from many to one) to the user that made that operation so then I can inject that userId inside every http request and bring the operation that matchs that user. 
Also I will migrate the state management from useState and the custom Hook, to Redux or ContextAPI, in order to avoid prop drilling.

